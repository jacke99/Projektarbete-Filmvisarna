import { ObjectId } from "mongodb";
import { fetchCollection } from "../mongo/mongoClient.js";
import jwtUtil from "../util/jwtUtil.js";
import idUtil from "../util/idUtil.js";
import calcTotalPrice from "../util/calcTotalPrice.js";

let clients = [];

const postBooking = async (req, res) => {
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
      screeningID: new ObjectId(body.id),
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
};

const getScreeningById = async (req, res) => {
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
        clients.forEach((client) => {
            client.res.write(`data: ${JSON.stringify(currentScreening)}\n\n`);
          })
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

export default { postBooking, getScreeningById, cancelBooking };