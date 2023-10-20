import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "./movieCard.jsx";
import { movieData, responsive } from "../assets/carouselData.js";

export default function MultiCarousel() {
  //Här mappar vi igenom carouselData och för varje object i listan renderas ett kort ut med filmPoster, titel och alt-text till bilden.
  
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
    // Karusell från React-multi-carousel med movie från ovan.
    <Carousel
      className={`mx-2 my-12 md:m-20`}
      responsive={responsive}
      renderArrowsWhenDisabled={true}
    >
      {movie}
    </Carousel>
  );
}
