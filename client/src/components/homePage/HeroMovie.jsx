/* eslint-disable */
import { styles } from "../../styles";
import { Link } from "react-router-dom";
import newDateFormat from "../../service/newDateFormat";

export default function HeroMovie({movie}) {
 
  return (
    <section className={`relative flex items-center justify-center bg-primary text-center`}>
      <img
        className={`${styles.imgHeader}`}
        src={`/img/${movie.img_header}`}
        alt="Img with from movie"
      />
      <div className="translate-50-50 absolute left-1/2 top-1/2">

        <h2 className={`${styles.heroHeader}`}>
        {newDateFormat(movie.screenings[movie.screenings.length - 1].date)} {movie.screenings[movie.screenings.length - 1].time}</h2>

        <h2 className={`${styles.heroSubHeader} [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-black`}>
          {movie.title}
        </h2>

        <Link to={`filmer/${movie._id}`}>
        <p className={`${styles.heroSubText}`}>
          Mer info {">"}
        </p> 
        </Link>
      </div>
    </section>
  );
}
