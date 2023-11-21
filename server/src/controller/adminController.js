import { fetchCollection } from "../mongo/mongoClient.js";
import { ObjectId } from "mongodb";
import { calcSeatNumber } from "../util/seatNumberUtil.js";
import { calcSeatRating } from "../util/calcSeatRating.js";


const addScreening = async (req, res) => {
    const body = req.body;
  const {date, time, theater,
        title
  } = req.body;

  if (!date || !time || !theater || !title) {
    return res.status(400).json({error: "Missing required properties, pls check your request body"});
  }
 
  try {
    const regex = new RegExp(title.split("").join("\\s*"), 'i');
   
    const movie = await fetchCollection("movies").findOne({"title": { $regex: regex }})
   
    body.movieID = movie._id
    const theaters = await fetchCollection("theaters").findOne({"theaterNr": theater})
    body.theaterName = theaters.name
    body.seats = theaters.seats
    delete body.title
  } catch (error) {
    return res.status(500).send({ error: "Could not fetch screenings collection" });
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
//Get bookings collection
const getBookingsXuser = async (req, res) => {
  try {
    const bookingsCollection = await fetchCollection("bookingsXuser");
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;
    const today = new Date().toISOString().split("T")[0];
    const searchQuery = req.query.search || "";
    const bookings = await bookingsCollection
      .find({
        $and: [
          { "screening.date": { $gte: today } },
          {
            $or: [
              { bookingId: { $regex: searchQuery, $options: "i" } },
              { customerEmail: { $regex: searchQuery, $options: "i" } },
              { "customer.name": { $regex: searchQuery, $options: "i" } },
              { "customer.lastname": { $regex: searchQuery, $options: "i" } },
            ],
          },
        ],
      })
      .sort({ "screening.date": 1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching and sorting bookingsXuser collection:", error);
    res.status(500).json({
      error: "An error occurred while fetching and sorting bookingsXuser collection",
      details: error.message,
    });
  }
};

export { getBookingsXuser };




const postMovie = async (req, res) => {
  const movie = req.body;
  const { title, description , trailer, // här vill vi att "img" ska hämtas från client/srs/assets och följa med posten upp til DB
    director, actors,length,
    genre, speech, subtitles,
    ageRestriction
  } = req.body;
  
  movie.ageRestriction = parseInt(movie.ageRestriction);
  
  if (
    !title || !description || !trailer ||
    !director || !actors || !length ||
    !genre || !speech || !subtitles ||
    !ageRestriction ) {
    return res.status(400).json({
      error: "Missing required properties, pls check your request body",
    });
  }

  if (!req.files) {
    // If there's no file in the request, something went wrong.
    return res.status(400).send('No IMG uploaded.');
  }

  if (Object.values(movie).every((value) => value !== "" && value !== undefined)) {
    try {
      movie.img_poster = req.files['img_poster'][0].originalname; // Use the original file name
      movie.img_header = req.files['img_header'][0].originalname; // Use the original file name

      const result = await fetchCollection("movies").insertOne(movie)
      res.status(201).send(result);
    } catch (error) {
      res.status(500).json({ err: "Could not create a new document in collection movies" });
    }
  } else {
    res.status(500).json({ err: "Incorrect movie input" });
  }
}

const addNewTheater = async (req, res) => {
    const body = req.body;
    const {theaterNr, rows} = req.body;
    if (!theaterNr || !rows) {
      return res.status(400).json({error: "Missing required properties, pls check your request body"});
    }
    if (
      Object.values(body).every((value) => value !== "" && value !== undefined)
    ) {
      try {
        const seats = []
        for(let i = 0; i < rows.length; i++) {
          seats.push([])
          for(let j = 0; j < rows[i].seats; j++) {
            if(i !== 0) {
              const seatNumber = calcSeatNumber(i, j, seats[i - 1][seats[i - 1].length - 1].seatNumber)
                seats[i].push({
                  seat: false, 
                  seatNumber: seatNumber
                })
              } else {
                seats[i].push({
                  seat: false, 
                  seatNumber: j + 1
                })
            }
          }
        }
      
        let seatsWithRating = calcSeatRating(rows, seats)

        body.rows = rows.length
        body.seats = seatsWithRating
        const result = await fetchCollection("theaters").insertOne(body);
        res.status(201).send({data: result, status: 201});
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

const getUsers = async (req, res) => {
    try {
        const users = await fetchCollection("users").find().toArray()
        res.status(200).send(users);
      } catch {
          res.status(500).send({ error: "Could not fetch user collection" });
        }
}


export default {addScreening, deleteScreening, deleteMovie, getBookingsXuser, postMovie, addNewTheater, getTheater, getUsers }