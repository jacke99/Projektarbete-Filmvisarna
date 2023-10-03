import { killersImage } from "../assets";
import { styles } from "../styles.js";
import { Link } from "react-router-dom";
import MovieFilterForm from "../components/MovieFilterForm";
import BookMovieHero from "../components/BookMovieHero";



export default function Booking() {
  return (
    <div className="mt-20 min-w-full max-w-full bg-primary font-inconsolata">
    <div className="relative">
      <img
        src={killersImage}
        alt="photo from the movie Killers"
        style={{ width: "100%", maxHeight: "auto" }}
      />
      <div
        className={`${styles.centerAbsolutePos} top-1/2 flex flex-col text-center text-gold`}
      >
        <h1 className={`lg:text-4xl`}>26/9 18:00</h1>{" "}
        <h2 className={`lg:text-4xl`}>Killers of the Flower Moon</h2>
        <Link to="/movies/:id" className={`text-4-xl underline`}>
          Se trailer
        </Link>
      </div>
    </div>
    <MovieFilterForm />
    <BookMovieHero />
</div>
  );
}
