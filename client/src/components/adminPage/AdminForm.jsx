// import { useState } from "react";
import { styles } from "../../styles";

export default function AdminForm() {

    const authToken = sessionStorage.getItem("AuthToken");
    console.log(authToken)

//lägg till required på alla inputs och gör röd på alla inputs som inte är ifyllda
    return (
        <div className="mt-20 mx-auto w-60 " >
            <h3 className="text-lg font-medium text-white">Redigera Filmer</h3>    
            <form className=" text-black" action={`/api/movies/${authToken}`} method="post" encType="multipart/form-data">
                <input className={`${styles.inputStyle}`} type="text" name="title" placeholder="Titel..." />
                <input className={`${styles.inputStyle}`} type="text" name="desc" placeholder="Beskrivning..." />
                <input className={`${styles.inputStyle}`} type="text" name="trailer" placeholder="Trailer..." />
                <input className={`${styles.inputStyle}`} name="director" placeholder="Direktör..." />
                <input className={`${styles.inputStyle}`} type="text" name="actors" placeholder="Skådespelare..." />
                <input className={`${styles.inputStyle}`} type="text" name="length" placeholder="Längd..." />
                <input className={`${styles.inputStyle}`} type="text" name="genre" placeholder="Genre..." />
                <input className={`${styles.inputStyle}`} type="text" name="speech" placeholder="Språk..." />
                <input className={`${styles.inputStyle}`} type="text" name="subtitles" placeholder="Undertext..." />
                <input className={`${styles.inputStyle} mb-6`} type="number" name="ageRestriction" placeholder="Åldersgräns" />
        
                    
                <label htmlFor="img_poster" className="text-white" >Huvudbild</label>
                <input type="file" name="img_poster" id="files" multiple className="text-white  " />

                <label htmlFor="img-header" className="text-white" >Bakgrundsbild</label>
                <input type="file" name="img_header" id="files" multiple className="text-white " />
                      

                <button className=" mt-2 md:mt-6 md:mb-6 lg:mt-8 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto" type="submit">Skicka in</button>
            </form>

        </div>
        );
}