/* eslint-disable */
import { useNavigate, Link } from "react-router-dom";
import { useAutoKeys } from 'react-easier';
import { styles } from "../styles";
import useFetch from "../hooks/useFetch";


export default function ScreeningCard({  query, setInputValues}) {
  const navigate = useNavigate();
  useAutoKeys();

  const { data, isPending, error } = useFetch(`/api/filteredscreenings${query?"?":""}${query}`);


  function resetSearch() {
    setInputValues({
      age: "",
      date:"",
      movie:"",
    })
    // navigate("/booking")
  }
  if(data && data.err || error) {
    return (
      <div className="flex flex-col">
        <div className="text-white text-center sm:text-xl md:text-2xl">Kunde inte hitta något på din sökning</div>
        <button className={`${styles.buttonStyle}m-auto mt-6`} onClick={resetSearch}>Se alla visningar</button>
      </div>
    )
  }
  return (
    <>
      {isPending && 
      <div className="pending">
          Laddar
          <span></span>
          <span></span>
          <span></span>
        </div>}

      

      {data && !data.err && data?.map((screening) =>
        <div className="max-w-full p-4 flex items-center justify-between md:justify-start lg:justify-start sm:w-[35rem] md:w-[40rem] lg:w-[54rem] sm:m-auto sm:px-12">
          
          <img
            src={`/img/${screening.movie.img_poster}`}
            alt={`poster from the movie: ${screening.movie.title}`}
            className="w-34 h-48 rounded-lg"
          />
          <div className="text-white-100 flex flex-col lg:px-6 md:px-6 ml-4">
            <p className="text-xs md:text-base lg:text-lg">{`${screening.date} | ${screening.time}`}</p>
            <h2 className="text-base font-extra-bold md:text-base lg:text-lg">{screening.movie.title}</h2>
            <p className="font-inconsolata text-xs md:text-base lg:text-lg">{screening.movie.genre}</p>
            <p className="font-inconsolata text-xs md:text-base lg:text-lg">{screening.theaterName}</p>
            <p className="text-xs md:text-base lg:text-lg">{screening.movie.length}</p>
            <p className="text-xs md:text-base lg:text-lg">{`${screening.movie.ageRestriction === 0 ? "Ingen åldersgräns" : screening.movie.ageRestriction + " år"}`}</p>
            
          </div>
          <button className="bg-gold text-black-100 rounded-md px-4 p-1 sm:ml-auto md:px-6 md:py-2"
            onClick={() => {
              navigate(`/booking/${screening._id}`)
              window.scrollTo(0, 0)
            }}
          >Boka</button>

        </div>
      )}
    </>
  )
}