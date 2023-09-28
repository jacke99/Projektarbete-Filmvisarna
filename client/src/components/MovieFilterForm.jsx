import React from "react";
import {styles} from "../styles.js";

export default function MovieFilterForm(){
    return(
        <div className="max-w-md mx-auto">
  <form className="flex flex-col space-y-4 items-center my-10 sm: [flex-col] md:[flex-col] lg:[flex-row]">

    <div className="md:flex md:space-x-4">
      <div className="w-full md:w-1/2">
        <label htmlFor="ageLimit" className={`block ${styles.paddingX} text-white-100 text-sm`}>
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
        <label htmlFor="datePicker" className={`block ${styles.paddingX} text-white-100 text-sm text-center`}>
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
        
        className={`w-full border border-gray-300 rounded-md p-1.5 text-sm text-gray-400 my-2`}
      />
    </div>
<div>
    <button
      type="submit"
      className={`bg-gold text-black-100 rounded-md px-4 p-1`}
    >
      Sök
    </button>
    </div>
  </form>
</div>
    )
}