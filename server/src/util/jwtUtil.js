import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

//Generate skapar en jwt när en användare loggar in
function generate(user) {
  // registered claims (pre defined payload variables)
  let payloadOptions = {
    issuer: "express-server",
    subject: "user access token",
    expiresIn: "20m", // 4 hours
  };

  // private claims (custom payload)
  let payload = {
    email: user.email,
    role: user.role,
    name: user.name,
    lastname: user.lastname,
    phone: user.phone,
    role: user.role,
    bookings: user.bookings
  };

  let token = jwt.sign(payload, process.env.SUPER_SECRET, payloadOptions);

  return token;
}

function verify(token) {
  try {
    return jwt.verify(token, process.env.SUPER_SECRET); // verify signature and return payload
  } catch (err) {
    let verfError = new Error(); //custom verification error

    if (err.name == "JsonWebTokenError") {
      verfError.clientMessage = "Digital signing is invalid, request new token";
      verfError.serverMessage = "Token verification failed";
    }

    if (err.name == "TokenExpiredError") {
      verfError.clientMessage = "Digital signing is invalid, request new token";
      verfError.serverMessage = "Token expired";
    }

    throw verfError;
  }
}

export default { generate, verify };
