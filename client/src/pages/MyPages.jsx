import { useEffect, useState } from "react"
import { performRequest } from "../service/fetchService";
import { parseJwt } from "../service/jwtService";
import { styles } from "../styles";

export default function MyPages() {
    // eslint-disable-next-line
    const [currentUser, setCurrentUser] = useState(parseJwt(sessionStorage.getItem("AuthToken")))
    const [userData, setuserData] = useState([])
    console.log(userData)
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

    const userBookings = userData?.map((booking, index) => (
        <div key={index} className={`${styles.subHeaderText} text-white border-2 border-gold p-2 w-[400px]`} >
            <ul className="flex flex-col">
                <li className="flex justify-between"> <p className="text-gold">Boknings nr:</p> <p>{booking.bookingId}</p></li>
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
                        return seat.seatNumber + ","
                    }
                })}</p></li>
            </ul>
        </div>
    ))
    
  return (
    <div className="mt-20 text-white px-4">
        <h3 className={`${styles.headerText}`} >Dina kontaktuppgifter</h3>
        <ul className={`${styles.subHeaderText} text-white mb-10`}>
            <li>Epostadress: {currentUser.email}</li>
            <li>Namn: {currentUser.name}</li>
            <li>Efternamn: {currentUser.lastname}</li>
            <li>Telefon: {currentUser.phone}</li>
        </ul>
        <h4 className={`${styles.headerText} mb-2`}>Bokningar</h4>
        <div className="flex flex-wrap md:justify-between gap-4 items-start mb-2 justify-center">
        {userBookings}
        </div>
    </div>
  )
}
