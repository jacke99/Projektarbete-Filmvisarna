import MovieCard from "../components/moviesPage/MovieCard";
import useFetch from "../hooks/useFetch";
import { styles } from "../styles";

export default function Movies() {
  //eslint-disable-next-line
  const { data, isPending, error } = useFetch("/api/movies");

  return (
    <div className={`${styles.wrapper}`}>
      
        <h1 className={`${styles.headerText} ${styles.paddingTop} ${styles.paddingBottom} text-center`}>
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
