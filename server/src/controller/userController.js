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

const getMovie = async (req, res) => {
   
    try {
      if (ObjectId.isValid(req.params.id)){
      const movieId = req.params.id; 
      console.log(movieId)
      const movie = await fetchCollection("movies").findOne({ _id: new ObjectId(req.params.id) });
      console.log(movie)
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
        const screeningsCollection = fetchCollection('screenings');
        const query = {}

        if (req.query.date) { 
        query.date = req.query.date 
        }
    
        if (req.query.movie) { 
        query.movie = req.query.movie
        }
        
        if (req.query.age) { 
        query.age = req.query.age
        }
    
        // Check the object query
        if (Object.keys(query).length > 0) {
            
            let regex;
            if(query.movie) {
              regex = new RegExp(query.movie.split("").join("\\s*"), 'i');
            }
            
            const filteredScreenings = await screeningsCollection.find({$and: [
                query.date ? {date: query.date} : {},
                query.movie ? {movie: { $regex: regex}} : {}, 
                query.age ? {ageRestricion: {$lte: parseInt(query.age)}}: {}
                ]}).toArray();

          
          if (filteredScreenings.length == 0) {
            res.status(200).json({ err: 'Inga filmer på din sökning hittades' });
          } else {
            res.status(200).json(filteredScreenings);
          }
    
        } else {
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
}

const cancelBooking = async (req, res) => {
    const body = req.body
    if(!body.id) {
        return res.status(400).send("Bad Request")
    }
    let booking = await fetchCollection("bookings").findOne({_id: new ObjectId(body.id)})
    
    if(booking == null || !booking.screeningID) {
        return res.status(404).send("Booking not found")
    }
    try {
       let currentScreening = await fetchCollection("screenings").findOne({_id: new ObjectId(booking.screeningID)})
        for(let i = 0; i < booking.seats.length; i++) {
            if(currentScreening.seats[booking.row - 1][booking.seats[i] - 1].seat == false) {
                return res.status(400).send({message: "The seats you are trying to cancel are already canceled"})
               }
            currentScreening.seats[booking.row - 1][booking.seats[i] - 1] = {seat: false}
        }
        booking.status = false
        await fetchCollection("bookings").updateOne({_id: new ObjectId(body.id)}, {$set: booking})
        let result = await fetchCollection("screenings").updateOne({_id: new ObjectId(booking.screeningID)}, {$set: currentScreening})
        
        if(result.matchedCount == 1) { 
            res.status(202).send(currentScreening) 
        } else {
            res.status(400).send("Kunde inte avboka, prova igen")
        }
        }
    catch(error) {
        res.status(500).send("Something went wrong")
    }
}


export default {getMovies, getScreenings, cancelBooking, getMovie}