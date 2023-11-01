/* eslint-disable */
import { styles } from "../styles.js";
import { useStates } from "react-easier"

export default function MovieFilterForm({ data, handleSubmit, setAge, age, setDate, date, setMovie, movie }) {
  
  const s = useStates('globalState');
  return (
    <div className={data.err ? `max-w-full mt-24` : "max-w-full"}>
      <form onSubmit={handleSubmit} className="md:flex-row my-10 flex flex-col items-center space-y-4 md:justify-center md:gap-4">
        <div className="md:flex md:space-x-4">
          <div className="w-full md:w-1/2">
            <label
              htmlFor="ageLimit"
              className={`block ${styles.paddingX} text-sm text-white-100 md:text-xl lg:text-2xl`}
            >
              Åldersgräns:
            </label>
            <select
              value={age}
              id="ageLimit"
              name="ageLimit"
              className={`${styles.inputStyle}`}
              onChange={(e) => setAge(e.target.value)}
            // {...s.bind("ageLimit")}
            >
              <option value="0">Alla åldrar</option>
              <option value="12">12 år</option>
              <option value="15">15 år</option>
              <option value="18">18 år</option>
            </select>
          </div>

          <div className="w-full md:w-1/2">
            <label
              htmlFor="datePicker"
              className={`block ${styles.paddingX} text-center text-sm text-white-100 md:text-xl lg:text-2xl`}

            >
              Datum:
            </label>
            <input
              value={date}
              type="date"
              id="datePicker"
              name="datePicker"
              className={`${styles.inputStyle}`}
              onChange={(e) => setDate(e.target.value)}
            // {...s.bind("date")}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:gap-4 md:justify-center">
          <input
            value={movie}
            placeholder="Sök filmtitel..."
            type="text"
            id="filmTitle"
            name="filmTitle"
            className={`${styles.inputStyle} md:mt-5 lg:mt-6`}
            onChange={(e) => setMovie(e.target.value)}
          // {...s.bind("filmTitle")}
          />
          <button
            type="submit"
            className={`rounded-md bg-gold p-1 px-4 text-black-100 w-16 self-center md:mt-3 lg:mt-4`}
          >Sök
          </button>
        </div>
      </form>
    </div>
  );
}
