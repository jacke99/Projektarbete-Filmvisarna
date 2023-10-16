import express from "express";
import { fetchCollection } from "../mongo/mongoClient.js";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { ObjectId } from "mongodb";
import jwtUtil from "../util/jwtUtil.js";
import uploads from '../middleware/fileUpload.js'
import idUtil from "../util/idUtil.js";
import calcTotalPrice from "../util/calcTotalPrice.js";
dotenv.config();

const router = express.Router();

// USER STORY 3 och 19 och 23
router.post("/screenings", async (req, res) => {
  const body = req.body;
  const {date, time, theater,
        movie, ageRestriction,
  } = req.body;
  if (!date || !time || !theater || !movie || !ageRestriction) {
    return res.status(400).json({error: "Missing required properties, pls check your request body"});
  }
  try {
    const theaters = await fetchCollection("theaters").findOne({"theaterNr": theater})
    body.seats = theaters.seats
  } catch (error) {
    res.status(500).send({ error: "Could not fetch screenings collection" });
  }
  if (
    Object.values(body).every((value) => value !== "" && value !== undefined)
  ) {
    try {
      const result = await fetchCollection("screenings").insertOne(body);
      res.status(201).send(result);
    } catch (error) {
      res.status(400).send({ error: "Could not create screening" });
    }
  } else {
    res.status(400).send({ error: "Could not create screening" });
  }
});

router.delete("/screenings/:id", async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const screening = await fetchCollection("screenings").deleteOne({
      _id: new ObjectId(req.params.id),
    });
    if (screening.deletedCount == 0) {
      res.status(404).send({ error: "Could not find the document" });
    } else {
      res.status(200).send({ message: "Screening deleted" });
    }
  } else {
    res.status(404).send({ error: "unvalid screening id" });
  }
});

// USER STORY 4 och 23

// 'files' kommer från front end
router.post("/movies",uploads.array('movieImg'), async (req, res) => {
  // Med hjälp av jwt, kontrollera att role === ADMIN eller så gör vi det till en låst route

   
  // Här vill  vi ha kod som fångar upp namnet på bilden som vi pushat upp till /client/public/srs/assets.
  //Därefter vill vi kunna använda namnet på filen och pusha upp filnamet till databasen
  // vi vill att file.originalname från fuleUploads.js ska matcha img i body 
  // img hämtas från /client/public/img
 
  

  const movie = req.body;
  const {
    title, img,trailer, // här vill vi att "img" ska hämtas från client/srs/assets och följa med posten upp til DB
    director, actors,length,
    genre, speech, subtitles,
    ageRestriction,
  } = req.body;
  if (
    !title || !img || !trailer ||
    !director || !actors || !length ||
    !genre || !speech || !subtitles ||
    !ageRestriction  ) {
    return res.status(400).json({
      error: "Missing required properties, pls check your request body",
    });
  }

  
  if (!req.file) {
    // If there's no file in the request, something went wrong.
    return res.status(400).send('No IMG uploaded.');
  }

  if (
    Object.values(movie).every((value) => value !== "" && value !== undefined)
  ) {
    try {
      const result = await fetchCollection("movies").insertOne(movie)
      res.status(201).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ err: "Could not create a new document in collection movies" });
    }
  } else {
    res.status(500).json({ err: "Incorrect movie input" });
  }
});

//for admin to delete one movie task 23.2
router.delete("/movies/:id", async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const movie = await fetchCollection("movies").deleteOne({
      _id: new ObjectId(req.params.id),
    });
    if (movie.deletedCount == 0) {
      res.status(404).send({ error: "Could not find the movie" });
    } else {
      res.status(200).send({ message: "The movie is deleted" });
    }
  } else {
    res.status(404).send({ error: "unvalid movie id" });
  }
});

//get all the documentes from movies collection task 4.2
router.get("/movies", async (req, res) => {
  try {
    const movies = await fetchCollection("movies").find().toArray()
    res.status(200).send(movies);
  } catch {
      res.status(500).send({ error: "Could not fetch movies collection" });
    }
});

// USER STORY 5 och 23.5
router.get("/bookings", async (req, res) => {
  // Med hjälp av jwt, kontrollera att role === ADMIN eller så gör vi det till en låst route
  try {
    const bookingsCollection = await fetchCollection("bookings");
    const bookings = await bookingsCollection.find().toArray();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching bookings collection",
      details: error.message,
    });
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

    const newBooking = await fetchCollection("bookings").insertOne(booking)

    if(user.role) {
      await fetchCollection("users").updateOne({email: user.email}, {$push: {bookings: {bookingId: bookingID}}})
    }
    return res.status(201).send(newBooking)

  
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
});

