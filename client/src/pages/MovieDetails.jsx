import ScreeningCard from "../components/ScreeningCard.jsx";
import { styles } from "../styles.js";
import { useParams, Link } from "react-router-dom";
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
        const resp = await performRequest(
          `/api/filteredscreenings?movie=${data.title}`,
          "GET",
        );
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
          <div className="m-auto flex flex-col lg:pb-8">
            <p
              className={`mb-4 px-10 text-white sm:text-xl md:m-auto md:w-5/6 lg:mb-10 lg:mt-14 lg:w-2/3 xl:w-3/5 2xl:w-3/6`}
            >
              {data.description}
            </p>
            <button
              onClick={handleClickScroll}
              className={`${styles.buttonStyle} mx-auto sm:px-4 sm:py-2 md:mt-8`}
            >
              Biljetter
            </button>
            <div className="mx-auto mt-10 flex justify-between px-10 md:w-5/6 md:items-end lg:mb-10 lg:mt-14 lg:w-2/3 xl:w-3/5 2xl:w-3/6">
              <div className=" md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6">
                <div className={`${styles.movieDescInfo}`}>
                  <span className="font-bold">Regi:</span>
                  <span>{data.director}</span>
                </div>
                <div className={`${styles.movieDescInfo} `}>
                  <span className="font-bold">Skådespelare:</span>
                  <span>{data.actors}</span>
                </div>
                <div className={`${styles.movieDescInfo} `}>
                  <span className="font-bold">Originaltitel:</span>
                  <span>{data.title}</span>
                </div>
                <div className={`${styles.movieDescInfo} `}>
                  <span className="font-bold">Längd:</span>
                  <span>{data.length}</span>
                </div>
                <div className={`${styles.movieDescInfo} `}>
                  <span className="font-bold">Originalspråk:</span>
                  <span>{data.speech}</span>
                </div>
                <div className={`${styles.movieDescInfo} `}>
                  <span className="font-bold">Åldersgräns:</span>
                  <span>
                    {" "}
                    {data.ageRestriction === 0
                      ? "Ingen åldersgräns"
                      : data.ageRestriction + " år"}
                  </span>
                </div>
              </div>

              <img
                src={`/img/${data.img_poster}`}
                alt="movie poster"
                className="hidden rounded-lg md:block md:w-[170px]"
              />
            </div>
            {movie.length > 0 ? (
              <div className="md:m-auto md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6">
                <h2
                  className="m-auto my-6  text-center text-[25px] text-white lg:mb-20"
                  id="scrollTo"
                >
                  Aktuella visningar
                </h2>
                <ScreeningCard query={`movie=${data.title}`} />
              </div>
            ) : (
              <div className="p-4 text-center">
                <p className="text-white-100" id="scrollTo">
                  Tyvärr finns inga visningar tillgängliga just nu för{" "}
                  {`${data.title}`}
                </p>
                <Link
                  to={"/bokning"}
                  className={`text-4-xl text-white-100 underline`}
                >
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

// movie-poster pb-8 sm:m-auto sm:text-xl md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6
