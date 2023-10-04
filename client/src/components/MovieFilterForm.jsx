import { styles } from "../styles.js";

export default function MovieFilterForm() {
  return (
    <div className="max-w-full">
      <form className="md:flex-row my-10 flex flex-col items-center space-y-4 md:justify-center md:gap-4">
        <div className="md:flex md:space-x-4">
          <div className="w-full md:w-1/2">
            <label
              htmlFor="ageLimit"
              className={`block ${styles.paddingX} text-sm text-white-100 md:text-xl lg:text-2xl`}
            >
              Åldersgräns:
            </label>
            <select
              id="ageLimit"
              name="ageLimit"
              className={`${styles.inputStyle}`}
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
              type="date"
              id="datePicker"
              name="datePicker"
              className={`${styles.inputStyle}`}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:gap-4 md:justify-center">
          <input
            placeholder="Sök filmtitel..."
            type="text"
            id="filmTitle"
            name="filmTitle"
            className={`${styles.inputStyle} md:mt-5 lg:mt-6`}
          />
          <button
            type="submit"
            className={`rounded-md bg-gold p-1 px-4 text-black-100 w-16 self-center md:mt-3 lg:mt-4`}
          >
            Sök
          </button>
        </div>
       
         
        
      </form>
    </div>
  );
}
