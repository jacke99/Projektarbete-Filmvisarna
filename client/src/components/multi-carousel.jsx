import {
  theCreatorPoster,
  smsPoster,
  killersPoster,
  pastLivesPoster,
  aLittleLifePoster,
} from "../assets/index.js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "./movieCard.jsx";

export default function MultiCarousel() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const movieData = [
    {
      id: 1,
      title: "A little life",
      img: aLittleLifePoster,
      alt: "picture from movie A little life ",
    },
    {
      id: 2,
      title: "Killers of the Flower Moon",
      img: killersPoster,
      alt: "picture from movie Killers of the Flower Moon ",
    },
    {
      id: 3,
      title: "Passed lives",
      img: pastLivesPoster,
      alt: "picture from movie Passed Lives ",
    },
    {
      id: 4,
      title: "SMS",
      img: smsPoster,
      alt: "picture from movie SMS ",
    },
    {
      id: 5,
      title: "The Creator",
      img: theCreatorPoster,
      alt: "picture from movie The Creator ",
    },
  ];

  const movie = movieData.map((movie) => (
    // eslint-disable-next-line react/jsx-key
    <MovieCard title={movie.title} img={movie.img} alt={movie.alt} />
  ));

  return <Carousel responsive={responsive}>{movie}</Carousel>;
}
