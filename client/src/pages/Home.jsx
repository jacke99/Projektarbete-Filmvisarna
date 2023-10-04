import {
  killersImage,
  theCreatorImage,
  pastLivesImage,
} from "../assets/index.js";
import HeroMovie from "../components/HeroMovie.jsx";
import MultiCarousel from "../components/multi-carousel.jsx";

export default function Home() {
  return (
    <>
        <HeroMovie movieImg={killersImage} />
        <MultiCarousel />
        <HeroMovie movieImg={theCreatorImage} />
        <MultiCarousel />
        <HeroMovie movieImg={pastLivesImage} />
    </>
  );
}
