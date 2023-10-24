import jwtUtil from "../util/jwtUtil.js";

export default function (request, response, next) {
   const authHeader = request.params.token;
   if (!authHeader || !authHeader.length > 0 || authHeader === "Bearer null") {
     response.status(400).send("Authorization header is missing");
   } else {
     const authToken = authHeader.replace("Bearer ", "");
     try {
       const payload = jwtUtil.verify(authToken);
       if(!this.role.includes(payload.role)) {
         return response.status(401).send({error: "User role is too low for requested action"});
       } else {
         response.locals.username = payload.username;
         next();
       }
     } catch (error) { 
       return response.status(403).send({error: error.clientMessage});
     }
   }
}