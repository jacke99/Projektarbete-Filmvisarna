import Header from "../components/Header.jsx";
import {
  killersImage,
  theCreatorPoster,
  killersPoster,
  theCreatorImage,
  pastLivesImage,
} from "../assets/index.js";
import MovieImgBlock from "../components/MovieImgBlock.jsx";
import Carousel from "../components/Carousel.jsx";
// import MultiCarousel from "../components/multi-carousel.jsx";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* <MultiCarousel /> */}
        <MovieImgBlock movieImg={killersImage} />
        <Carousel
          moviePoster1={theCreatorPoster}
          moviePoster2={killersPoster}
        />
        <MovieImgBlock movieImg={theCreatorImage} />
        <Carousel
          moviePoster1={theCreatorPoster}
          moviePoster2={killersPoster}
        />
        <MovieImgBlock movieImg={pastLivesImage} />
      </main>
    </>
  );
}
