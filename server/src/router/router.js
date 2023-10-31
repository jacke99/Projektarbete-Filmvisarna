import express from "express";
import * as dotenv from "dotenv";
import uploads from '../middleware/fileUpload.js'
import adminController from "../controller/adminController.js";
import accountController from "../controller/accountController.js";
import jwtFilter from "../auth/jwtFilter.js"
import userController from "../controller/userController.js";
import sseController from "../controller/sseController.js";
import jwtFilterForm from "../auth/jwtFilterForm.js";
dotenv.config();

const router = express.Router();

//Admin routes
router.post("/screenings", jwtFilter.bind({role: "ADMIN"}) , adminController.addScreening)
router.delete("/screenings/:id",jwtFilter.bind({role: "ADMIN"}), adminController.deleteScreening)
router.post("/movies/:token", jwtFilterForm.bind({role: "ADMIN"}), uploads.fields([{ name: 'img_poster' }, { name: 'img_header' }]), adminController.postMovie); 
router.delete("/movies/:id", jwtFilter.bind({role: "ADMIN"}), adminController.deleteMovie)
router.get("/bookings", jwtFilter.bind({role: "ADMIN"}), adminController.getBookingsXuser)
router.post("/theaters", jwtFilter.bind({role: "ADMIN"}), adminController.addNewTheater)
router.get("/users", adminController.getUsers)


//Accounts (register, login, get user booking/history)
router.post("/register", accountController.register)
router.put("/login", accountController.login)
router.get("/user/bookings", accountController.getUserBookings )

//User stuff
router.get("/movies/upcoming", userController.getMoviesUpComing)
router.get("/movies/current", userController.getMoviescurrent)

router.get("/movies", userController.getMovies)
router.get("/movies/:id", userController.getMovie)
router.get('/filteredScreenings', userController.getScreenings )


//SSE
router.post("/booking", sseController.postBooking);
router.patch("/bookings", sseController.cancelBooking)
router.get("/screenings/:id", sseController.getScreeningById);

export default router;
