import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

//eslint-disable-next-line
export default function ConfirmBooking({ bookingResult, movie, screening }) {
  console.log(bookingResult);
  const navigate = useNavigate()
  return (
    <>
<div className="bg-white-100 w-3/4 md:w-5/12 lg:w-96 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 rounded-md">
  
  <div className="text-center mt-4 w-full h-full">
  
    <h1 className={` top-1/4 text-xl font-bold`}>
      Tack för din bokning!
    </h1>
    {bookingResult && movie && screening && 
    <div className="flex-grow p-5 flex flex-col items-start justify-between">
      <p className="text-left mb-2">Bokningsbekräftelse har nu skickats till din email!</p>
      <p>Bokningsnummer: <span>{bookingResult.bookingId}</span> </p>
      <p>Film: <span>{movie.title}</span></p>
      <p>Biljetter: 
        { bookingResult.ticketType.adult !== 0 ? <span> {bookingResult.ticketType.adult} Vuxen</span> : null}
        { bookingResult.ticketType.child !== 0 ? <span> {bookingResult.ticketType.child} Barn</span> : null}
        {bookingResult.ticketType.senior !== 0 ? <span> {bookingResult.ticketType.senior} Pensionär</span> : null}
      </p>
      <p>Rad: <span>{` Rad: ${bookingResult.row}`}</span></p>
      <p>Plats: <span>{`${bookingResult.seats?.map((seat) => seat.seatNumber)}`}</span></p>
      <p>datum: <span> {screening.date}</span></p>
      <p>Epost: <span>{bookingResult.customerEmail}</span></p>
      <p>Pris: <span>{`${bookingResult.price}kr`}</span></p>
     
    </div>}
    <button onClick={() => navigate("/")} className='bg-gold text-black-100 rounded-md px-4 p-1 mb-4'>
        Stäng
      </button>
  </div>

 </div>

</>

  );
}

ConfirmBooking.propTypes = {
  bookingResult: PropTypes.object,
  movie: PropTypes.object,
  screening: PropTypes.object
}