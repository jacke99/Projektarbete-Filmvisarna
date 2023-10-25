// import { useState } from "react";


export default function AdminForm() {
    return (
        <div className="min-h-screen">
            <h3 className="text-lg font-medium text-white">Redigera Filmer</h3>    
            <div className="max-w-xl">
            <form className="flex flex-col " action="/api/movies" method="post" encType="multipart/form-data">
                <input className="border-2 border-black" type="text" name="title" placeholder="Titel..." />
                <input className="border-2 border-black" type="text" name="desc" placeholder="Beskrivning..." />
                <input className="border-2 border-black" type="text" name="trailer" placeholder="Trailer..." />
                <input className="border-2 border-black" type="text" name="director" placeholder="Direktör..." />
                <input className="border-2 border-black" type="text" name="actors" placeholder="Skådespelare..." />
                <input className="border-2 border-black" type="text" name="length" placeholder="Längd..." />
                <input className="border-2 border-black" type="text" name="genre" placeholder="Genre..." />
                <input className="border-2 border-black" type="text" name="speech" placeholder="Språk..." />
                <input className="border-2 border-black" type="text" name="subtitles" placeholder="Undertext..." />
                <input className="border-2 border-black mb-6" type="number" name="ageRestriction" placeholder="Åldersgräns" />
                    
                <label htmlFor="img_poster" className="text-white" >Huvudbild</label>
                <input type="file" name="img_poster" id="files" multiple className="text-white" />

                <label htmlFor="img-header" className="text-white" >Bakgrundsbild</label>
                <input type="file" name="img_header" id="files" multiple className="text-white" />
                      

                <button className=" mt-2 md:mt-6 md:mb-6 lg:mt-8 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto" type="submit">Skicka in</button>
            </form>
            </div>

        </div>
        );
}