import { expandMore, expandLess } from "../../assets";
import { AnimatePresence, motion } from "framer-motion";
import newDateFormat from "../../service/newDateFormat";
import PropTypes from "prop-types"
import { useState } from "react";

export default function UserBookingCard({ booking, setCancelBooking, setToggle }) {
  // const [toggleExpand, setToggleExpand] = useState(false)
  const [isExpanded, setExpanded] = useState(false);

  function cancel(booking) {
    setCancelBooking(booking)
    setToggle(true)
  }

 
return(
  <motion.div 
  className={` flex flex-col mx-auto mdd:ml-8 text-white rounded-lg  relative`}>
  <div className="w-full max-w-[17rem] xs:max-w-[24rem] xs:mx-0">

 
  <motion.div className="flex flex-col xs:flex-row xs:items-end">
    <img 
      src={`/img/${booking.movie.img_poster}`} 
      alt={`poster of the movie: ${booking.movie.title}`} 
      className={`w-[10rem] rounded-lg mx-auto xs:mx-0`}
    />
    <div className="flex flex-col gap-1 mt-4 xs:mb-0">
      <p className="text-md md:text-xl ml-4">{booking.movie?.title}</p>
      <p className="text-base md:text-lg ml-4">{booking.status ? newDateFormat(booking.screening?.date): booking.screening?.date}</p> 
      <p className="text-base md:text-lg ml-4">Klockan {booking.screening?.time}</p> 
      <p className="text-base md:text-lg ml-4">BokningsNr: {booking.bookingId}</p>
      <div className="flex whitespace-nowrap w-20 mb-2 mx-auto cursor-pointer underline xs:mb-0" onClick={() => setExpanded(!isExpanded)}>
        {isExpanded ? "Mindre" : "Mer info"}
        {isExpanded && <img className="w-8" src={expandLess} alt="expand less icon" />}
        {!isExpanded && <img className="w-8" src={expandMore} alt="expand more icon" />}
      </div>
    </div>
  </motion.div>
  <AnimatePresence>
  {isExpanded && (
    <motion.div 
      className={`text-base mt-2 w-full mx-auto`}
      initial={{opacity: 0, y: -30}}
      animate={{opacity: 1, y: 0}}
      exit={{opacity: 0, y: -30}}
      transition={{
        duration: .5,
      }}>
        <p className="flex justify-between"> <p className="text-gold md:text-lg">Salong:</p> <p className="md:text-lg">{booking.screening?.theaterName}</p></p>
        <p className="flex justify-between"> <p className="text-gold md:text-lg">Rad:</p> <p className="md:text-lg">{`${booking.rows ? booking.rows?.map((row) => row.row).join(", "): booking.row}`}</p></p>
        <p className="flex justify-between"> <p className="text-gold md:text-lg">Plats:</p> <p className="md:text-lg">{`${booking.seats?.map((seat) => seat.seatNumber).join(", ")}`}</p></p>
        <p className="flex justify-between"> <p className="text-gold md:text-lg">Pris:</p> <p className="md:text-lg">{booking.price} kr</p></p>
        <p className="flex justify-between"> <p className="text-gold md:text-lg">Status:</p> <p className="md:text-lg">{booking.status ? "Bokad" : "Inaktiv"}</p></p>
        <div className="flex justify-center">
        {booking.status ? <button disabled={!booking.status} className="bg-red-600 px-3 py-1 rounded-lg mt-4" onClick={() => cancel(booking)}>Avboka</button> : "" }
      </div>
    </motion.div>
    
  )}
    </AnimatePresence>
    </div>
</motion.div>
)
}

  
    


UserBookingCard.propTypes = {
    booking: PropTypes.object,
    setCancelBooking: PropTypes.func,
    setToggle: PropTypes.func,
    index: PropTypes.number,
    columnIndex: PropTypes.number,
    expandedStates: PropTypes.array,
    setExpandedStates: PropTypes.func

  }