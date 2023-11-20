import { useEffect, useState } from "react"
import { performRequest } from "../service/fetchService";
import { parseJwt } from "../service/jwtService";
import CancelBooking from "../components/userPage/CancelBooking";
import { useNavigate } from "react-router-dom";
import UserBookingCard from "../components/userPage/UserBookingCard";
import { motion } from "framer-motion";

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
   
  
   
   
    
  return (
    <>
    {currentUser && userData && <div className="mb-[14rem] text-white max-w-[130rem] mx-auto">
        {!toggle &&
        <div className="p-4 sm:ml-6">
          <h3 className={`text-gold text-2xl md:text-3xl mb-4 mt-6`} >Dina kontaktuppgifter</h3>
          <ul className={`text-xl md:text-2xl  text-white mb-10`}>
            <li>Epostadress: {currentUser.email}</li>
            <li>Namn: {currentUser.name}</li>
            <li>Efternamn: {currentUser.lastname}</li>
            <li>Telefon: {currentUser.phone}</li>
          </ul>    
        </div>}
        
        <div>
        
          {!toggle && 
          <>
            
            {userData.some((booking) => booking.status) ? 
              <div className="flex items-center mb-10 ">
                <h4 className={`text-gold text-xl md:text-2xl lg:text-3xl ml-8 mr-4 `}>Aktuella bokningar</h4>
                <span className="hidden xs:block flex-grow h-[2px] mr-8 bg-gold mt-2"></span>
              </div>
            : (
              <>
              <div className="flex items-center mb-4 ">
                <h4 className={`text-gold text-xl md:text-2xl lg:text-3xl ml-8 mr-4 `}>Aktuella bokningar</h4>
                <span className="hidden xs:block flex-grow h-[2px] mr-8 bg-gold mt-2"></span>
              </div>
              <p className="text-white sm:text-xl md:text-2xl ml-12">Du har inga aktuella bokningar</p>
              
            </>
            
          )}
            <motion.div layout className="grid grid-row-gap grid-cols-auto-fit-mobile mdd:grid-cols-auto-fit-sm+">
              
              {userData.map((booking, index) => (
              <>
              {booking.status &&
              <UserBookingCard
                key={index}
                booking={booking}
                setCancelBooking={setCancelBooking}
                setToggle={setToggle}
              />}
              </>
              ))}
              
            </motion.div>
          </>}
          
          {!toggle && 
          <>
          {userData.some((booking) => !booking.status) ? 
            <div className="flex items-center mb-6 mt-12 ">
              <h4 className={` text-gold text-xl md:text-2xl lg:text-3xl ml-8 mr-4`}>Tidigare bokningar</h4>
              <span className="hidden xs:block flex-grow h-[2px] mr-8 bg-gold mt-2"></span>
            </div>
          : (
            <>
            <div className="flex items-center mb-4 mt-12 ">
              <h4 className={` text-gold text-xl md:text-2xl lg:text-3xl ml-8 mr-4`}>Tidigare bokningar</h4>
              <span className="hidden xs:block flex-grow h-[2px] mr-8 bg-gold mt-2"></span>
            </div>
            <p className="text-white  ml-12 sm:text-xl md:text-2xl">Du har inga tidigare bokningar</p>
          </>
          )}
          <motion.div layout className="grid grid-row-gap grid-cols-auto-fit-mobile sm:grid-cols-auto-fit-sm+">
            
            {userData.map((booking, index) => (
            <>
            {!booking.status &&
            <UserBookingCard
              key={index}
              booking={booking}
              setCancelBooking={setCancelBooking}
              setToggle={setToggle}
            />}
            </>
            ))}
          </motion.div>
          </>}
          
        </div>
        {toggle && <CancelBooking booking={cancelBooking} setToggle={setToggle} />}
    </div>}
    </>
  )
}
