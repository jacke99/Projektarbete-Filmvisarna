import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "./movieCard.jsx";
import { movieData, responsive } from "../assets/carouselData.js";

export default function MultiCarousel() {
  const movie = movieData.map((movie) => (
    // eslint-disable-next-line react/jsx-key
    <MovieCard title={movie.title} img={movie.img} alt={movie.alt} />
  ));

  return <Carousel responsive={responsive}>{movie}</Carousel>;
}
