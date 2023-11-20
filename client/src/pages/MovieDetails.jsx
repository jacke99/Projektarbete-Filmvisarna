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
        // console.log(data.title)
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
          <div className="m-auto flex flex-col p-8 sm:p-12 lg:pb-8">
            <div
              className={`text-shadow flex flex-col pb-8 sm:text-xl md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}
            >
              <p className={`${styles.trailerTitle}`}>{data.title}</p>
              <p className={`${styles.trailerSubTitle}`}>{data.genre}</p>
              <p className={`${styles.trailerSubTitle} bold font-inconsolata`}>
                {data.length} | från {data.ageRestriction}år
              </p>
            </div>
            <div className="movie-poster pb-8 sm:text-xl md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto">
              <img
                src={`/img/${data.img_poster}`}
                alt="movie poster"
                className="w-340 h-48 rounded-lg"
              />
            </div>
            <p className={`mb-4 text-white sm:text-xl md:w-5/6 lg:mt-14 lg:mb-10 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
              {data.description}
            </p>
            <button onClick={handleClickScroll} className="mb-4 mt-10 md:mt-10 md:mb-6 lg:mt-12 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto">
              Biljetter
            </button>
            <div className={`${styles.movieDescInfo} md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
              <span>Regi:</span>
              <span>{data.director}</span>
            </div>
            <div className={`${styles.movieDescInfo} md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
              <span>Skådespelare:</span>
              <span>{data.actors}</span>
            </div>
            <div className={`${styles.movieDescInfo} md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
              <span>Originaltitel:</span>
              <span>{data.title}</span>
            </div>
            <div className={`${styles.movieDescInfo} md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
              <span>Längd:</span>
              <span>{data.length}</span>
            </div>
            <div className={`${styles.movieDescInfo} md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
              <span>Originalspråk</span>
              <span>{data.speech}</span>
            </div>
            <div className={`${styles.movieDescInfo} md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
              <span>Åldersgräns:</span>
              <span>{data.ageRestriction}</span>
            </div>
            <div className="text-white text-[25px] sm:text-[25px] md:text-[30px] lg:text-[35px] md:mt-32 lg:mt-32 mt-20 md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto">

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