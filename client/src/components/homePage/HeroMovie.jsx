/* eslint-disable */
import { styles } from "../../styles";
import { Link } from "react-router-dom";

export default function HeroMovie({movie}) {
 
  return (
    <section
      className={`relative flex items-center justify-center bg-primary text-center`}
    >
      <img
        className={`${styles.imgHeader}`}
        src={`/img/${movie.img_header}`}
        alt="Img with main characters from Killers of the Flower Moon Movie"
      />
      <div className="translate-50-50 absolute left-1/2 top-1/2">
        <h2 className={`${styles.headerText} [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-black`}>{movie.screenings[movie.screenings.length - 1].date.slice(5).replace("-", "/")} {movie.screenings[movie.screenings.length - 1].time}</h2>
        <h2 className={`${styles.subHeaderText} [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-black`}>
          {movie.title}
        </h2>
        <Link to={`movies/${movie._id}`}>
        <p className="underline-offset-3 font-inconsolata text-gold underline underline-offset-4 sm:text-[12px] md:text-[20px] lg:text-[25px] 
        [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-black">
          Mer info {">"}
        </p> 
        </Link>
      </div>
    </section>
  );
}
