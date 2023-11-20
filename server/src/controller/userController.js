import { fetchCollection } from "../mongo/mongoClient.js";
import { ObjectId } from "mongodb";

const getMovies = async (req, res) => {
    try {
        const movies = await fetchCollection("movies").find().toArray()
        res.status(200).send(movies);
      } catch {
          res.status(500).send({ error: "Could not fetch movies collection" });
        }
}

const getMoviesUpComing = async (req, res) => {

    try {
        const movies = await fetchCollection("moviesXscreenings").find({screenings:{$size: 0}}).toArray()
        res.status(200).send(movies);

      } catch {
          res.status(500).send({ error: "Could not fetch upcoming movies from moviesXscreening collection" });
        }
}

const getMoviescurrent = async (req, res) => {

    try {
        const movies = await fetchCollection("moviesXscreenings").find({"screenings.0":{$exists: true} }).toArray()
        res.status(200).send(movies);

      } catch {
          res.status(500).send({ error: "Could not fetch current movies from moviesXscreening collection" });
        }
}

const getMovie = async (req, res) => {
   
    try {
      if (ObjectId.isValid(req.params.id)){
      const movieId = req.params.id; 
     
      const movie = await fetchCollection("movies").findOne({ _id: new ObjectId(req.params.id) });
      
      res.status(200).json(movie); 
    }else{
      res.status(404).send({error: "objectId is not valid"})

    }} catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ett fel inträffade' });
    }
  
};

const getScreenings = async (req, res) => {
  try {
    const screeningsCollection = await fetchCollection('screeningXmovie');
    const query = {};

    if (req.query.date) {
      query.date = req.query.date;
    }

    if (req.query.movie) {
      query.movie = req.query.movie;
    }

    if (req.query.age) {
      query.age = req.query.age;
    }

if (Object.keys(query).length > 0) {
  let regex;
  if (query.movie) {
    regex = new RegExp(query.movie.split("").join("\\s*"), 'i');
  }
  const currentDateFilter = { "date": { $gte: new Date().toISOString().split('T')[0] } };

  const filteredScreenings = await screeningsCollection
    .find({
      $and: [
        query.date ? { "date": query.date } : currentDateFilter,
        query.movie ? { "movie.title": { $regex: regex } } : {},
        query.age ? { "movie.ageRestriction": { $lte: parseInt(query.age) } } : {},
      ],
    })
    .sort({ "date": 1, "time": 1 })
    .toArray();

  if (filteredScreenings.length === 0) {
    res.status(200).json({ err: 'Inga filmer på din sökning hittades' });
  } else {
    res.status(200).json(filteredScreenings);
  }
}
 else {
      try {
        const currentDate = new Date().toISOString().split('T')[0];
        const screenings = await screeningsCollection
          .find({ "date": { $gte: currentDate } })
          .sort({ "date": 1, "time": 1 })
          .toArray();
        res.status(200).send(screenings);
      } catch (err) {
        res.status(500).send({ err: 'Något gick fel' });
      }
    }
  } catch (err) {
    res.status(500).json({ err: 'Något gick fel, prova igen' });
  }
};


export default {getMovies, getScreenings, getMovie, getMoviesUpComing, getMoviescurrent}
