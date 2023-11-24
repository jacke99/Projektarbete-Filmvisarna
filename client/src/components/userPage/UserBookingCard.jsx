import { expandMore, expandLess } from "../../assets";
import { AnimatePresence, motion } from "framer-motion";
import newDateFormat from "../../service/newDateFormat";
import PropTypes from "prop-types";
import { useState } from "react";

export default function UserBookingCard({
  booking,
  setCancelBooking,
  setToggle,
  index,
}) {
  // const [toggleExpand, setToggleExpand] = useState(false)
  const [isExpanded, setExpanded] = useState(false);

  function cancel(booking) {
    setCancelBooking(booking);
    setToggle(true);
  }

  return (
    <motion.div
      key={index}
      className={`flex justify-center rounded-lg text-white`}
    >
      <div className="mx-auto w-full max-w-[17rem] xs:mx-0 xs:max-w-[24rem]">
        <motion.div className="flex flex-col justify-center xs:flex-row xs:items-end">
          <img
            src={`/img/${booking.movie.img_poster}`}
            alt={`poster of the movie: ${booking.movie.title}`}
            className={`mx-auto w-[10rem] rounded-lg xs:mx-0`}
          />
          <div className="mt-4 flex flex-col gap-1 xs:mb-0">
            <p className="text-md ml-4 md:text-xl">{booking.movie?.title}</p>
            <p className="ml-4 text-base md:text-lg">
              {booking.status
                ? newDateFormat(booking.screening?.date)
                : booking.screening?.date}
            </p>
            <p className="ml-4 text-base md:text-lg">
              Klockan {booking.screening?.time}
            </p>
            <p className="ml-4 text-base md:text-lg">
              BokningsNr: {booking.bookingId}
            </p>
            <div
              className="mx-auto mb-2 flex w-20 cursor-pointer whitespace-nowrap underline xs:mb-0"
              onClick={() => setExpanded(!isExpanded)}
            >
              {isExpanded ? "Mindre" : "Mer info"}
              {isExpanded && (
                <img className="w-8" src={expandLess} alt="expand less icon" />
              )}
              {!isExpanded && (
                <img className="w-8" src={expandMore} alt="expand more icon" />
              )}
            </div>
          </div>
        </motion.div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className={`mx-auto mt-2 w-10/12 text-base md:w-11/12`}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{
                duration: 0.5,
              }}
            >
              <div className="flex justify-between">
                {" "}
                <p className="text-gold md:text-lg">Salong:</p>{" "}
                <p className="md:text-lg">{booking.screening?.theaterName}</p>
              </div>
              <div className="flex justify-between">
                {" "}
                <p className="text-gold md:text-lg">Rad:</p>{" "}
                <p className="md:text-lg">{`${
                  booking.rows
                    ? booking.rows?.map((row) => row.row).join(", ")
                    : booking.row
                }`}</p>
              </div>
              <div className="flex justify-between">
                {" "}
                <p className="text-gold md:text-lg">Plats:</p>{" "}
                <p className="md:text-lg">{`${booking.seats
                  ?.map((seat) => seat.seatNumber)
                  .join(", ")}`}</p>
              </div>
              <div className="flex justify-between">
                {" "}
                <p className="text-gold md:text-lg">Pris:</p>{" "}
                <p className="md:text-lg">{booking.price} kr</p>
              </div>
              <div className="flex justify-between">
                {" "}
                <p className="text-gold md:text-lg">Status:</p>{" "}
                <p className="md:text-lg">
                  {booking.status ? "Bokad" : "Inaktiv"}
                </p>
              </div>
              <div className="flex justify-center">
                {booking.status ? (
                  <button
                    disabled={!booking.status}
                    className="mt-4 rounded-lg bg-red-600 px-3 py-1"
                    onClick={() => cancel(booking)}
                  >
                    Avboka
                  </button>
                ) : (
                  ""
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

UserBookingCard.propTypes = {
  booking: PropTypes.object,
  setCancelBooking: PropTypes.func,
  setToggle: PropTypes.func,
  index: PropTypes.number,
  columnIndex: PropTypes.number,
  expandedStates: PropTypes.array,
  setExpandedStates: PropTypes.func,
  key: PropTypes.number,
};
