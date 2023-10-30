import { ObjectId } from "mongodb";
import { fetchCollection } from "../mongo/mongoClient.js";
import jwtUtil from "../util/jwtUtil.js";
import idUtil from "../util/idUtil.js";
import calcTotalPrice from "../util/calcTotalPrice.js";
import nodemailer from 'nodemailer';
import * as dotenv from "dotenv";
dotenv.config();
import {dirname, join as pathJoin} from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const logoPath = pathJoin(__dirname, "..", "assets"  );


let clients = [];

const postBooking = async (req, res) => {
  const body = req.body  
  const authHeader = req.headers['authorization']
  let authToken;
  let user = {}
  if(authHeader) {
    authToken = authHeader.replace("Bearer ", "");
    user = jwtUtil.verify(authToken)
  }else if(req.body.email) {
    user.email = req.body.email
  } else {
   return res.status(400).send({message: "Bokning kan ej skapas utan en email"})
  }
  
  try{
    
  const screening = await fetchCollection("screenings").findOne({_id: new ObjectId(body.id)})
  for(let i = 0; i < body.seats.length; i++) {
      if(screening.seats[body.row - 1][body.seats[i].seat - 1].seat === true) {
       return res.status(400).send({message: "The seats you are trying to book are already taken"})
      }

      screening.seats[body.row - 1][body.seats[i].seat - 1] = {seat: true, seatNumber: screening.seats[body.row - 1][body.seats[i].seat - 1].seatNumber}
      body.seats[i].seatNumber = screening.seats[body.row - 1][body.seats[i].seat - 1].seatNumber
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
    const transporter = nodemailer.createTransport({
      host: process.env.host,
      port: 587,
      secure: false,
      auth: {
        user: process.env.email,
        pass: process.env.emailPassword, // Om du använder tvåfaktorsautentisering (2FA), använd ett appspecifikt lösenord här
      },
      tls: {
          rejectUnauthorized: false,
      }
    });


const mailOptions = {
  from: `"Filmvisarna 🎥🍿 ${process.env.email}` ,
  to: booking.customerEmail, 
  subject: 'Bokningsbekräftelse',
  text:`  `,
  html: `  <div style="border:#DACA88; border-width:2px; border-style:solid; padding:10px; text-align:center; width:400px; border-radius:8px; font-size:16px;">
  <h2 style="color:black;">Tack för din bokning.</h2> 
  <p>Ditt bokningsnummer är: <span style="font-weight:800">${booking.bookingId}</span> 
  <br><h1></h1> 
  Vi på Filmvisarna önskar en underbar biostund.
  Bokningsnummret visar du upp i kassan i samband <br> med betalning.
  <br>
  <br>
  Välkommen!</p> 
  <br><img width="40px" src="cid:${process.env.email}">
  <br>
  </div>`,
  attachments: [
    {   // utf-8 string as an attachment
      filename: 'logo.png',
        path: `${logoPath}/logo.png`,
        cid: process.env.email //same cid value as in the html img src
    }
  ]
};

  transporter.sendMail(mailOptions)

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
        return res.status(400).send({message: "Bad Request"})
    }
    let booking = await fetchCollection("bookings").findOne({_id: new ObjectId(body.id)})
    
    if(booking == null || !booking.screeningID) {
        return res.status(404).send({message: "Booking not found"})
    }
    try {
       let currentScreening = await fetchCollection("screenings").findOne({_id: new ObjectId(booking.screeningID)})
       console.log(currentScreening)
        for(let i = 0; i < booking.seats.length; i++) {
            if(currentScreening.seats[booking.row - 1][booking.seats[i].seat - 1] == false) {
                return res.status(400).send({message: "The seats you are trying to cancel are already canceled"})
               }
            currentScreening.seats[booking.row - 1][booking.seats[i].seat - 1] = {seat: false, seatNumber: currentScreening.seats[booking.row - 1][booking.seats[i].seat - 1].seatNumber}
        }
        console.log(currentScreening)
        booking.status = false
        await fetchCollection("bookings").updateOne({_id: new ObjectId(body.id)}, {$set: booking})
        let result = await fetchCollection("screenings").updateOne({_id: new ObjectId(booking.screeningID)}, {$set: currentScreening})
        clients.forEach((client) => {
            client.res.write(`data: ${JSON.stringify(currentScreening)}\n\n`);
          })
        if(result.matchedCount == 1) { 
            res.status(202).send({message: "Din bokning är nu avbokad!"}) 
        } else {
            res.status(400).send({message: "Kunde inte avboka, prova igen"})
        }
        }
    catch(error) {
        res.status(500).send({message: "Something went wrong"})
    }
}

export default { postBooking, getScreeningById, cancelBooking };