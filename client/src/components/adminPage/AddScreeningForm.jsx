// import { useState } from "react";
/* eslint-disable */
import { styles } from "../../styles";


export default function AddScreeningForm( { handleSubmit, setTheater,setDate, setTime, setTitle } ){
   

    return(
        <div className="mt-32 mx-auto w-60 " >
        <h3 className="text-lg font-medium text-white mb-2">Lägg till ny filmvisning</h3>    
        <form onSubmit= {handleSubmit} className=" text-black" method="POST">
            <label className="text-white-100" htmlFor="date">Datum:</label>
            <input onChange={(e) => setDate(e.target.value)} className={`${styles.inputStyle}`} type="date" name="date" placeholder="Datum" />
            <label className="text-white-100" htmlFor="time">Tid:</label>
            <input onChange={(e) => setTime(e.target.value)} className={`${styles.inputStyle}`} type="time" name="time" placeholder="Tid" />
            <label className="text-white-100" htmlFor="theater">Salong:</label>
            <input
            className={`${styles.inputStyle}`}
            type="number"
            onChange={(e) => setTheater(e.target.value)}
            min="1"
            max="2"/>

            <label className="text-white-100" htmlFor="title">Filmtitel:</label>
            <input onChange={(e) => setTitle(e.target.value)} className={`${styles.inputStyle}`} name="title" placeholder="Filmens titel" />
            <button className=" mt-2 md:mt-6 md:mb-6 lg:mt-8 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto" type="submit">Skicka in</button>
        </form>
        </div>
    )
}