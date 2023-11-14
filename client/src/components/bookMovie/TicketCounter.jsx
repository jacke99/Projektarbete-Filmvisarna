/* eslint-disable */
import {useStates} from "react-easier"
import PropTypes from "prop-types"
import newDateFormate from "../../service/newDateFormate";

export default function TicketCounter({ screening, movie, seats, setSeats }) {
  const counters = useStates("ticketCounter");
  const s = useStates("toggleSeparateSeats")
  function increaseCounters(e) {
    const {name} = e.target;
    if(eval(counters.adult + counters.child + counters.senior) < 6) {
      counters[name]++
      counters.total++
      const array = [...seats]
      
      if(array.length > 0 && !s.toggle) {
        
        if(array.length % 2 == 0 && seats[seats.length - 1].seat + 1 <= screening.seats[seats[0].row - 1].length  && !screening.seats[seats[0].row - 1][seats[seats.length - 1].seat].seat) {
          array.push({row: seats[seats.length - 1].row, seat: seats[seats.length - 1].seat + 1, seatNumber: screening.seats[seats[0].row - 1][seats[seats.length - 1].seat].seatNumber, booked: screening.seats[seats[0].row - 1][seats[seats.length - 1].seat].seat})
         return setSeats(array)
          
        } else if(seats[0].seat - 1 !== 0 && !screening.seats[seats[0].row - 1][seats[0].seat - 2].seat) {
          array.unshift({row: seats[seats.length - 1].row, seat: seats[0].seat - 1, seatNumber: screening.seats[seats[0].row - 1][seats[0].seat - 2].seatNumber, booked: screening.seats[seats[0].row - 1][seats[0].seat - 1].seat})
         return setSeats(array)
        } else if (!screening.seats[seats[0].row - 1][seats[seats.length - 1].seat].seat) {
          array.push({row: seats[seats.length - 1].row, seat: seats[seats.length - 1].seat + 1, seatNumber: screening.seats[seats[0].row - 1][seats[seats.length - 1].seat].seatNumber, booked: screening.seats[seats[0].row - 1][seats[seats.length - 1].seat].seat})
         return setSeats(array)
          
        }
      }
      setSeats(array)
    }
  }
  function decreaseCounters(e) {
    const {name} = e.target;
    if (counters[name] > 0) {
      counters[name]--
      counters.total--
      const array = [...seats]
      if(array.length % 2 == 0 && !s.toggle) {
        array.pop()
      } else {
        array.shift()
      }
      setSeats(array)
    }
  }
  return (
    <div className="flex flex-col text-center text-xl text-white sm:flex-row justify-evenly sm:mt-40 sm:text-2xl p-8 lg:w-[80%]">
      <div className="sm:text-3xl lg:w-2/5">
        <h2 className="mb-6 text-3xl sm:text-3xl lg:text-left lg:text-[2.5rem]">Välj antal biljetter</h2>
        <div className="lg:flex lg:items-center lg:justify-between">
          <p className="sm:text-2xl">Vuxen</p>
          <div className=" flex items-center justify-center">
            <button className="text-4xl sm:text-5xl" name="adult" onClick={(e) => decreaseCounters(e)}>
              -
            </button>
            <p className="mx-3 text-2xl sm:text-3xl">{counters.adult}</p>
            <button className="text-3xl sm:text-4xl" name="adult" onClick={(e) => increaseCounters(e)}>
              +
            </button>
          </div>
        </div>
        <div className="lg:flex lg:items-center lg:justify-between">
          <p className="sm:text-2xl">Barn</p>
          <div className="flex items-center justify-center">
            <button className="text-4xl sm:text-5xl" name="child" onClick={(e) => decreaseCounters(e)}>
              -
            </button>
            <p className="mx-3 text-2xl sm:text-3xl">{counters.child}</p>
            <button className="text-3xl sm:text-4xl" name="child" onClick={(e) => increaseCounters(e)}>
              +
            </button>
          </div>
        </div>
        <div className="lg:flex lg:items-center lg:justify-between">
          <p className="sm:text-2xl">Pensionär</p>
          <div className="flex items-center justify-center">
            <button className="text-4xl sm:text-5xl" name="senior" onClick={(e) => decreaseCounters(e)}>
              -
            </button>
            <p className="mx-3 text-2xl sm:text-3xl">{counters.senior}</p>
            <button className="text-3xl sm:text-4xl" name="senior" onClick={(e) => increaseCounters(e)}>
              +
            </button>
          </div>
        </div>
      </div>
      {screening && movie && <div className="flex gap-6 mt-6">
        <img className="h-44 sm:h-60 sm:mt-auto" src={`/img/${movie.img_poster}`} alt="movie poster" />
        <div className="flex flex-col justify-end text-start text-base">
          <p className="text-xl">{movie.title}</p>
          <p>{`${newDateFormate(screening.date).replaceAll("/", "-")} | ${screening.time}`}</p>
          <p>{screening.theaterName}</p>
          <p>{movie.genre}</p>
          <p>{movie.length} </p>
          <p>{movie.ageRestriction === 0 ?  " Ingen åldersgräns" :  ` ${movie.ageRestriction} år`}</p>
          
        </div>
      </div>}
    </div>
  );
}


TicketCounter.propTypes = {
  screening: PropTypes.object,
  movie: PropTypes.object,
}