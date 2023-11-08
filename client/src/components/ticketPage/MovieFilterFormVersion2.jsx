/* eslint-disable */
import { styles } from "../../styles.js";
import { useStates } from "react-easier"
import { refresh } from "../../assets/index.js";
import { close } from "../../assets/index.js";

export default function MovieFilterFormVersion2({ data, inputValues, setInputValues }) {
  
  const s = useStates('globalState');
  return (
    <div className={"max-w-full lg:my-20"}>

      <form className="md:flex-row my-10 flex flex-col items-stretch m-auto w-1/2 md:w-full md:items-end md:justify-center gap-3">
    
          <div className="flex flex-col">
            <label
              // htmlFor="ageLimit"
              className={`text-sm text-white-100 md:text-xl lg:text-2xl`}
            >
              Åldersgräns:
            </label>
            <select
              value={inputValues.age}
              id="age"
              name="age"
              className="border border-gray-300 rounded-md p-1.5 text-sm text-gray-400 my-2 h-8"
              onChange={(e)=> setInputValues({...inputValues, age: e.target.value})}
            // {...s.bind("ageLimit")}
            >
              <option value="0">Alla filmer</option>
              <option value="7">0-7 år</option>
              <option value="11">0-11 år</option>
              <option value="15">0-15 år</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label
              // htmlFor="datePicker"
              className={`text-sm text-white-100 md:text-xl lg:text-2xl`}

            >
              Datum:
            </label>
            <input
              value={inputValues.date}
              type="date"
              id="date"
              name="date"
              className={`border border-gray-300 rounded-md p-1.5 text-sm text-gray-400 my-2 h-8`}
              onChange={(e)=> setInputValues({...inputValues, date: e.target.value})}
            // {...s.bind("date")}
            />
          </div>

        
          <input
            value={inputValues.movie}
            placeholder="Sök filmtitel..."
            type="text"
            id="movie"
            name="movie"
            className={` border-gray-300 rounded-md p-1.5 text-sm text-gray-400 my-2 h-8 `}
            onChange={(e)=> setInputValues({...inputValues, movie: e.target.value})}
          // {...s.bind("filmTitle")}
          />
              
        
        <div onClick={()=> setInputValues({age:"", date:"", movie:""})} className="flex justify-center md:flex-row items-center md:pb-1">
        <p className="text-white underline sm:text-lg">Rensa</p>
        <img className="text-white w-4 h-4 md:w-5 md:h-5 object-contain cursor-pointer mr-2"
        src={refresh} alt="rensa filtrering" />
       
        </div>
       

      </form>
    </div>
  );
}
