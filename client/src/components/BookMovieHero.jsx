import { useNavigate } from "react-router-dom";
import { killersPoster, pastLivesPoster,smsPoster } from "../assets";


export default function BookMovieHero({data}){
  const navigate = useNavigate();
console.log(data)
if (!data || !Array.isArray(data) || data.length === 0) {
  // Om det inte finns någon data eller data inte är en array eller är en tom array, kan du visa ett meddelande eller returnera något annat.
  return (
    <div>
      <p className="text-white-100">Ingen data tillgänglig</p>
    </div>
  );
}
    return(
<>
{data.map((screening) =>
<div className="max-w-full p-4 flex items-center justify-between md:justify-start lg:justify-start sm:w-[35rem] md:w-[40rem] lg:w-[54rem] sm:m-auto sm:px-12">
     
      <img
        src={pastLivesPoster}
        alt="movie poster from Killers of the flower moon"
        className="w-34 h-48 rounded-lg"
      />
      <div className="text-white-100 flex flex-col lg:px-6 md:px-6 ml-4">
        <p className="text-xs md:text-base lg:text-lg">{screening.date}</p>
        <h2 className="text-base font-extra-bold md:text-base lg:text-lg">{screening.movie}</h2>
        <p className="font-inconsolata text-xs md:text-base lg:text-lg">Sifi, drama</p>
        <p className="text-xs md:text-base lg:text-lg">{}</p>
        <p className="font-inconsolata text-xs md:text-base lg:text-lg">{}</p>
      </div>
      <button className="bg-gold text-black-100 rounded-md px-4 p-1 sm:ml-auto md:px-6 md:py-2"
        onClick={() => {
          navigate("/booking/1")
          window.scrollTo(0, 0)}}
      >Boka</button>
    
    </div>
)} 
  
      
</>
)
}


    {/* <div className="flex max-w-full items-center justify-between sm:justify-start p-4 md:justify-start  lg:justify-start sm:w-[35rem] md:w-[40rem] lg:w-[54rem] sm:m-auto sm:px-12">
        <img
          src={killersPoster}
          alt="movie poster from Killers of the flower moon"
          className="w-34 h-48 rounded-lg"
        />
        <div className="flex flex-col text-white-100 md:px-6 lg:px-6 ml-4 md:text-base lg:text-lg">
          <p className="text-xs md:text-base lg:text-lg">Idag 25/9</p>
          <h2 className="font-extra-bold text-base md:text-base lg:text-lg">The Creator</h2>
          <p className="font-inconsolata text-xs md:text-base lg:text-lg">Sifi, drama</p>
          <p className="text-xs md:text-base lg:text-lg">1 tim 33min | 11 år</p>
          <p className="font-inconsolata text-xs md:text-base lg:text-lg">18:30</p>
        </div>
        <button className="bg-gold text-black-100 rounded-md px-4 p-1 sm:ml-auto md:px-6 md:py-2"
        onClick={() => {
          navigate("/booking/1")
          window.scrollTo(0, 0)}}
      >Boka</button>
      </div>
      
    

      <div className="flex max-w-full items-center justify-between p-4 md:justify-start lg:justify-start sm:w-[35rem] md:w-[40rem] lg:w-[54rem] sm:m-auto sm:px-12">
        <img
          src={smsPoster}
          alt="movie poster from Killers of the flower moon"
          className="w-34 h-48 rounded-lg"
        />
        <div className="flex flex-col text-white-100 md:px-6 lg:px-6 ml-4">
          <p className="text-xs mmd:text-base lg:text-lg">Idag 25/9</p>
          <h2 className="font-extra-bold text-base md:text-base lg:text-lg">The Creator</h2>
          <p className="font-inconsolata text-xs md:text-base lg:text-lg">Sifi, drama</p>
          <p className="text-xs md:text-base lg:text-lg">1 tim 33min | 11 år</p>
          <p className="font-inconsolata text-xs md:text-base lg:text-lg">18:30</p>
        </div>
        <button className="bg-gold text-black-100 rounded-md px-4 p-1 sm:ml-auto md:px-6 md:py-2"
            onClick={() => {
              navigate("/booking/1")
              window.scrollTo(0, 0)}}
          >Boka
        </button>
      </div> */}