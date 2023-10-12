import express from "express";
import { fetchCollection } from "../mongo/mongoClient.js";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { ObjectId } from "mongodb";
import jwtUtil from "../util/jwtUtil.js";
dotenv.config();

const router = express.Router();

// USER STORY 3 och 19 och 23
router.post("/screenings", async (req, res) => {
  const body = req.body;
  const {
    date,
    time,
    theater,
    movie,
    ageRestriction,
  } = req.body;
  if (!date || !time || !theater || !movie || !ageRestriction) {
    return res.status(400).json({error: "Missing required properties, pls check your request body"});
  }

  const rowAmmount = 8
  const seatPerRow = 12
  const seats = []
  for(let i = 0; i < rowAmmount; i++) {
    seats.push([])
    for(let j = 0; j < seatPerRow; j++) {
      seats[i].push({seat: false})
    }
  }
  body.seats = seats

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

router.post("/movies", async (req, res) => {
  // Med hjälp av jwt, kontrollera att role === ADMIN eller så gör vi det till en låst route
  const movie = req.body;
  const {
    title, img,trailer,
    director, actors,length,
    genre, speech, subtitles,
    ageRestriction,
  } = req.body;
  if (
    !title || !img || !trailer ||
    !director || !actors || !length ||
    !genre || !speech || !subtitles ||
    !ageRestriction
  ) {
    return res.status(400).json({
      error: "Missing required properties, pls check your request body",
    });
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

router.put("/screenings", async (req, res) => {
  /*plocka ut data från req.body och kolla om användaren är inloggad */
  // Kolla så inget saknas i bodyn
  // fetcha våran screening collection,
  // kollar så sätena som vi plockat från bodyn är lediga (false)
  // "bokar" sätena, ändrar false till true (findmany eller toArray för att ändra flera sammtidigt)
  // errorHantering för booleans, se till att allt blev rätt
  // räkna ut totala priset adult * 140 | child * 120 | senior * 80 och + ihop
  // fetch på bookings och skapar en ny bokning (insertOne ?)
  // mera errorhantering
  // om allt gick bra och användaren var inloggad, fetch på usern, lägg till bokningsId i user.booking
  //errorhantering
  // if result.mathedCount från ny bokning !== 0 skicka tillbka status 201 och result (bokningsinformation)
  // else status dålig expempel 400
});

// USER STORY 11 OBS!
//task 11.1
router.get('/screenings', async (req, res) => {
  try {
    const screeningsCollection = fetchCollection('screenings');
    const query = {}

    /*
    To filter by date: /screenings/?date=20
    To filter by movie: /screenings/?title=MovieTitle
    To filter by both date and movie: /screenings/?date=20&title=MovieTitle
    */
    
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
        
        
        const filteredScreenings = await screeningsCollection.find({$and: [
            query.date ? {date: query.date} : {},
            query.movie ? {movie: { $regex: query.movie ,$options:"i"}} : {}, 
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

  
//task 11.1 
/*
router.get("/screenings", async (req, res) => {
    try {
        const ageRestriction = parseInt(req.query);
        const moviesCollection = fetchCollection('screenings');

        const movies = await moviesCollection
            .find({ ageRestriction: ageRestriction })
            .toArray();

        if (movies.length === 0) {
            res.status(500).json({ err: "Inga filmer i den åldergränsen hittades" });
        } else {
            res.status(200).json(movies);
        }

    } catch (err) {
        res.status(500).json({ err: "Något gick fel, prova igen" });
    }
});*/
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
    
        let result = await fetchCollection("screenings").updateOne({_id: new ObjectId(booking.screeningId)}, {$set: currentScreening})
        if(result.modifiedCount == 1) { 
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
    // hasha lösenord
    //EXEMPEL
    const hash = bcrypt.hashSync(user.password, parseInt(process.env.saltRounds));
    user.password = hash
    user.bookings = []
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

export default router;
