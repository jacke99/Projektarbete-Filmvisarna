import { useEffect, useState } from "react"
import { performRequest } from "../service/fetchService";
import { parseJwt } from "../service/jwtService";

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
        <div key={index} className="border-2 border-gold">
            <ul>
                <li>Boknings id: {booking.bookingId}</li>
                <li>Datum: {booking.date}</li>
                <li>Film: {booking.movie}</li>
            </ul>
        </div>
    ))
    
  return (
    <div className="mt-40 text-white">
        <h3>Mina Sidor</h3>
        <ul>
            <li>Epostadress: {currentUser.email}</li>
            <li>Namn: {currentUser.name}</li>
            <li>Efternamn: {currentUser.lastname}</li>
            <li>Telefon: {currentUser.phone}</li>
        </ul>
        <h4>Bokningar</h4>
        <div className="flex flex-col gap-4 items-start">
        {userBookings}
        </div>
    </div>
  )
}
