import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "./CarouselCard.jsx";
import { responsive } from "../../assets/carouselData.js";
import { useEffect, useState } from "react";
import { performRequest } from "../../service/fetchService.js";
import { styles } from "../../styles.js";


export default function MultiCarouselUpcoming() {
  const pathToFolder = '/img/';

  const [movies, setMovies] = useState([])

  useEffect(() => {
  async function getMovies() {
    const resp = await performRequest("/api/movies/upcoming", "GET")
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
      link={`/movies/${movie._id}`}
    />
  ));

  return (
    // Karusell från React-multi-carousel med movie från ovan.
  <div className={`${styles.wrapper}`} >

    <h1 className={`${styles.headerText}text-gold text-center mt-20`}>Kommande filmer</h1>
    <Carousel
      className={`mx-2 my-10 md:my-12`}
      responsive={responsive}
      renderArrowsWhenDisabled={true}
    >
      {movie}
    </Carousel>
  </div>
  );
}
