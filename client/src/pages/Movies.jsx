import { styles } from "../styles";
import MovieCard from "../components/moviesPage/MovieCard";
import useFetch from "../hooks/useFetch";

export default function Movies() {
  //eslint-disable-next-line
  const { data, isPending, error } = useFetch("/api/movies");

  return (
    <div className={`${styles.wrapper}`}>
      
        <h1 className={`${styles.headerText}`}>
          Våra Filmer
        </h1>
      
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
