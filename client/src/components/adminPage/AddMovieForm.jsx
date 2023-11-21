import { useState } from "react";
import { styles } from "../../styles";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function AddMovieForm() {

    const [showGuideToAdminPopup, setShowGuideToAdminPopup] = useState(false)

    const adminGuides = [
        {info: "Titel = Skriv filmens titel med stor bokstav. Om svensk titel finns så ska denna skrivas.", inputName: "title", placeholder: "Titel..."},
        {info: "Handling = Beskriv filmens handling.", inputName: "description", placeholder: "Handling..."},
        {info: "Trailer = Det som skrivs in på denna rad är en del av en youtublänk. Exempevis kan en se ut såhär: https://www.youtube.com/watch?v=MQ9Zg24IsJY, i detta fall kopierar du allt efter '=', vilket blir MQ9Zg24IsJY", 
        inputName: "trailer", 
        placeholder: "Trailer..."},
        {info: "Regissör = Skriv namnet på regissör eller regissör. Vid flera, skriv exempelvis: Martin Scorsese, Quentin Tarantino.", inputName: "director", placeholder: "Regissör..."},
        {info: "Skådespelare = Skriv namnet på skådespelarna enligt liknande: Robert Downey Jr, Will Smith, Michael Douglas.", inputName: "actors", placeholder: "Skådespelare..."},
        {info: "Filmens längd = Skriv in filmens längd på detta vis: 2 tim 13 min.", inputName: "length", placeholder: "Längd..."},
        {info: "Genre = Skriv filmens genre, exempelvis Drama. Vid flera genre, skriv Drama, Action, Thriller.", inputName: "genre", placeholder: "Genre..."},
        {info: "Språk = Skriv de språk de talar i filmen. Exempelvis: Svenska.", inputName: "speech", placeholder: "Språk..."},
        {info: "Undertext = Skriv de undertexter biografen erbjuder just denna film.", inputName: "subtitles", placeholder: "Undertext..."},
        {info: "Åldersgräns = Vilken är filmens rekommenderade åldersgräns? Detta väljs i rullgardinsmenyn för denna rad (7, 11 eller 15 år)", inputName: "ageRestriction", placeholder: "Åldersgräns..."},
    ];
      
      const authToken = sessionStorage.getItem("AuthToken");
      
      return (
        <div className="mx-auto w-96">
          <h3 className="text-lg font-medium text-white ml-[37%]">Lägg till Filmer</h3>
          <form className="relative text-black" action={`/api/movies/${authToken}`} method="post" encType="multipart/form-data">
            {adminGuides?.map((input, index) => (
              <div className={`${input.inputName}-div flex`} key={index}>
                <AiOutlineInfoCircle
                  onMouseEnter={() => setShowGuideToAdminPopup(input.info)}
                  onMouseLeave={() => setShowGuideToAdminPopup(null)}
                  className="text-white text-[25px] mt-3 mr-2 cursor-pointer transition-transform transform hover:scale-[1.3]"
                />
      
                {input.inputName !== "ageRestriction" ? (
                  <input className={`${styles.inputStyle}`} type="text" name={input.inputName} placeholder={input.placeholder} />
                ) : (
                  <input className={`${styles.inputStyle} mb-6`} type="number" name={input.inputName} placeholder={input.placeholder} />
                )}
      
                {showGuideToAdminPopup === input.info && (
                  <div className="absolute right-[400px] top- w-80">
                    <div className="bg-white text-black p-5 text-center rounded-lg flex flex-col items-end border-[5px] border-gold">
                      <p>{input.info}</p>
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
      
            <button className={`ml-[30%] ${styles.buttonStyle} my-10 `} type="submit">Skicka in</button>
          </form>
        </div>
      );

    }