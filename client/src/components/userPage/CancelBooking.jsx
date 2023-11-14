/* eslint-disable */

import { performRequest } from "../../service/fetchService";

import { styles } from "../../styles";

export default function CancelBooking({booking, setToggle}) {
    async function cancelBooking(ID) {
        console.log(ID)
        const resp = await performRequest("/api/bookings", "PATCH", {id: ID})
        if(resp.message === "Din bokning är nu avbokad!") {
            window.location.reload();
        } else {
            alert("Något gick fel")
        }
    }
  return (
    <div className={`${styles.subHeaderText} flex flex-col items-center mb-4`}>
        <h4 className={`${styles.headerText} mb-4`} >Är du säker på att du vill avboka?</h4>
        {booking && 
            <div className={`${styles.subHeaderText} text-white border-2 border-gold p-2 w-[500px]`}>
            <ul className="flex flex-col">
                <li className="flex justify-between"> <p className="text-gold">BokningsNr:</p> <p>{booking.bookingId}</p></li>
                <li className="flex justify-between"> <p className="text-gold">Datum:</p> <p>{booking.screening?.date}</p></li>
                <li className="flex justify-between"> <p className="text-gold">Tid:</p> <p>{booking.screening?.time}</p></li>
                <li className="flex justify-between"> <p className="text-gold">Film:</p> <p>{booking.movie?.title}</p></li>
                <li className="flex justify-between"> <p className="text-gold">Pris:</p> <p>{booking.price}kr</p></li>
                <li className="flex justify-between"> <p className="text-gold">Salong:</p> <p>{booking.screening?.theater}</p></li>
                <li className="flex justify-between"> <p className="text-gold">Rad:</p> <p>{`${booking.rows ? booking.rows?.map((row) => row.row).join(", "): booking.row}`}</p></li>
                <li className="flex justify-between"> <p className="text-gold">Plats:</p> <p>{`${booking.seats?.map((seat) => seat.seatNumber).join(", ")}`}</p></li>
                <li className="flex justify-between"> <p className="text-gold">Giltig:</p> <p>{booking.status ? "Bokad" : "Avbokad"}</p></li>
                <li className="flex justify-evenly"> <button onClick={() => cancelBooking(booking._id)} className={`${styles.buttonStyle} bg-red-400 text-white`}>Ja</button><button onClick={() => setToggle(false)} className={`${styles.buttonStyle}`}>Nej</button> </li>
            </ul>
            </div>
        }
    </div>
  )
}
