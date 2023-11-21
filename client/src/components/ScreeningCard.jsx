/* eslint-disable */
import { useNavigate, Link } from "react-router-dom";
import { useAutoKeys } from 'react-easier';
import { styles } from "../styles";
import useFetch from "../hooks/useFetch";
import newDateFormat from "../service/newDateFormat";

export default function ScreeningCard({ query, setInputValues }) {
  const navigate = useNavigate();
  useAutoKeys();

  const { data, isPending, error } = useFetch(`/api/filteredscreenings${query ? "?" : ""}${query}`);

  function resetSearch() {
    setInputValues({
      age: "",
      date: "",
      movie: "",
    })

  }
  if (data && data.err || error) {
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
        <>
          <div className="max-w-full p-4 flex justify-center sm:justify-between items-center sm:w-[35rem] md:w-[40rem] lg:w-[54rem] sm:m-auto sm:px-0">
            <div className="flex">
              <img
                src={`/img/${screening.movie.img_poster}`}
                alt={`poster from the movie: ${screening.movie.title}`}
                className="w-34 h-48 rounded-lg" />

              <div className="text-white-100 flex flex-col justify-center gap-3 ml-4 md:ml-6">
                <div className="">
                  <p className="text-xs md:text-base lg:text-lg">{`${newDateFormat(screening.date)} | ${screening.time}`}</p>
                  <h2 className="text-base font-extra-bold md:text-base lg:text-lg">{screening.movie.title}</h2>
                  <p className="font-inconsolata text-xs md:text-base lg:text-lg">{screening.movie.genre}</p>
                  <p className="font-inconsolata text-xs md:text-base lg:text-lg">{screening.theaterName}</p>
                  <p className="text-xs md:text-base lg:text-lg">{screening.movie.length}</p>
                  <p className="text-xs md:text-base lg:text-lg">{`${screening.movie.ageRestriction === 0 ? "Ingen åldersgräns" : screening.movie.ageRestriction + " år"}`}</p>
                </div>

                <button className={`${styles.buttonStyle} sm:hidden max-w-fit`}
                  onClick={() => {
                    navigate(`/bokning/${screening._id}`)
                    window.scrollTo(0, 0)
                  }}>Boka
                </button>
              </div>
            </div>

            <button className={`${styles.buttonStyle} hidden sm:block`}
              onClick={() => {
                navigate(`/bokning/${screening._id}`)
                window.scrollTo(0, 0)
              }}>Boka
            </button>
          </div>

        </>

      )}
    </>
  )
}