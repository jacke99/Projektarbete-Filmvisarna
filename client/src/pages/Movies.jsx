import MovieCardForFilmer from "../components/MovieCardForFilmer";
import useFetch from "../hooks/useFetch";
export default function Movies() {
  const { data, isPending, error } = useFetch("/api/movies");
  console.log(data, isPending, error);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((movie, index) => (
            <MovieCardForFilmer key={index} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
