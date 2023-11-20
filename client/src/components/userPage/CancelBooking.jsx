/* eslint-disable */
import { performRequest } from "../../service/fetchService";
import newDateFormat from "../../service/newDateFormat";



export default function CancelBooking({booking, setToggle}) {
    async function cancelBooking(ID) {
        const resp = await performRequest("/api/bookings", "PATCH", {id: ID})
        if(resp.message === "Din bokning är nu avbokad!") {
            window.location.reload();
        } else {
            alert("Något gick fel")
        }
    }
  return (
    <div className={`flex flex-col items-center mb-4 mt-12 xs:max-w-[32rem] xs:mx-auto`}>
        <h4 className={`text-gold text-xl sm:text-2xl md:text-3xl mb-4 mt-6 mx-4`} >Är du säker på att du vill avboka?</h4>
        <div className="flex flex-col w-5/6 xs:w-full justify-center xs:flex-row xs:items-end text-white xs:mb-6">
            <img 
              src={`/img/${booking.movie.img_poster}`} 
              alt={`poster of the movie: ${booking.movie.title}`} 
              className={`w-[10rem] rounded-lg mx-auto xs:mx-0 mb-4 xs:mb-0`}
            />
            <div className="hidden xs:flex flex-col gap-1 mt-4 xs:mb-0 ">
              <p className="text-md md:text-xl xs:ml-4">{booking.movie?.title}</p>
              <p className="text-base md:text-lg xs:ml-4">{newDateFormat(booking.screening?.date)}</p> 
              <p className="text-base md:text-lg xs:ml-4">Klockan {booking.screening?.time}</p> 
              <p className="text-base md:text-lg xs:ml-4">BokningsNr: {booking.bookingId}</p>
            </div>  
        </div>
        {booking && 
            <div className={`text-white w-4/6 xs:w-[21rem]`}>
              <ul className="flex flex-col md:text-lg">
                <div className="xs:hidden">
<                   li className="flex justify-between"> <p className="text-gold">Film:</p> <p>{booking.movie.title}</p></li>
                    <li className="flex justify-between"> <p className="text-gold">BokningsNr:</p> <p>{booking.bookingId}</p></li>
                    <li className="flex justify-between"> <p className="text-gold">Datum:</p> <p>{booking.screening.date}</p></li>
                    <li className="flex justify-between"> <p className="text-gold">Tid:</p> <p>{booking.screening.time}</p></li>
                </div>
                <li className="flex justify-between"> <p className="text-gold">Salong:</p> <p>{booking.screening?.theaterName}</p></li>
                <li className="flex justify-between"> <p className="text-gold">Rad:</p> <p>{`${booking.rows ? booking.rows?.map((row) => row.row).join(", "): booking.row}`}</p></li>
                <li className="flex justify-between"> <p className="text-gold">Plats:</p> <p>{booking.seats.map((seat, i) => {
                    if(i + 1 === booking.seats.length) {
                        return seat.seatNumber
                    } else {
                        return seat.seatNumber + ", "
                    }
                })}</p></li>
                <li className="flex justify-between"> <p className="text-gold">Pris:</p> <p>{booking.price}kr</p></li>
                <li className="flex justify-between"> <p className="text-gold mb-6">Status:</p> <p>{booking.status ? "Bokad" : "Avbokad"}</p></li>
                <li className="flex justify-evenly"> <button onClick={() => cancelBooking(booking._id)} className={` text-lg rounded-md px-4 py-1 bg-red-600 text-white`}>Avboka</button><button onClick={() => setToggle(false)} className={`rounded-md text-lg px-4 py-1 bg-gold text-black`}>Tillbaka</button> </li>
              </ul>
            </div>
        }
    </div>
  )
}
