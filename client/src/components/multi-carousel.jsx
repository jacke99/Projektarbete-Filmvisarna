import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "./movieCard.jsx";
import { responsive } from "../assets/carouselData.js";
import { useEffect, useState } from "react";
import { performRequest } from "../service/fetchService.js";


export default function MultiCarousel() {
  const pathToFolder = '/img/';

  const [movies, setMovies] = useState([])

  useEffect(() => {
  async function getMovies() {
    const resp = await performRequest("/api/movies", "GET")
    
    setMovies(resp)
  }
  getMovies()
  }, [])

  //Här mappar vi igenom carouselData och för varje object i listan renderas ett kort ut med filmPoster, titel och alt-text till bilden.
  const movie = movies.map((movie, index) => (
    // eslint-disable-next-line react/jsx-key
    <MovieCard
      key={index}
      title={movie.title}
      img={`${pathToFolder}${movie.img_poster}`} 
      alt={movie.title}
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
