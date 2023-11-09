import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

//eslint-disable-next-line
export default function ConfirmBooking({ bookingResult, movie, screening }) {
  console.log(bookingResult);
  const navigate = useNavigate()
  return (
<div className="w-3/4 md:w-7/12 lg:w-[35rem] rounded-md text-white m-auto">
  
  <div className="text-center mt-4 w-full h-full">
  
    <h1 className={` top-1/4 font-bold mb-10 text-4xl`}>
      Tack för din bokning!
    </h1>
    {bookingResult && movie && screening && 
    <>
    <div className="mb-10 max-w-full flex justify-center items-end">
        <img
          src={`/img/${movie.img_poster}`}
          alt="movie poster"
          className="w-34 h-48 rounded-lg"
        />
        <div className="text-white-100 ml-4 flex flex-col items-start lg:px-6 md:px-6">
          <p className="text-xl">{}</p>
          <h2 className="text-xl font-extra-bold">{movie.title}</h2>
          <p className="font-inconsolata text-base text-start">{movie.genre}</p>
          <p className="text-base">{`${movie.ageRestriction === 0 ? "Ingen åldersgräns" : movie.ageRestriction + " år"}`}</p>
        </div>
        
      </div>
    <ul className="flex flex-col sm:text-lg md:text-xl ">
      <p className="text-xl sm:text-2xl lg:text-3xl text-left mb-6">En bokningsbekräftelse har nu skickats till din email!</p>
      <li className="flex justify-between"><p>Bokningsnummer:</p> <p>{bookingResult.bookingId}</p> </li>
      <li className="flex justify-between"><p>Film:</p> <p>{movie.title}</p></li>
      <li className="flex justify-between"> <p>Biljettyp:</p> 
      
      { bookingResult.ticketType.adult ===1 ? <p> {bookingResult.ticketType.adult} Vuxen</p> : null}
        { bookingResult.ticketType.adult >1 ? <p> {bookingResult.ticketType.adult} Vuxna</p> : null}

        { bookingResult.ticketType.child !== 0 ? <p> {bookingResult.ticketType.child} Barn</p> : null}
       
        {bookingResult.ticketType.senior ===1 ? <p> {bookingResult.ticketType.senior} Pensionär</p> : null}
        {bookingResult.ticketType.senior >1 ? <p> {bookingResult.ticketType.senior} Pensionärer</p> : null}

      </li>
      <li className="flex justify-between"> <p>Rad: </p><p>{`${bookingResult.row}`}</p></li>
      <li className="flex justify-between"> <p>Plats:</p> <p>{`${bookingResult.seats?.map((seat) => seat.seatNumber)}`}</p></li>
      <li className="flex justify-between"> <p>Salong: </p>{screening.theaterName}</li>
      <li className="flex justify-between"> <p>Datum:</p> <p> {screening.date}</p></li>
      <li className="flex justify-between"> <p>Epost:</p> <p>{bookingResult.customerEmail}</p></li>
      <li className="flex justify-between"> <p>Pris:</p> <p>{`${bookingResult.price} kr`}</p></li>
     
    </ul>
    </>}
    <button onClick={() => navigate("/")} className='bg-gold w-36 text-black px-6 py-2 rounded m-auto text-xl my-12'>
        Hem
      </button>
  </div>

 </div>



  );
}

ConfirmBooking.propTypes = {
  bookingResult: PropTypes.object,
  movie: PropTypes.object,
  screening: PropTypes.object
}