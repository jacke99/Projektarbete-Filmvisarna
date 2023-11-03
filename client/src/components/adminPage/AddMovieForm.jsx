import { useState } from "react";
import { styles } from "../../styles";
import { AiOutlineInfoCircle, AiOutlineCloseSquare  } from "react-icons/ai";

export default function AddMovieForm() {

    const [showGuidetoAdminPopup, setShowGuideToAdminPopup] = useState(false)

    const trailerGuide = "Det som skrivs in på denna rad är en del av en youtublänk. Exempevis kan en kan se ut såhär  : https://www.youtube.com/watch?v=MQ9Zg24IsJY, i detta fall kopierar du allt efter '='. Vilket blir MQ9Zg24IsJY "

    const authToken = sessionStorage.getItem("AuthToken");
    console.log(authToken)




//lägg till required på alla inputs och gör röd på alla inputs som inte är ifyllda
    return (
        <div className="mt-32 mx-auto w-96 " >
            <h3 className="text-lg font-medium text-white">Redigera Filmer</h3>    
            <form className=" relative  text-black" action={`/api/movies/${authToken}`} method="post" encType="multipart/form-data ">
                
                <div className="title-div flex">
                     <AiOutlineInfoCircle className="text-white text-[25px] mt-3 mr-2" />
                     <input className=  {`${styles.inputStyle}`} type="text" name="title" placeholder="Titel..." />
                </div>
                
                <div className="description-div flex">
                    <AiOutlineInfoCircle className="text-white text-[25px] mt-3 mr-2" />
                    <input className={`${styles.inputStyle}`} type="text" name="desc" placeholder="Beskrivning..."  />
                </div>
                
                <div className="trailer-div flex">
                <AiOutlineInfoCircle
                    onMouseEnter={() => setShowGuideToAdminPopup(true)}
                    onMouseLeave={() => setShowGuideToAdminPopup(false)}
                    className="text-white text-[25px] mt-3 mr-2 cursor-pointer"
                />
                    <input className={`${styles.inputStyle}`} type="text" name="trailer" placeholder="Trailer..."  />

                    {/* Show trailer guide to ADMIN */}
                {showGuidetoAdminPopup && (
                    <div className="absolute right-[400px] top-8">
                        <div className=" bg-white text-black p-5 text-center rounded-lg flex flex-col items-end">
                            <div className="close_icon-div mb-4 text-[20px] ">
                            </div>
                            <p className="">{trailerGuide}</p>
                            
                        </div>
                    </div>
                    )}
                </div>

                <div className="director-div flex">
                    <AiOutlineInfoCircle className="text-white text-[25px] mt-3 mr-2" />
                     <input className={`${styles.inputStyle}`} name="director" placeholder="Direktör..." />
                </div>
               
                <div className="actors-div flex">
                    <AiOutlineInfoCircle className="text-white text-[25px] mt-3 mr-2" />
                    <input className={`${styles.inputStyle}`} type="text" name="actors" placeholder="Skådespelare..." />
                </div>

                <div className="lenght-div flex">
                     <AiOutlineInfoCircle className="text-white text-[25px] mt-3 mr-2" />
                     <input className={`${styles.inputStyle}`} type="text" name="length" placeholder="Längd..." />
                </div>
                
                <div className="genre-div flex">
                    <AiOutlineInfoCircle className="text-white text-[25px] mt-3 mr-2" />
                    <input className={`${styles.inputStyle}`} type="text" name="genre" placeholder="Genre..." />
                </div>

                <div className="sppech-div flex">
                    <AiOutlineInfoCircle className="text-white text-[25px] mt-3 mr-2" />
                    <input className={`${styles.inputStyle}`} type="text" name="speech" placeholder="Språk..." />
                </div>

                <div className="subtitles-div flex">
                    <AiOutlineInfoCircle className="text-white text-[25px] mt-3 mr-2" />
                    <input className={`${styles.inputStyle}`} type="text" name="subtitles" placeholder="Undertext..." />
                </div>
                
                <div className="ageRestriction-div flex">
                    <AiOutlineInfoCircle className="text-white text-[25px] mt-3 mr-2" />
                    <input className={`${styles.inputStyle} mb-6`} type="number" name="ageRestriction" placeholder="Åldersgräns" />
                </div>
        
                    
                <label htmlFor="img_poster" className="text-white" >Huvudbild</label>
                <input type="file" name="img_poster" id="files" multiple className="text-white mb-10" />

                <label htmlFor="img-header" className="text-white" >Bakgrundsbild</label>
                <input type="file" name="img_header" id="files" multiple className="text-white " />
                      

                <button className=" mt-2 md:mt-6 md:mb-6 lg:mt-8 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto" type="submit">Skicka in</button>
            </form>

        </div>
        );
}