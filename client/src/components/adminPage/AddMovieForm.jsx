import { useState } from "react";
import { styles } from "../../styles";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function AddMovieForm() {

    const [showGuideToAdminPopup, setShowGuideToAdminPopup] = useState(false)

    const adminGuides = {
        title: "Titel = Skriv filmens titel med stor bokstav. Om svensk titel finns så ska denna skrivas.",
        description: "Handling = Beskriv filmens handling.",
        trailer: "Trailer = Det som skrivs in på denna rad är en del av en youtublänk. Exempevis kan en se ut såhär: https://www.youtube.com/watch?v=MQ9Zg24IsJY, i detta fall kopierar du allt efter '=', vilket blir MQ9Zg24IsJY",
        director: "Regissör = Skriv namnet på regissör eller regissör. Vid flera, skriv exempelvis: Martin Scorsese, Quentin Tarantino.",
        actors: "Skådespelare = Skriv namnet på skådespelarna enligt liknande: Robert Downey Jr, Will Smith, Michael Douglas.",
        length: "Filmens längd = Skriv in filmens längd på detta vis: 2 tim 13 min.",
        genre: "Genre = Skriv filmens genre, exempelvis Drama. Vid flera genre, skriv Drama, Action, Thriller.",
        speech: "Språk = Skriv de språk de talar i filmen. Exempelvis: Svenska.",
        subtitles: "Undertext = Skriv de undertexter biografen erbjuder just denna film.",
        ageRestriction: "Åldersgräns = Vilken är filmens rekommenderade åldersgräns? Detta väljs i rullgardinsmenyn för denna rad (7, 11 eller 15 år)"
      };
      
      const authToken = sessionStorage.getItem("AuthToken");
      
      return (
        <div className="mx-auto w-96">
          <h3 className="text-lg font-medium text-white ml-[37%]">Redigera Filmer</h3>
          <form className="relative text-black" action={`/api/movies/${authToken}`} method="post" encType="multipart/form-data">
            {Object.keys(adminGuides).map((inputName, index) => (
              <div className={`${inputName}-div flex`} key={index}>
                <AiOutlineInfoCircle
                  onMouseEnter={() => setShowGuideToAdminPopup(inputName)}
                  onMouseLeave={() => setShowGuideToAdminPopup(null)}
                  className="text-white text-[25px] mt-3 mr-2 cursor-pointer transition-transform transform hover:scale-[1.3]"
                />
      
                {inputName !== "ageRestriction" ? (
                  <input className={`${styles.inputStyle}`} type="text" name={inputName} placeholder={inputName} />
                ) : (
                  <input className={`${styles.inputStyle} mb-6`} type="number" name={inputName} placeholder={inputName} />
                )}
      
                {showGuideToAdminPopup === inputName && (
                  <div className="absolute right-[400px] top- w-80">
                    <div className="bg-white text-black p-5 text-center rounded-lg flex flex-col items-end border-[5px] border-gold">
                      <p>{adminGuides[inputName]}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
      
            <div className="mt-5 ml-8">
              <label htmlFor="img_poster" className="text-white">Huvudbild</label>
              <input type="file" name="img_poster" id="img_poster" multiple className="text-white mb-5" />
            </div>
      
            <div className="ml-8">
              <label htmlFor="img_header" className="text-white">Bakgrundsbild</label>
              <input type="file" name="img_header" id="img_header" multiple className="text-white" />
            </div>
      
            <button className="ml-[30%] mt-2 md:mt-6 md:mb-6 lg:mt-8 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto" type="submit">Skicka in</button>
          </form>
        </div>
      );

    }