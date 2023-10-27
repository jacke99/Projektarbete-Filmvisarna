
// const transporter = nodemailer.createTransport({
//   host: 'smtp-mail.outlook.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: 'fvbio2023@outlook.com',
//     pass: 'Yves123#', // Om du använder tvåfaktorsautentisering (2FA), använd ett appspecifikt lösenord här
//   },
//   tls: {
//       rejectUnauthorized: false,
//   }
// });

// const mailOptions = {
// from: 'fvbio2023@outlook.com',
// to: booking.customerEmail, 
// subject: 'Bokningsbekräftelse',
// text: mailToUser, 
// html: mailToUser.html,
// };

// transporter.sendMail(mailOptions, function (error, info) {
// if (error) {
//   console.log('Något gick fel: ' + error);
//   res.status(500).json({ message: 'Något gick fel', error: error.message }); 
// } else {
// console.log('E-postmeddelandet har skickats: ' + info.response);
// res.status(200).json({ message: 'Bokningsbekräftelse skickad' });
// }
// });
// export default async function sendConfirmation({bookingNumber, email}) {

//   try {
//       const to = email;
//       const from = `Filmvisarna <${process.env.EMAIL_USER}>`;
//       const replyTo = email;
//       const subject = "Bokningsberäftelse Filmvisarna";
//       const text = `Din bokningsbekräftelse. Ditt bokningsnummer är ${bookingNumber}. Välkommen på en fantastisk bioupplevelse hos oss på Filmvisarna.`;
//       const html = `
//       <div style="border:purple; border-width:2px; border-style:solid; padding:10px; text-align:center; width:400px; border-radius:15px; font-size:16px;">
//       <h2 style="color:purple;">Din bokningsbekräftelse</h2> 
//       <p>Ditt bokningsnummer är 
//       <br><h1>${bookingNumber}</h1> 
//       Ta med ditt bokningsnummer till biografen för att kunna betala och få biljetterna till din valda visning.
//       <br>
//       <br>
//       Välkommen på en fantastisk bioupplevelse hos oss på </p> 
//       <br><img src="cid:logo.ee">
//       <br>
//       </div>`
//       const attachments = [{
//           filename: 'FilmvisarnaLogoTwo.png',
//           path: __dirname + '/FilmvisarnaLogoTwo.png',
//           cid: 'logo.ee'
//       }]

//       await sendEmail({ from, to, replyTo, subject, text, html, attachments });
//   } catch (error) {
//       console.log(error.message);
//   }
// }


// export default async function sendEmail({ from, to, replyTo, subject, text, html, attachments }) {
//   const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: "587", // for outlook, 
//       auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASS
//       },
//       tls: {
//           rejectUnauthorized: false,
//       }
//   })

//   //send options from nodeMailerController
//   const options = {
//       from: from,
//       to: to,
//       subject: subject,
//       text: text,
//       html: html,
//       attachments: attachments,
//   }

//   //send email
//   transporter.sendMail(options, (err, info) => {
//       if (err) {
//           console.log(err)
//       } else {
//           console.log(info)
//       }
//   })
// };



// // export default transporter = nodemailer.createTransport({
// //   host: "smtp-mail.outlook.com",
// //   port: 587,
// //   secure: true,
// //   auth: {
// //     // TODO: replace `user` and `pass` values from <https://forwardemail.net>
// //     user: 'fvbio2023@outlook.com',
// //     pass: 'Yves123#'
// //   }
// // });

// // // async..await is not allowed in global scope, must use a wrapper
// // async function main() {
// //   // send mail with defined transport object
// //   const info = await transporter.sendMail({
// //     from: '"Filmvisarna 🍿 🎥"fvbio2023@outlook.com', // sender address
// //     to: "annsisen1@gmail.com", // list of receivers
// //     subject: "Bokningsbekräftelse", // Subject line
// //     text: mailToUser, // plain text body
// //     html: html, // html body
// //   });

// //   console.log("Message sent: %s", info.messageId);
// //   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// //   //
// //   // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
// //   //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
// //   //       <https://github.com/forwardemail/preview-email>
// //   //
// // }

// // main().catch(console.error);








// // // import express from 'express';
// // // import nodemailer from 'nodemailer';

// // // const router = express.Router();

// // // router.post('/email/send-booking-confirmation', async (req, res) => {
// // //     const transporter = nodemailer.createTransport({
// // //         host: 'smtp-mail.outlook.com',
// // //         port: 587,
// // //         secure: false,
// // //         auth: {
// // //           user: 'fvbio2023@outlook.com',
// // //           pass: 'Yves123#', // Om du använder tvåfaktorsautentisering (2FA), använd ett appspecifikt lösenord här
// // //         },
// // //         tls: {
// // //             rejectUnauthorized: false,
// // //         }
// // //       });

// // //   const mailOptions = {
// // //     from: 'fvbio2023@outlook.com',
// // //     to: req.body.email, 
// // //     subject: 'Bokningsbekräftelse',
// // //     // text: `<h1>Tack för din bokning ${}</h1>`, 
// // //   };

// // //    transporter.sendMail(mailOptions, function (error, info) {
// // //     if (error) {
// // //         console.log('Något gick fel: ' + error);
// // //         res.status(500).json({ message: 'Något gick fel', error: error.message }); 
// // //       } else {
// // //       console.log('E-postmeddelandet har skickats: ' + info.response);
// // //       res.status(200).json({ message: 'Bokningsbekräftelse skickad' });
// // //     }
// // //   });
// // // });

// // // export default router;
