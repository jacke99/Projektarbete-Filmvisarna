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
       
       md:mb-12 md:mt-32 lg:mb-20 lg:mt-40"
      >
        <h1 className="font-extra-bold text-xl md:text-2xl lg:text-3xl">
          Våra Filmer
        </h1>
      </div>
      <MovieCardForFilmer />
      <MovieCardForFilmer />
      <MovieCardForFilmer />
      <MovieCardForFilmer />
      <MovieCardForFilmer />
      <MovieCardForFilmer />
    </div>
  );
}
