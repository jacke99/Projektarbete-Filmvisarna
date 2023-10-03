import { styles } from "../styles";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "./movieCard.jsx";
import { movieData, responsive } from "../assets/carouselData.js";

export default function MultiCarousel() {
  const movie = movieData.map((movie, index) => (
    // eslint-disable-next-line react/jsx-key
    <MovieCard
      key={index}
      title={movie.title}
      img={movie.img}
      alt={movie.alt}
    />
  ));

  return (
    <Carousel
      className={`mx-2 my-12 md:m-20`}
      responsive={responsive}
      renderArrowsWhenDisabled={true}
    >
      {movie}
    </Carousel>
  );
}
