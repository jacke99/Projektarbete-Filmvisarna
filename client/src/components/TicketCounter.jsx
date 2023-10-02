import { theCreatorPoster } from "../assets";
import { useStates } from "react-easier";

export default function TicketCounter() {
  const counters = useStates("ticketCounter");
  return (
    <div className="mt-20 flex flex-col text-center text-xl text-white">
      <div>
        <h2 className="mb-6 text-3xl">Välj antal biljetter</h2>
        <div className="flex flex-col">
          <p className="text-">Vuxen</p>
          <div className=" flex items-center justify-center">
            <button className="text-4xl" onClick={() => counters.adult--}>
              -
            </button>
            <p className="mx-3 text-2xl">{counters.adult}</p>
            <button className="text-3xl" onClick={() => counters.adult++}>
              +
            </button>
          </div>
        </div>
        <div>
          <p>Barn</p>
          <div className="flex items-center justify-center">
            <button className="text-4xl" onClick={() => counters.child--}>
              -
            </button>
            <p className="mx-3 text-2xl">{counters.child}</p>
            <button className="text-3xl" onClick={() => counters.child++}>
              +
            </button>
          </div>
        </div>
        <div>
          <p>Pensionär</p>
          <div className="flex items-center justify-center">
            <button className="text-4xl" onClick={() => counters.senior--}>
              -
            </button>
            <p className="mx-3 text-2xl">{counters.senior}</p>
            <button className="text-3xl" onClick={() => counters.senior++}>
              +
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-6">
        <img className="w-44" src={theCreatorPoster} alt="movie poster" />
        <div>
          <p>The Creator</p>
          <p>26/9 18:00</p>
          <p>Sifi Drama</p>
          <p>1h 33min | 11 år</p>
        </div>
      </div>
    </div>
  );
}
