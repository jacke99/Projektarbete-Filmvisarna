import { useNavigate, Link } from "react-router-dom";
import { killersPoster, pastLivesPoster,smsPoster } from "../assets";
import {useAutoKeys} from 'react-easier';
import { styles } from "../styles";

export default function BookMovieHero({data, handleSubmit}){
  const navigate = useNavigate();
  useAutoKeys(); 
console.log(data)
if (!data || !Array.isArray(data) || data.length === 0) {
  // Om det inte finns någon data eller data inte är en array
  return (
    <div className="p-4 text-white-100 lg:text-4xl max-w-full h-screen flex flex-col items-center">
      <h1 className="py-6">Ingen filmvisning matchade din sökning, prova igen!</h1>
     <button className={`${styles.buttonStyle}`} onClick={handleSubmit}>se alla filmer</button>
    </div>
  );
}
    return(
<>
{data.map((screening) =>
<div className="max-w-full p-4 flex items-center justify-between md:justify-start lg:justify-start sm:w-[35rem] md:w-[40rem] lg:w-[54rem] sm:m-auto sm:px-12">
     
      <img
        src={`/img/${screening.movie.img_poster}`}
        alt={`poster from the movie: ${screening.movie.title}`}
        className="w-34 h-48 rounded-lg"
      />
      <div className="text-white-100 flex flex-col lg:px-6 md:px-6 ml-4">
        <p className="text-xs md:text-base lg:text-lg">{screening.date}</p>
        <h2 className="text-base font-extra-bold md:text-base lg:text-lg">{screening.movie.title}</h2>
        <p className="font-inconsolata text-xs md:text-base lg:text-lg">{screening.movie.genre}</p>
        <p className="text-xs md:text-base lg:text-lg">{screening.movie.length} | {screening.movie.ageRestriction}år</p>
        <p className="font-inconsolata text-xs md:text-base lg:text-lg">{screening.time}</p>
      </div>
      <button className="bg-gold text-black-100 rounded-md px-4 p-1 sm:ml-auto md:px-6 md:py-2"
        onClick={() => {
          navigate(`/booking/${screening._id}`)
          window.scrollTo(0, 0)}}
      >Boka</button>
    
    </div>
)}      
</>
)
}