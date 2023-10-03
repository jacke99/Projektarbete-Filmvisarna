import { styles } from "../styles.js";

export default function MovieFilterForm() {
  return (
    <div className="max-w-full">
      <form className="sm: [flex-col] md:[flex-col] lg:[flex-row] my-10 flex flex-col items-center space-y-4">
        <div className="md:flex md:space-x-4">
          <div className="w-full md:w-1/2">
            <label
              htmlFor="ageLimit"
              className={`block ${styles.paddingX} text-sm text-white-100`}
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
              className={`block ${styles.paddingX} text-center text-sm text-white-100`}
            >
              Datum:
            </label>
            <input
              type="date"
              id="datePicker"
              name="datePicker"
              size="20"
              className={`${styles.inputStyle}`}
            />
          </div>
        </div>

        <div>
          <input
            placeholder="Sök filmtitel..."
            type="text"
            id="filmTitle"
            name="filmTitle"
            className={`my-2 w-full rounded-md border border-gray-300 p-1.5 text-sm text-gray-400`}
          />
        </div>
        <div>
          <button
            type="submit"
            className={`rounded-md bg-gold p-1 px-4 text-black-100`}
          >
            Sök
          </button>
        </div>
      </form>
    </div>
  );
}
