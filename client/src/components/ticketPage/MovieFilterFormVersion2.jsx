/* eslint-disable */
import { styles } from "../../styles.js";
import { useStates } from "react-easier"

export default function MovieFilterFormVersion2({ data, inputValues, setInputValues }) {
  
  const s = useStates('globalState');
  return (
    <div className={"max-w-full"}>
      <form className="md:flex-row my-10 flex flex-col items-center space-y-4 md:justify-center md:gap-4">
        <div className="md:flex md:space-x-4">
          <div className="w-full md:w-1/2">
            <label
              // htmlFor="ageLimit"
              className={`block ${styles.paddingX} text-sm text-white-100 md:text-xl lg:text-2xl`}
            >
              Åldersgräns:
            </label>
            <select
              value={inputValues.age}
              id="age"
              name="age"
              className={`${styles.inputStyle}`}
              onChange={(e)=> setInputValues({...inputValues, age: e.target.value})}
            // {...s.bind("ageLimit")}
            >
              <option value="0">Alla filmer</option>
              <option value="7">0-7 år</option>
              <option value="11">0-11 år</option>
              <option value="15">0-15 år</option>
            </select>
          </div>

          <div className="w-full md:w-1/2">
            <label
              // htmlFor="datePicker"
              className={`block ${styles.paddingX} text-center text-sm text-white-100 md:text-xl lg:text-2xl`}

            >
              Datum:
            </label>
            <input
              value={inputValues.date}
              type="date"
              id="date"
              name="date"
              className={`${styles.inputStyle}`}
              onChange={(e)=> setInputValues({...inputValues, date: e.target.value})}
            // {...s.bind("date")}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:gap-4 md:justify-center">
          <input
            value={inputValues.movie}
            placeholder="Sök filmtitel..."
            type="text"
            id="movie"
            name="movie"
            className={`${styles.inputStyle} md:mt-5 lg:mt-6`}
            onChange={(e)=> setInputValues({...inputValues, movie: e.target.value})}
          // {...s.bind("filmTitle")}
          />
              
        </div>
        <div className="">
        <button onClick={()=> setInputValues({age:"", date:"", movie:""})} className={`${styles.buttonStyle} `}>Rensa filtrering</button>
        </div>
      </form>
    </div>
  );
}
