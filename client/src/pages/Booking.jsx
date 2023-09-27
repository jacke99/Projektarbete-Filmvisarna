import React from "react";
import { killersImage } from "../assets";
import {styles} from "../styles.js"

export default function Booking() {


  return(
  <div className="bg-primary font-inconsolata">
    <div>
      <img
        src={killersImage} // Ersätt med den faktiska bildens URL
        alt="Beskrivning av bilden"
        style={{ width: '100%', maxHeight: 'auto' }}
      />
 </div>

 <div className="max-w-md mx-auto">
  <form className="flex flex-col space-y-4 items-center my-10">
    <div>
      <label htmlFor="ageLimit" className={`block ${styles.paddingX} text-white-100 text-sm`}>
        Åldersgräns:
      </label>
      <select
        id="ageLimit"
        name="ageLimit"
        className={`w-full md:w-1/2 border border-gray-300 rounded-md p-2 text-sm text-gray-400 my-2`}
      >
        <option value="0">Alla åldrar</option>
        <option value="12">12 år</option>
        <option value="15">15 år</option>
        <option value="18">18 år</option>
      </select>
    </div>

    <div>
      <label htmlFor="datePicker" className={`block ${styles.paddingX} text-white-100 text-sm text-center`}>
        Datum:
      </label>
      <input
        type="date"
        id="datePicker"
        name="datePicker"
        className={`w-full md:w-1/2 border border-gray-300 rounded-md p-2 text-sm text-gray-400 my-2`}
      />
    </div>

    <div>
      <input
        placeholder="Sök filmtitel..."
        type="text"
        id="filmTitle"
        name="filmTitle"
        className={`w-full md:w-1/2 border border-gray-300 rounded-md p-2 text-sm text-gray-400 my-2`}
      />
    </div>

    <button
      type="submit"
      className={`bg-gold text-black-100 rounded-md px-4 py-2`}
    >
      Sök
    </button>
  </form>
</div>

<div>

</div>






  </div>
  )

}
