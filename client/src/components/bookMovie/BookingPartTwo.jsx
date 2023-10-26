import { NavLink, useLocation } from "react-router-dom";
import ConfirmBooking from "./ConfirmBooking";
import BookingTicketsForm from "../BookingTicketsForm"
import { useStates } from "react-easier"
import { useEffect, useState } from "react";
import { parseJwt } from "../../service/jwtService";
import { performRequest } from "../../service/fetchService";





export default function BookingPartTwo(){
  const [loggedIn, setLoggedIn] = useState(null)
  const [bookingResult, setBookingResult] = useState(null)
  const location = useLocation()
  const movie = location.state.movie;
  const screening = location.state.screening;
  const booking = location.state.booking;
  
  useEffect(() => {
    const user = parseJwt(sessionStorage.getItem("AuthToken"))
    if(user) {
      setLoggedIn(true)
    }
  }, [setLoggedIn])
    const toggleConfirmation = useStates("toggleConfirmation", {
      toggle: false,
    })

    function calcTotalPrice(adult, child, senior) {
      const totalPrice = (adult * 140) + (child * 120) + (senior * 80)
      return totalPrice
  }

    async function handleBooking() {
      const res = await performRequest("/api/booking", "POST", booking);
      console.log(res);
      if(res.bookingId) {
        setBookingResult(res)
      
        toggleConfirmation.toggle = true
      } else if (res.message){
        console.log(res.message)
      } else {
        console.log(res.error);
      }
    }
    console.log(bookingResult);
    return(
        <>
      {movie && screening &&
            <div className="mt-40 px-6 flex flex-col md:items-center">
              <NavLink to="/booking" className="text-white-100 font-inconsolata underline mb-6"> Tillbaka</NavLink>
              <h1 className="text-white-100 text-xl mb-8 lg:text-4xl">{`${movie.title} | ${screening.date}`}</h1>
              
            <div className="mb-10 max-w-full flex items-end justify-start md:justify-start lg:justify-start">
              <img
                src={`/img/${movie.img_poster}`}
                alt="movie poster from Killers of the flower moon"
                className="w-34 h-48 rounded-lg"
              />
              <div className="text-white-100 ml-4 flex flex-col lg:px-6 md:px-6">
                <p className="text-xs">{}</p>
                <h2 className="text-base font-extra-bold">{movie.title}</h2>
                <p className="font-inconsolata text-xs">{movie.genre}</p>
                <p className="text-xs">{`${screening.time} | ${movie.ageRestriction}`}</p>
              </div>
        
            </div>
      
            <div className="text-white-100 text-sm mb-10">
              <h2 className="font-inconsolata">{`Salong: ${screening.theater}`}</h2>
              <p className="font-inconsolata">{screening.date}</p>
              <p className="font-inconsolata">{`Klockan: ${screening.time}`}</p>
              {booking.adult !== 0 ? <p className="font-inconsolata">{booking.adult} x Ordinarie/Vuxna</p> : null}
              {booking.child !== 0 ? <p className="font-inconsolata">{booking.child} x Barn</p> : null}
              {booking.senior !== 0 ? <p className="font-inconsolata">{booking.senior} x Pensionär</p> : null}
            </div>
        
            <div className="text-white-100 mb-10">
              <p>{`Totalt att betala: ${calcTotalPrice(booking.adult, booking.child, booking.senior)}kr`}</p>
            </div>
            {!loggedIn && <BookingTicketsForm />}
            <button onClick={handleBooking} className={`bg-gold w-36 text-black px-6 py-2 rounded m-auto mb-10`}>Boka</button>
            {toggleConfirmation.toggle && bookingResult &&(
            <ConfirmBooking bookingResult={bookingResult} movie={movie} screening={screening}/>
            )}
          </div>}
        </>
    )
}
