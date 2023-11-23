import { NavLink, useLocation } from "react-router-dom";
import ConfirmBooking from "../../components/bookMovie/ConfirmBooking";
import BookingTicketsForm from "../../components/bookMovie/BookingTicketsForm";
import { useStates } from "react-easier";
import { useEffect, useState } from "react";
import { parseJwt } from "../../service/jwtService";
import { performRequest } from "../../service/fetchService";
import newDateFormat from "../../service/newDateFormat";
import Loader from "../../components/Loader";

export default function BookingTickets() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [bookingResult, setBookingResult] = useState(null);
  const [nodeMailerError, setNodeMailerError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [inputValues, setInputValues] = useState({
    email: "",
    reEmail: "",
    phone: "",
  });

  const location = useLocation();
  const movie = location.state.movie;
  const screening = location.state.screening;
  const booking = location.state.booking;
  useEffect(() => {
    const user = parseJwt(sessionStorage.getItem("AuthToken"));
    if (user) {
      setLoggedIn(true);
    }
  }, [setLoggedIn]);
  const toggleConfirmation = useStates("toggleConfirmation", {
    toggle: false,
  });

  function calcTotalPrice(adult, child, senior) {
    const totalPrice = adult * 140 + child * 120 + senior * 80;
    return totalPrice;
  }

  async function handleBooking() {
    setLoader(true);
    if (!loggedIn) {
      if (inputValues.email === inputValues.reEmail) {
        booking.email = inputValues.email;
        booking.phone = inputValues.phone;
      } else {
        alert("Emails matchar inte");
        return;
      }
    }
    const res = await performRequest("/api/booking", "POST", booking);
    if (res.booking.bookingId) {
      setBookingResult(res.booking);
      setNodeMailerError(res.emailError);

      toggleConfirmation.toggle = true;
    } else if (res.message) {
      console.log(res.message);
    } else {
      console.log(res.error);
    }
    setLoader(false);
  }
  return (
    <>
      {movie && screening && (
        <div className="mt-10 flex flex-col items-center px-6">
          <NavLink
            to={`/bokning/${screening._id}`}
            className="mb-6 font-inconsolata text-white-100 underline"
          >
            {" "}
            Tillbaka
          </NavLink>

          {!toggleConfirmation.toggle && (
            <>
              <h1 className="mb-8 text-xl text-white-100 lg:text-4xl">{`${
                movie.title
              } | ${newDateFormat(screening.date)}`}</h1>
              <div className="mb-10 flex max-w-full items-end justify-start md:justify-start lg:justify-start">
                <img
                  src={`/img/${movie.img_poster}`}
                  alt={`movie poster from ${movie.title}`}
                  className="w-34 h-48 rounded-lg"
                />
                <div className="ml-4 flex flex-col text-white-100 md:px-6 lg:px-6">
                  <p className="text-base">{}</p>
                  <h2 className="font-extra-bold text-xl">{movie.title}</h2>
                  <p className="font-inconsolata text-base">{movie.genre}</p>
                  <p className="text-base">{`${screening.time} | ${
                    movie.ageRestriction === 0
                      ? "Ingen åldersgräns"
                      : movie.ageRestriction + " år"
                  }`}</p>
                </div>
              </div>

              <div className="mb-10 text-base text-white-100">
                <h2 className="font-inconsolata">{`${screening.theaterName}`}</h2>
                <p className="font-inconsolata">
                  {newDateFormat(screening.date)}
                </p>
                <p className="font-inconsolata">{`Klockan: ${screening.time}`}</p>

                {booking.adult === 1 ? (
                  <p className="font-inconsolata">
                    {booking.adult} x Ordinarie/Vuxen
                  </p>
                ) : null}
                {booking.adult > 1 ? (
                  <p className="font-inconsolata">
                    {booking.adult} x Ordinarie/Vuxna
                  </p>
                ) : null}

                {booking.child !== 0 ? (
                  <p className="font-inconsolata">{booking.child} x Barn</p>
                ) : null}

                {booking.senior === 1 ? (
                  <p className="font-inconsolata">
                    {booking.senior} x Pensionär
                  </p>
                ) : null}
                {booking.senior > 1 ? (
                  <p className="font-inconsolata">
                    {booking.senior} x Pensionärer
                  </p>
                ) : null}

                <p>
                  Rad:{" "}
                  <span>{`${booking.rows
                    ?.map((row) => row.row)
                    .join(", ")}`}</span>
                </p>
                <p>
                  Plats:{" "}
                  <span>{`${booking.seats
                    ?.map((seat) => seat.seatNumber)
                    .join(", ")}`}</span>
                </p>
              </div>

              <div className="mb-10 text-white-100">
                <p>{`Totalt att betala: ${calcTotalPrice(
                  booking.adult,
                  booking.child,
                  booking.senior,
                )} kr`}</p>
              </div>
              {!loggedIn && (
                <BookingTicketsForm
                  inputValues={inputValues}
                  setInputValues={setInputValues}
                />
              )}
              {!loader ? (
                <button
                  onClick={handleBooking}
                  className={`m-auto mb-10 w-36 rounded bg-gold px-6 py-2 text-black`}
                >
                  Boka
                </button>
              ) : (
                <Loader />
              )}
            </>
          )}
        </div>
      )}
      {toggleConfirmation.toggle && bookingResult && (
        <ConfirmBooking
          nodeMailerError={nodeMailerError}
          bookingResult={bookingResult}
          movie={movie}
          screening={screening}
        />
      )}
    </>
  );
}
