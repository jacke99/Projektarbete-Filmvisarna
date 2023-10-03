import Header from "../components/Header.jsx";
import {
  killersImage,
  theCreatorImage,
  pastLivesImage,
} from "../assets/index.js";
import MovieImgBlock from "../components/MovieImgBlock.jsx";
import MultiCarousel from "../components/multi-carousel.jsx";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <MovieImgBlock movieImg={killersImage} />
        <MultiCarousel />
        <MovieImgBlock movieImg={theCreatorImage} />
        <MultiCarousel />
        <MovieImgBlock movieImg={pastLivesImage} />
      </main>
    </>
  );
}
