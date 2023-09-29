/* eslint-disable react/prop-types */
import { styles } from "../styles.js";

export default function Carousel({ moviePoster1, moviePoster2 }) {
  return (
    <section>
      <div> pil </div>
      <img
        className="w-34 h-48 rounded-lg"
        src={moviePoster1}
        alt="Img with main characters from Killers of the Flower Moon Movie"
      />
      <img
        className="w-34 h-48 rounded-lg"
        src={moviePoster2}
        alt="Img with main characters from Killers of the Flower Moon Movie"
      />
      <div> pil </div>
    </section>
  );
}
