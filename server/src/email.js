import {dirname, join as pathJoin} from "path";
import { fileURLToPath } from "url";
import nodemailer from 'nodemailer';
import * as dotenv from "dotenv";
dotenv.config();

// Booking här hade kunnat heta vadsomhelst som parameternamn. Exempelvis emailinfo. I sådanafall måste emailinfo ändras på alla ställen dean som har "booking." framför till "emailinfo." istället.
function sendEmailWithNodemailer(booking) {

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const logoPath = pathJoin(__dirname,  "assets"  );

    const transporter = nodemailer.createTransport({
        host: process.env.host,
        port: 587,
        secure: false,
        auth: {
          user: process.env.email,
          pass: process.env.emailPassword, 
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
      {   
        filename: 'logo.png',
          path: `${logoPath}/logo.png`,
          cid: process.env.email 
      }
    ]
    };
    
    return transporter.sendMail(mailOptions)

}

export default sendEmailWithNodemailer
