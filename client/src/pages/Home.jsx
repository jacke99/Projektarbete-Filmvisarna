import HeroMovie from "../components/homePage/HeroMovie.jsx";
import MultiCarouselCurrent from "../components/homePage/Multi-carousel-current.jsx";
import MultiCarouselUpcoming from "../components/homePage/Multi-carousel-upComing.jsx";
import { useEffect, useState } from "react";
import { performRequest } from "../service/fetchService.js";

export default function Home() {

const [movies, setMovies] = useState(undefined)
useEffect(() => {
async function getMovies() {
  const resp = await performRequest("api/movies/current", "GET")
  setMovies(resp)
  }
getMovies()
}, [])

  return (
<>
{movies &&
<>
  <HeroMovie movie={movies[2]}/>
  <MultiCarouselCurrent />
  <HeroMovie movie={movies[0]} />
  <MultiCarouselUpcoming />
  <HeroMovie movie={movies[4]} />
  </>
}
</>
  );
}

