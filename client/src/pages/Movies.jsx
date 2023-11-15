import { styles } from "../styles";
import MovieCard from "../components/moviesPage/MovieCard";
import useFetch from "../hooks/useFetch";

export default function Movies() {
  //eslint-disable-next-line
  const { data, isPending, error } = useFetch("/api/movies");

  return (
    <div className={``}>
      <div
        className=""
      >
        <h1 className="font-extra-bold text-gold text-xl md:text-2xl lg:text-3xl">
          Våra Filmer
        </h1>
      </div>
      {data && (
        <div className="">
          {data.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
