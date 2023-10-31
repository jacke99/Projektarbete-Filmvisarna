import {
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

function findMovie(searchValue) {
  const movie = movies.find((movie) => movie.title == searchValue)
  return movie
}

  return (
    <> 
        {movies && <HeroMovie movie={movies[0]} />}
        <MultiCarouselCurrent />
        {/* <HeroMovie movieImg={theCreatorImage} /> */}
        <MultiCarouselUpcoming />
        {/* {movies && <HeroMovie movieImg={pastLivesImage} />} */}
        <button className="h-20 w-20 mt-20 bg-white" onClick={() => findMovie("The Creator")}>X</button>
    </>
  );
}
