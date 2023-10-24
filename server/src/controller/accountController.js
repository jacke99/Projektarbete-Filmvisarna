import { fetchCollection } from "../mongo/mongoClient.js";
import { ObjectId } from "mongodb";
import jwtUtil from "../util/jwtUtil.js";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();

const register = async (req, res) => {
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
}

const login = async (req, res) => {
    const login = req.body;
    if (!login.email || !login.password) {
      return res.status(400).send("Bad Request");
    }
    try{
    const user = await fetchCollection("users").findOne({ email: login.email });
    const match = bcrypt.compareSync(login.password, user.password); // true or false
  
    if (match == false) {
      res.status(400).send({message: "Bad Request"});
    } else {
      if (user != null) {
        const token = jwtUtil.generate(user);
        res.status(200).send({message: "Succesful login", jwt: token});
      } else {
        res.sendStatus(400);
      }
    }} catch (error) {
      return res.status(500).send({ error: 'Internal server error' });
    }
}

const getUserBookings = async (req, res) => {
  const authHeader = req.headers['authorization'];
  if (authHeader == undefined) {
    response.status(400);
    response.send("Authorization header is missing");
  } else {

    
    try {
          const authToken = authHeader.replace("Bearer ", "");
          const decoded = jwtUtil.verify(authToken)
          const user = await fetchCollection("users").findOne({email: decoded.email});
    
          const arrayToSearch = user.bookings.map(booking => booking.bookingId);
    
          const userBookings = await fetchCollection("bookings").find({ bookingId: { $in: arrayToSearch } }).toArray();
          console.log(userBookings)
          return res.send(userBookings);
      } catch (error) {
        console.error('Error fetching user bookings:', error);
        return res.status(500).send({ error: 'Internal server error' });
      }
    }
}


export default {register, login, getUserBookings}