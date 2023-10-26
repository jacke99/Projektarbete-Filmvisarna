import {useStates} from "react-easier"
import PropTypes from "prop-types"

export default function TicketCounter({ screening, movie }) {
  const counters = useStates("ticketCounter");

  function increaseCounters(e) {
    const {name} = e.target;
    if(eval(counters.adult + counters.child + counters.senior) < 8) {
      counters[name]++
      counters.total++
    }
  }
  function decreaseCounters(e) {
    const {name} = e.target;
    if (counters[name] > 0) {
      counters[name]--
      counters.total--
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
      {screening && movie && <div className="flex justify-center gap-6 mt-6">
        <img className="h-44 sm:h-60 sm:mt-auto" src={`/img/${movie.img_poster}`} alt="movie poster" />
        <div className="flex flex-col justify-end">
          <p>{movie.title}</p>
          <p>{`${screening.date.slice(5)} | ${screening.time}`}</p>
          <p>{movie.genre}</p>
          <p>{`${movie.length} | ${movie.ageRestriction} år`}</p>
        </div>
      </div>}
    </div>
  );
}


TicketCounter.propTypes = {
  screening: PropTypes.object,
  movie: PropTypes.object,
}