import { useEffect, useState } from "react";
import { performRequest } from "../service/fetchService";
import { parseJwt } from "../service/jwtService";
import CancelBooking from "../components/userPage/CancelBooking";
import { useNavigate } from "react-router-dom";
import UserBookingCard from "../components/userPage/UserBookingCard";
import { motion } from "framer-motion";

export default function MyPages() {
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState(
    parseJwt(sessionStorage.getItem("AuthToken")),
  );
  const [toggle, setToggle] = useState(false);
  const [cancelBooking, setCancelBooking] = useState(undefined);
  const [userData, setuserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = sessionStorage.getItem("AuthToken");
    if (!authToken || authToken === "") {
      navigate("/");
    } else if (authToken) {
      const decoded = parseJwt(authToken);
      if (decoded.role !== "ADMIN" && decoded.role !== "USER") {
        navigate("/");
      }
    }
  }, [navigate]);

  useEffect(() => {
    (async () => {
      const data = await performRequest("/api/user/bookings");
      if (data.error) {
        alert("Du måste logga in först");
      } else {
        setuserData(data);
      }
    })();
  }, []);

  return (
    <>
      {currentUser && userData && (
        <div className="mx-auto mb-[14rem] max-w-[130rem] text-white">
          {!toggle && (
            <div>
              <h3 className={`mb-4 ml-8 mt-6 text-2xl text-gold md:text-3xl`}>
                Dina kontaktuppgifter
              </h3>
              <ul className={`mb-10 ml-12  text-xl text-white  md:text-2xl`}>
                <li>
                  <span className="font-bold">Epostadress:</span>{" "}
                  {currentUser.email}
                </li>
                <li>
                  <span className="font-bold">Namn:</span> {currentUser.name}
                </li>
                <li>
                  <span className="font-bold">Efternamn:</span>{" "}
                  {currentUser.lastname}
                </li>
                <li>
                  <span className="font-bold">Telefon:</span>{" "}
                  {currentUser.phone}
                </li>
              </ul>
            </div>
          )}

          <div>
            {!toggle && (
              <>
                {userData.some((booking) => booking.status) ? (
                  <div className="mb-10 flex items-center ">
                    <h4
                      className={`ml-8 mr-4 text-xl text-gold md:text-2xl lg:text-3xl `}
                    >
                      Aktuella bokningar
                    </h4>
                    <span className="mr-8 mt-2 hidden h-[2px] flex-grow bg-gold xs:block"></span>
                  </div>
                ) : (
                  <>
                    <div className="mb-4 flex items-center ">
                      <h4
                        className={`ml-8 mr-4 text-xl text-gold md:text-2xl lg:text-3xl `}
                      >
                        Aktuella bokningar
                      </h4>
                      <span className="mr-8 mt-2 hidden h-[2px] flex-grow bg-gold xs:block"></span>
                    </div>
                    <p className="ml-12 text-white sm:text-xl md:text-2xl">
                      Du har inga aktuella bokningar
                    </p>
                  </>
                )}
                <motion.div
                  layout
                  className="grid-row-gap grid grid-cols-auto-fit-mobile mdd:grid-cols-auto-fit-sm+"
                >
                  {userData.map((booking, index) => (
                    <div key={index} className={booking.status ? "" : "hidden"}>
                      {booking.status && (
                        <UserBookingCard
                          index={index}
                          booking={booking}
                          setCancelBooking={setCancelBooking}
                          setToggle={setToggle}
                        />
                      )}
                    </div>
                  ))}
                </motion.div>
              </>
            )}

            {!toggle && (
              <>
                {userData.some((booking) => !booking.status) ? (
                  <div className="mb-6 mt-12 flex items-center ">
                    <h4
                      className={` ml-8 mr-4 text-xl text-gold md:text-2xl lg:text-3xl`}
                    >
                      Tidigare bokningar
                    </h4>
                    <span className="mr-8 mt-2 hidden h-[2px] flex-grow bg-gold xs:block"></span>
                  </div>
                ) : (
                  <>
                    <div className="mb-4 mt-12 flex items-center ">
                      <h4
                        className={` ml-8 mr-4 text-xl text-gold md:text-2xl lg:text-3xl`}
                      >
                        Tidigare bokningar
                      </h4>
                      <span className="mr-8 mt-2 hidden h-[2px] flex-grow bg-gold xs:block"></span>
                    </div>
                    <p className="ml-12  text-white sm:text-xl md:text-2xl">
                      Du har inga tidigare bokningar
                    </p>
                  </>
                )}
                <motion.div
                  layout
                  className="grid-row-gap grid grid-cols-auto-fit-mobile sm:grid-cols-auto-fit-sm+"
                >
                  {userData.map((booking, index) => (
                    <div
                      key={index}
                      className={!booking.status ? "" : "hidden"}
                    >
                      {!booking.status && (
                        <UserBookingCard
                          index={index}
                          booking={booking}
                          setCancelBooking={setCancelBooking}
                          setToggle={setToggle}
                        />
                      )}
                    </div>
                  ))}
                </motion.div>
              </>
            )}
          </div>
          {toggle && (
            <CancelBooking booking={cancelBooking} setToggle={setToggle} />
          )}
        </div>
      )}
    </>
  );
}
