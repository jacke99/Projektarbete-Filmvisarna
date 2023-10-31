import {
  theCreatorImage,
  pastLivesImage,
} from "../assets/index.js";
import HeroMovie from "../components/HeroMovie.jsx";
import MultiCarouselCurrent from "../components/multi-carousel-current.jsx";
import MultiCarouselUpcoming from "../components/multi-carousel-upComing.jsx";
import { useEffect, useState } from "react";
import { performRequest } from "../service/fetchService.js";

export default function Home() {

const [movies, setMovies] = useState([])

useEffect(() => {
async function getMovies() {
  const resp = await performRequest("api/movies/current", "GET")
  setMovies(resp)
  }
getMovies()
}, [])

console.log(movies)

  return (
    <>
        {movies && <HeroMovie movieImg={movies[0].img_header} />}
        <MultiCarouselCurrent />
        <HeroMovie movieImg={theCreatorImage} />
        <MultiCarouselUpcoming />
        {movies && <HeroMovie movieImg={pastLivesImage} />}
    </>
  );
}
