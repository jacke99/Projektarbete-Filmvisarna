// import { useState } from "react";
import { styles } from "../../styles";

export default function AddScreeningForm(){
    const authToken = sessionStorage.getItem("AuthToken");
    console.log(authToken)

    return(
        <div className="mt-32 mx-auto w-60 " >
        <h3 className="text-lg font-medium text-white">Lägg till ny filmvisning</h3>    
        <form className=" text-black" action={`/api/screenings/${authToken}`} method="post" encType="multipart/form-data">
            <input className={`${styles.inputStyle}`} type="date" name="date" placeholder="Datum" />
            <input className={`${styles.inputStyle}`} type="time" name="time" placeholder="Tid" />
            <input className={`${styles.inputStyle}`}   min="1" max="2" type="number" name="theater" placeholder="Salong" />
            <input className={`${styles.inputStyle}`} name="" placeholder="Filmens id" />
            <input className={`${styles.inputStyle}`} name="salongsnamn" placeholder="Salongsnamn" />

                  

            <button className=" mt-2 md:mt-6 md:mb-6 lg:mt-8 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto" type="submit">Skicka in</button>
        </form>
        </div>
    )
}