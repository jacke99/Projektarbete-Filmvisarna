import { styles } from "../styles.js";
import { Link, useNavigate } from "react-router-dom";
import MovieFilterForm from "../components/MovieFilterForm";
import BookMovieHero from "../components/BookMovieHero";
import useFetch from "../hooks/useFetch.js";
import { useState } from "react";

export default function Booking() {
  const navigate = useNavigate();
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [movie, setMovie] = useState("");
  const [query, setQuery]= useState("");

  //eslint-disable-next-line
  const { data, isPending, error } = useFetch(`/api/filteredscreenings${query?"?":""}${query}`)
  console.log(query)
  console.log(data)

  function handleSubmit(e) {
    e.preventDefault();
    console.log(age, date, movie)

    const queryParams = {};
    if (age) {
      queryParams.age = age;
    }
    if (date) {
      queryParams.date = date;
    }
    if (movie) {
      queryParams.movie = movie;
    }
    const queryString = new URLSearchParams(queryParams).toString();

    setQuery(queryString)
    navigate(`/booking?${queryString}`);
    setAge("");
    setDate("");
    setMovie("");
  }

  return (
    <div className="mt-16 mb-20 bg-primary font-inconsolata">
      <div className="relative">
        {data && data.length > 0 && (
          <>
            <img
              src={`/img/${data[0].movie.img_header}`}
              alt={`photo from the movie ${data[0].movie.title}`}
              className="w-full object-cover object-center lg:h-[550px]"
            />
            <div
              className={`${styles.centerAbsolutePos} top-1/2 flex flex-col text-center text-gold`}
            >
              <h1 className={`lg:text-4xl`}>{`${data[0].date} ${data[0].time}`}</h1>

              <h2 className={`lg:text-4xl`}>{`${data[0].movie.title}`}</h2>
              <Link to={`/movies/${data[0].movie._id}`} className={`text-4-xl underline`}>
                Se trailer
              </Link>
            </div>
          </>
        )}
      </div>
      {data && !isPending && <MovieFilterForm data={data} handleSubmit={handleSubmit}
        setAge={setAge} age={age} setDate={setDate} date={date} setMovie={setMovie} movie={movie} />}
      <BookMovieHero data={data} isPending={isPending} error={error} handleSubmit={handleSubmit} />
    </div>

  );
}
