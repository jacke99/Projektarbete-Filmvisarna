import jwt from "jsonwebtoken";
import { readFileSync } from "fs";
import * as dotenv from "dotenv";
dotenv.config();

const privateKey = readFileSync(process.env.PRIVATE_KEY_PATH, "utf8");
const publicKey = readFileSync(process.env.PUBLIC_KEY_PATH, "utf8");

//Generate skapar en jwt när en användare loggar in
function generate(user) {
  // registered claims (pre defined payload variables)
  let payloadOptions = {
    issuer: "express-server",
    subject: "user access token",
    expiresIn: "16h", // 4 hours,
    algorithm: "RS256",
  };

  // private claims (custom payload)
  let payload = {
    email: user.email,
    role: user.role,
    name: user.name,
    lastname: user.lastname,
    phone: user.phone,
    role: user.role,
  };

  let token = jwt.sign(payload, privateKey, payloadOptions);

  return token;
}

function verify(token) {
  try {
    return jwt.verify(token, publicKey); // verify signature and return payload
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
