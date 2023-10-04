import {
  killersPoster,
  aLittleLifePoster,
  pastLivesPoster,
  smsPoster,
  theCreatorPoster,
} from "../assets";
import MovieCardForFilmer from "../components/MovieCardForFilmer";

export default function Movies() {
  return (
    <div className="px-8">
      <div className="m-6 mt-28 text-center text-2xl text-white">
        <h1>Våra Filmer</h1>
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
