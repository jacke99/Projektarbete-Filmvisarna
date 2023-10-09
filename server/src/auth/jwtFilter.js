 import jwtUtil from "../util/jwtUtil";

 function authorizeAdmin(res, req, next) {
       const authHeader = req.headers["authorization"]
       const token = authHeader.replace("Bearer ", "")
       const decoded = jwtUtil.verify(token)
       if(authHeader == undefined) {
        res.status(400).send("Authorization header is missing")
       } else {
            if(decoded.role == "ADMIN") {
                next()
            } else {
                res.status(403).send("You are not authorized to access this resource")
            }
       }
 }

 export default { authorizeAdmin }