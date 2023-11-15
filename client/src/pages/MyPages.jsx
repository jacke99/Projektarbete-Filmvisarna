import { useEffect, useState } from "react"
import { performRequest } from "../service/fetchService";
import { parseJwt } from "../service/jwtService";
import { styles } from "../styles";
import CancelBooking from "../components/userPage/CancelBooking";
import { useNavigate } from "react-router-dom";
import { expandMore, expandLess } from "../assets";

export default function MyPages() {
    // eslint-disable-next-line
    const [currentUser, setCurrentUser] = useState(parseJwt(sessionStorage.getItem("AuthToken")))
    const [toggle, setToggle] = useState(false)
    const [cancelBooking, setCancelBooking] = useState(undefined)
    const [userData, setuserData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const authToken = sessionStorage.getItem("AuthToken");
        if(!authToken || authToken === "") {
          navigate("/")
        } else if(authToken) {
            const decoded = parseJwt(authToken)
            if(decoded.role !== "ADMIN" && decoded.role !== "USER") {
                navigate("/")
            }
        }
    }, [navigate])

    useEffect(() => {
        (async () => {
                const data = await performRequest("/api/user/bookings")
                console.log(data)
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
        <div key={index} className={` text-lg text-white border-2 rounded-lg w-full md:w-[25rem]`} >
            <div className="flex flex-col gap-6 items-center">
                <img 
                  src={`/img/${booking.movie.img_poster}`} 
                  alt={`poster of the movie: ${booking.movie.title}`} 
                  className="w-[10rem] rounded-lg"
                />
                <div className="flex flex-col">
                    <p className="text-md">{booking.movie?.title}</p>
                    <p className="text-base">{`${booking.screening?.date} | ${booking.screening?.time}`}</p> 
                    <p className="text-base">Bokningsnr: {booking.bookingId}</p>
                    <button disabled={!booking.status} className="bg-red-600 px-3 py-1 rounded-lg w-[5rem]" onClick={() => cancel(booking)}>Avboka</button>
                </div>
                <div className="flex flex-col items-center">
                    <p>Läs mer</p>
                    {/* <img src={expandLess} alt="expand less icon" /> */}
                    <img className="w-8" src={expandMore} alt="expand more icon" />
                </div>
             

            </div>
            {/* <ul className="">
                <li className="flex"> <p className="text-gold">BokningsNr:</p> <p>{booking.bookingId}</p></li>
                <li className="flex"> <p className="text-gold">Pris:</p> <p>{booking.price}kr</p></li>
                <li className="flex"> <p className="text-gold">Salong:</p> <p>{booking.screening?.theaterName}</p></li>
                <li className="flex"> <p className="text-gold">Rad:</p> <p>{`${booking.rows ? booking.rows?.map((row) => row.row).join(", "): booking.row}`}</p></li>
                <li className="flex"> <p className="text-gold">Plats:</p> <p>{`${booking.seats?.map((seat) => seat.seatNumber).join(", ")}`}</p></li>
                <li className="flex"> <p className="text-gold">Giltig:</p> <p>{booking.status ? "Bokad" : "Avbokad"}</p></li>
                <li className="flex"> <button disabled={!booking.status} className="bg-red-600 px-3 py-1 rounded-lg" onClick={() => cancel(booking)}>Avboka</button> </li>
            </ul> */}
            
        </div>
    ))
    
  return (
    <>
    {currentUser && userData && <div className="mb-20 text-white px-8">
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
        {!toggle && <div className="">
        {userBookings}
        </div>}
        {toggle && <CancelBooking booking={cancelBooking} setToggle={setToggle} />}
    </div>}
    </>
  )
}