// USER STORY 11 OBS!
//task 11.1
router.get('/screenings', async (req, res) => {
  try {
    const screeningsCollection = fetchCollection('screenings');
    const query = {}
    
    // Check if req.query.date is present
    if (req.query.date) { 
    query.date = req.query.date 
    }


    // Check if req.query.movie is present 
    if (req.query.movie) { 
    query.movie = req.query.movie
    }

    if (req.query.age) { 
    query.age = req.query.age
    }

    // Check the object query
    if (Object.keys(query).length > 0) {
        
        let regex = new RegExp(query.movie.split("").join("\\s*"), 'i');
        const filteredScreenings = await screeningsCollection.find({$and: [
            query.date ? {date: query.date} : {},
            query.movie ? {movie: { $regex: regex}} : {}, 
            query.age ? {ageRestricion: {$lte: parseInt(query.age)}}: {}
            ]}).toArray();
        
    
        console.log(filteredScreenings, "-----------------------")
      
      if (filteredScreenings.length == 0) {
        res.status(500).json({ err: 'Inga filmer på din sökning hittades' });
      } else {
        res.status(200).json(filteredScreenings);
      }

    } else {
      // If req.query.date is not present, fetch all screenings
      try {
      const screenings = await screeningsCollection.find().toArray()
        res.status(200).send(screenings);
      } catch (err) {
        res.status(500).send({ err: 'Något gick fel' });
      }
    }
  } catch (err) {
    res.status(500).json({ err: 'Något gick fel, prova igen' });
  }
});

// USER STORY 15

router.patch("/bookings", async (req, res) => {
    const body = req.body
    if(!body._id) {
        return res.status(400).send("Bad Request")
    }
    const booking = await fetchCollection("bookings").findOne({_id: new ObjectId(body._id)})
    if(booking == null || !booking.screeningId) {
        return res.status(404).send("Booking not found")
    }
    try {
       let currentScreening = await fetchCollection("screenings").findOne({_id: new ObjectId(booking.screeningId)})
        for(let i = 0; i < booking.seat.length; i++) {
            currentScreening.seats[booking.row - 1][booking.seat[i] - 1] = {seat: false}
        }
        booking.status = false
        await fetchCollection("bookings").updateOne({_id: new ObjectId(body._id)}, {$set: booking})
        let result = await fetchCollection("screenings").updateOne({_id: new ObjectId(booking.screeningId)}, {$set: currentScreening})
        if(result.matchedCount == 1) { 
            res.status(201).send(currentScreening) 
        } else {
            res.status(400).send("Kunde inte avboka, prova igen")
        }
        }
    catch(error) {
        res.status(500).send("Something went wrong")
    }
})

// USER STORY 16

router.post("/register", async (req, res) => {
    const { email, lastname, name, password, phone } = req.body;
    const user = req.body 
    // Check if all required properties are present
    if (!email || !lastname || !name || !password || !phone) {
        return res.status(400).json({ error: 'Missing required properties' });
    }
    const hash = bcrypt.hashSync(user.password, parseInt(process.env.saltRounds));
    user.password = hash
    user.bookings = []
    user.role = "USER"
    const result = await fetchCollection("users").updateOne({email: user.email}, {$setOnInsert: user}, {upsert: true})

  if (result.matchedCount !== 0) {
    return res.status(400).send("User allready exists");
  } else {
    return res.status(201).send("Account was created");
  }
});

// USER STORY 17

router.put("/login", async (req, res) => {
  const login = req.body;
  if (!login.email || !login.password) {
    return res.status(400).send("Bad Request");
  }
  const user = await fetchCollection("users").findOne({ email: login.email });
  const match = bcrypt.compareSync(login.password, user.password); // true or false

  if (match == false) {
    res.status(400).send("Bad Request");
  } else {
    if (user != null) {
      const token = jwtUtil.generate(user);
      res.send(token);
    } else {
      res.sendStatus(400);
    }
  }
});

// USER STORY 18

router.get("/user/:id", async (req, res) => {
    try {
      if (ObjectId.isValid(req.params.id)) {
        const user = await fetchCollection("users").findOne({ _id: new ObjectId(req.params.id) });
        
        if (user == null) {
          return res.status(404).send({ error: 'Could not fetch the user info' });
        }
  
        const arrayToSearch = user.bookings.map(booking => booking.bookingId);
  
        const userBookings = await fetchCollection("bookings").find({ bookingId: { $in: arrayToSearch } }).toArray();
  
        return res.send(userBookings);
      } else {
        return res.status(404).send({ error: 'Object id is not valid' });
      }
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      return res.status(500).send({ error: 'Internal server error' });
    }
});


  router.post("/theaters", async (req, res) => {
    const body = req.body;
    const {theaterNr, rows, seatsPerRow} = req.body;
    if (!theaterNr || !rows || !seatsPerRow) {
      return res.status(400).json({error: "Missing required properties, pls check your request body"});
    }
    if (
      Object.values(body).every((value) => value !== "" && value !== undefined)
    ) {
      try {
        const seats = []
        for(let i = 0; i < rows; i++) {
          seats.push([])
          for(let j = 0; j < seatsPerRow; j++) {
            seats[i].push({seat: false})
          }
        }
        body.seats = seats
        const result = await fetchCollection("theaters").insertOne(body);
        res.status(201).send(result);
      } catch (error) {
        res.status(400).send({ error: "Could not create theater" });
      }
    } else {
      res.status(400).send({ error: "Could not create theater" });
    }
  })

  router.get("/theaters", async (req, res) => {
    try {
      const theaters = await fetchCollection("theaters").find().toArray()
      res.status(200).send(theaters);
    } catch {
        res.status(500).send({ error: "Could not fetch theaters collection" });
      }
  })

export default router;
