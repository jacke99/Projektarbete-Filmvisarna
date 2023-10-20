import express from "express";
import { fetchCollection } from "../mongo/mongoClient.js";
import * as dotenv from "dotenv";
import { ObjectId } from "mongodb";
import jwtUtil from "../util/jwtUtil.js";
import uploads from '../middleware/fileUpload.js'
import idUtil from "../util/idUtil.js";
import calcTotalPrice from "../util/calcTotalPrice.js";
import adminController from "../controller/adminController.js";
import accountController from "../controller/accountController.js";
import jwtFilter from "../auth/jwtFilter.js"
import userController from "../controller/userController.js";
dotenv.config();

const router = express.Router();

//Admin routes
router.post("/screenings", jwtFilter.bind({role: "ADMIN"}) , adminController.addScreening)
router.delete("/screenings/:id",jwtFilter.bind({role: "ADMIN"}), adminController.deleteScreening)
router.delete("/movies/:id", jwtFilter.bind({role: "ADMIN"}), adminController.deleteMovie)
router.get("/bookings", jwtFilter.bind({role: "ADMIN"}), adminController.getMovies)
router.post("/theaters", jwtFilter.bind({role: "ADMIN"}), adminController.addNewTheater)
router.get("/theaters", jwtFilter.bind({role: "ADMIN"}), adminController.getTheater)
//Accounts (register, login, get user booking/history)
router.post("/register", accountController.register)
router.put("/login", accountController.login)
router.get("/user/:id", accountController.getUserBookings )

//User stuff
router.get("/movies", userController.getMovies)
router.get('/filteredScreenings', userController.getScreenings )
router.patch("/bookings", userController.cancelBooking)

router.post("/movies", uploads.fields([{ name: 'img_poster' }, { name: 'img_header' }]), async (req, res) => {

  const movie = req.body;
  console.log(req.body);
  
  const { title, desc , trailer, // här vill vi att "img" ska hämtas från client/srs/assets och följa med posten upp til DB
    director, actors,length,
    genre, speech, subtitles,
    ageRestriction,
  } = req.body;
  
  if (
    !title || !desc || !trailer ||
    !director || !actors || !length ||
    !genre || !speech || !subtitles ||
    !ageRestriction  ) {
    return res.status(400).json({
      error: "Missing required properties, pls check your request body",
    });
  }
  console.log(req.files);

  if (!req.files) {
    // If there's no file in the request, something went wrong.
    return res.status(400).send('No IMG uploaded.');
  }

  if (Object.values(movie).every((value) => value !== "" && value !== undefined)) {
    try {
      movie.img_poster = req.files['img_poster'][0].originalname; // Use the original file name
      movie.img_header = req.files['img_header'][0].originalname; // Use the original file name

      const result = await fetchCollection("movies").insertOne(movie)
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ err: "Could not create a new document in collection movies" });
    }
  } else {
    res.status(500).json({ err: "Incorrect movie input" });
  }
}); 



let clients = [];
router.post("/booking", async (req, res) => {
  const body = req.body
  const authHeader = req.headers['authorization']
  let authToken;
  let user = {}
  if(authHeader) {
    authToken = authHeader.replace("Bearer ", "");
    user = jwtUtil.verify(authToken)
    console.log(user)
  }else if(req.body.email) {
    user.email = req.body.email
  } else {
   return res.status(400).send({message: "Bokning kan ej skapas utan en email"})
  }
  
  try{

  const screening = await fetchCollection("screenings").findOne({_id: new ObjectId(body.id)})
  for(let i = 0; i < body.seats.length; i++) {
      if(screening.seats[body.row - 1][body.seats[i] - 1].seat == true) {
       return res.status(400).send({message: "The seats you are trying to book are allready taken"})
      }
      screening.seats[body.row - 1][body.seats[i] - 1] = {seat: true}
  }
    await fetchCollection("screenings").updateOne({_id: new ObjectId(body.id)}, {$set: screening})
    clients.forEach((client) => {
      client.res.write(`data: ${JSON.stringify(screening)}\n\n`);
    })
    const bookingID = await idUtil.CreateId(6)
    const totalPrice = calcTotalPrice(body.adult, body.child, body.senior)
    
    const booking = {
      bookingId: bookingID,
      customerEmail: user.email, 
      ticketType: {adult: body.adult, child: body.child, senior: body.senior},
      screeningID: body.id,
      row: body.row,
      seats: body.seats,
      price: totalPrice,
      status: true 
    }

    await fetchCollection("bookings").insertOne(booking)

    if(user.role) {
      await fetchCollection("users").updateOne({email: user.email}, {$push: {bookings: {bookingId: bookingID}}})
    }
    return res.status(201).send(booking)

  
  } catch(err) {
   res.status(400).send(err)
  }
});



router.get("/screenings/:id", async (req, res) => {
    const id = req.params.id
    const headers = {
      "content-type": "text/event-stream",
      "connection": "keep-alive",
      "cache-control": "no-cache"
    };
    
    const clientId = Date.now();
    const newClient = {
      id: clientId,
      res
    };

    res.writeHead(200, headers);

    clients.push(newClient);
    console.log("Client connected");

    req.on("close", () => {
      console.log(`${clientId} Connection closed`);
      clients = clients.filter((c) => c.id !== clientId);
    });


    try {
      const result = await fetchCollection("screenings").findOne({_id: new ObjectId(id)})
      const data = `data: ${JSON.stringify(result)}\n\n`;
      res.write(data);
    } catch (err) {
      res.status(400).send(err)
    }
})

export default router;
