import { useEffect, useState } from "react"
import { performRequest } from "../service/fetchService";
import { parseJwt } from "../service/jwtService";
import { styles } from "../styles";
import CancelBooking from "../components/CancelBooking";

export default function MyPages() {
    // eslint-disable-next-line
    const [currentUser, setCurrentUser] = useState(parseJwt(sessionStorage.getItem("AuthToken")))
    const [toggle, setToggle] = useState(false)
    const [cancelBooking, setCancelBooking] = useState(undefined)
    const [userData, setuserData] = useState([])
    console.log(cancelBooking)

    useEffect(() => {
        (async () => {
                const data = await performRequest("/api/user/bookings")
                console.log(data.error)
                if(data.error) {
                    alert("Du måste logga in först")
                } else {
                    setuserData(data)
                }
                
          })();
    }, [])

    function cancel(booking) {
        setCancelBooking(booking)
        setToggle(true)
    }

    const userBookings = userData?.map((booking, index) => (
        <div key={index} className={`${styles.subHeaderText} text-white border-2 border-gold p-4 rounded-lg`} >
            <ul className="flex flex-col">
                <li className="flex justify-between"> <p className="text-gold">BokningsNr:</p> <p>{booking.bookingId}</p></li>
                <li className="flex justify-between"> <p className="text-gold">Datum:</p> <p>{booking.screening.date}</p></li>
                <li className="flex justify-between"> <p className="text-gold">Tid:</p> <p>{booking.screening.time}</p></li>
                <li className="flex justify-between"> <p className="text-gold">Film:</p> <p>{booking.movie.title}</p></li>
                <li className="flex justify-between"> <p className="text-gold">Pris:</p> <p>{booking.price}kr</p></li>
                <li className="flex justify-between"> <p className="text-gold">Salong:</p> <p>{booking.screening.theater}</p></li>
                <li className="flex justify-between"> <p className="text-gold">Rad:</p> <p>{booking.row}</p></li>
                <li className="flex justify-between"> <p className="text-gold">Plats:</p> <p>{booking.seats.map((seat, i) => {
                    if(i + 1 === booking.seats.length) {
                        return seat.seatNumber
                    } else {
                        return seat.seatNumber + ", "
                    }
                })}</p></li>
                <li className="flex justify-between"> <p className="text-gold">Giltig:</p> <p>{booking.status ? "Bokad" : "Avbokad"}</p></li>
                <li className="flex justify-between"> <p className="text-gold">{booking.status ? "Vill du avboka?" : ""}</p><button disabled={!booking.status} className="bg-red-400 px-2" onClick={() => cancel(booking)}>Avboka</button> </li>
            </ul>
            
        </div>
    ))
    
  return (
    <div className="my-20 text-white px-8">
        <div className="">
        <h3 className={`${styles.headerText}`} >Dina kontaktuppgifter</h3>
        <ul className={`${styles.subHeaderText} text-white mb-10`}>
            <li>Epostadress: {currentUser.email}</li>
            <li>Namn: {currentUser.name}</li>
            <li>Efternamn: {currentUser.lastname}</li>
            <li>Telefon: {currentUser.phone}</li>
        </ul>    
        <h4 className={`${styles.headerText} mb-2`}>Bokningar</h4>
        </div>
        
        {/* {!toggle && <div className="grid grid-cols-auto-fit-mobile sm:grid-cols-auto-fit-sm lg:grid-cols-auto-fit-lg gap-8"> */}
        {/* {!toggle && <div className="grid grid-cols-auto-fit-mobile sm:grid-cols-auto-fit-sm lg:grid-cols-auto-fit-lg gap-8"> */}
        {!toggle && <div className="grid grid-cols-auto-fit-mobile sm:grid-cols-auto-fit-sm lg:grid-cols-auto-fit-lg gap-8">
        {userBookings}
        </div>}
        {toggle && <CancelBooking booking={cancelBooking} setToggle={setToggle} />}
    </div>
  )
}
