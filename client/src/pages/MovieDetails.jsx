import ScreeningCard from "../components/ScreeningCard.jsx";
import { styles } from "../styles.js";
import { useParams, Link } from 'react-router-dom';
import useFetch from "../hooks/useFetch.js";
import { useEffect, useState } from "react";
import { performRequest } from "../service/fetchService.js";
import MovieTrailer from "../components/moviesPage/MovieTrailer.jsx";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState("");
  //eslint-disable-next-line
  const { data, isPending, error } = useFetch(`/api/movies/${id}`);

  useEffect(() => {
    (async () => {
      if (data) {
        const resp = await performRequest(`/api/filteredscreenings?movie=${data.title}`, "GET");
        setMovie(resp);
      }
    })();
  }, [data, id]);

  function handleClickScroll() {
    const element = document.getElementById("scrollTo");

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
  return (
    <>
      {data && (
        <div className=" bg-primary">
          <div className=" md:m-auto ">
            <MovieTrailer movieDetails={data} /> {data.trailer}
          </div>
          <div className="m-auto flex flex-col pl-12 pr-12 sm:pr-12 sm:pl-12 lg:pb-8">
            <p className={`mb-4 text-white sm:text-xl md:w-5/6 lg:mt-14 lg:mb-10 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
              {data.description}
            </p>
            <button onClick={handleClickScroll} className={`${styles.buttonStyle} mx-auto sm:px-4 sm:py-2`}>
              Biljetter
            </button>
            <div className="movie-poster pb-8 sm:text-xl md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto">
              <img
                src={`/img/${data.img_poster}`}
                alt="movie poster"
                className="w-340 h-48 rounded-lg"
              />
            </div>
            <div className={`${styles.movieDescInfo} md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
              <span className="font-bold">Regi:</span>
              <span>{data.director}</span>
            </div>
            <div className={`${styles.movieDescInfo} md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
              <span className="font-bold">Skådespelare:</span>
              <span>{data.actors}</span>
            </div>
            <div className={`${styles.movieDescInfo} md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
              <span className="font-bold">Originaltitel:</span>
              <span>{data.title}</span>
            </div>
            <div className={`${styles.movieDescInfo} md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
              <span className="font-bold">Längd:</span>
              <span>{data.length}</span>
            </div>
            <div className={`${styles.movieDescInfo} md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
              <span className="font-bold">Originalspråk:</span>
              <span>{data.speech}</span>
            </div>
            <div className={`${styles.movieDescInfo} md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
              <span className="font-bold">Åldersgräns:</span>
              <span> {data.ageRestriction === 0 ? "Ingen åldersgräns" : data.ageRestriction + " år"}</span>
            </div>
            {movie.length > 0 ? (
              <div className="md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto" >
                <h2 className="text-white text-[25px] text-center m-auto mb-16 lg:mb-20" id="scrollTo">Aktuella visningar</h2>
                <ScreeningCard query={`movie=${data.title}`} />

              </div>
            ) : (
              <div className="p-4 text-center">
                <p className="text-white-100" id="scrollTo">Tyvärr finns inga visningar tillgängliga just nu för {`${data.title}`}</p>
                <Link to={"/bokning"} className={`text-4-xl underline text-white-100`}>
                  Andra filmer som visas
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}