/* eslint-disable */
import { refresh } from "../../assets/index.js";
import DatePicker from "./DatePicker.jsx";
import { styles } from "../../styles.js";

export default function MovieFilterForm({ inputValues, setInputValues }) {
  
  return (
    <div className={` ${styles.wrapper} ${styles.paddingY} w-2/3 max-w-full lg:flex lg:gap-10 lg:items-end`}>

      <form className=" md:flex-row flex flex-col items-stretch  md:w-full md:items-end md:justify-center gap-3 lg:gap-10">
    
          <div className="flex flex-col lg:grow">
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
              className="border border-gray-300 rounded-md p-1.5 text-sm text-gray-400 my-2 h-8 box-border lg:text-lg lg:h-12 lg:p-3"
              onChange={(e)=> setInputValues({...inputValues, age: e.target.value})}
            // {...s.bind("ageLimit")}
            >
              <option value="0">Alla filmer</option>
              <option value="7">0-7 år</option>
              <option value="11">0-11 år</option>
              <option value="15">0-15 år</option>
            </select>
          </div>

          <div className="flex flex-col lg:grow">
            <DatePicker setInputValues={setInputValues} inputValues={inputValues} />
          </div>

      <div className="flex flex-col lg:grow">
          <label className={`text-sm text-white-100 md:text-xl lg:text-2xl`}>
              Sök:
          </label>
          <input
            value={inputValues.movie}
            placeholder="Sök filmtitel..."
            type="text"
            id="movie"
            name="movie"
            className={`lg:grow border-gray-300 rounded-md p-1.5 text-sm text-gray-400 my-2 h-8 lg:h-12 lg:text-lg lg:p-3`}
            onChange={(e)=> setInputValues({...inputValues, movie: e.target.value})}
          // {...s.bind("filmTitle")}
          />
      </div>
    </form>
      <div onClick={()=> setInputValues({age:"", date:"", movie:""})} className="lg:grow-0 lg:mb-2 flex justify-center md:flex-row items-center md:pb-1">
        <p className="text-white underline sm:text-lg lg:text-xl">Rensa</p>
        <img className="text-white w-4 h-4 md:w-5 md:h-5 object-contain cursor-pointer mr-2 lg:h-7"
        src={refresh} alt="rensa filtrering" />
       
      </div>
   
    </div>
  );
}
