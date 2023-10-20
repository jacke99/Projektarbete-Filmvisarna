import { fetchCollection } from "../mongo/mongoClient.js";
import { ObjectId } from "mongodb";



const addScreening = async (req, res) => {
    const body = req.body;
    console.log(body)
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
}

const deleteScreening = async (req, res) => {
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
}

const deleteMovie = async (req, res) => {
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
}

const getMovies = async (req, res) => {
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
}

const postMovie = async (req, res) => {
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
}

const addNewTheater = async (req, res) => {
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
}

const getTheater = async (req, res) => {
    try {
        const theaters = await fetchCollection("theaters").find().toArray()
        res.status(200).send(theaters);
      } catch {
          res.status(500).send({ error: "Could not fetch theaters collection" });
        }
}


export default {addScreening, deleteScreening, deleteMovie, getMovies, postMovie, addNewTheater, getTheater}