
import MovieCard from "../components/moviesPage/MovieCard";
import useFetch from "../hooks/useFetch";

export default function Movies() {
  //eslint-disable-next-line
  const { data, isPending, error } = useFetch("/api/movies");

  return (
    <div className="mb-20 px-8">
      <div
        className="
        mb-6 mt-20 
        text-center text-2xl
        text-white 
        md-12 md:mt-32 lg-20 lg:mt-40"
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
