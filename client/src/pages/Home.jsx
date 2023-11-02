import {
} from "../assets/index.js";
import HeroMovie from "../components/homePage/HeroMovie.jsx";
import MultiCarouselCurrent from "../components/homePage/multi-carousel-current.jsx";
import MultiCarouselUpcoming from "../components/homePage/multi-carousel-upComing.jsx";
import { useEffect, useState } from "react";
import { performRequest } from "../service/fetchService.js";

export default function Home() {

const [movies, setMovies] = useState(undefined)
console.log(movies)
useEffect(() => {
async function getMovies() {
  const resp = await performRequest("api/movies/current", "GET")
  setMovies(resp)
  }
getMovies()
}, [])

  return (
    <> 
        {movies && <HeroMovie movie={movies[2]} />}
        <MultiCarouselCurrent />
        {movies && <HeroMovie movie={movies[0]} />}
        <MultiCarouselUpcoming />
        {movies && <HeroMovie movie={movies[4]} />}
    </>
  );
}
