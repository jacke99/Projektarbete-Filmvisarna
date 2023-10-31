import {
  killersImage,
  theCreatorImage,
  pastLivesImage,
} from "../assets/index.js";
import HeroMovie from "../components/HeroMovie.jsx";
import MultiCarouselCurrent from "../components/multi-carousel-current.jsx";
import MultiCarouselUpcoming from "../components/multi-carousel-upComing.jsx";

export default function Home() {

  return (
    <>
        <HeroMovie movieImg={killersImage} />
        <MultiCarouselCurrent />
        <HeroMovie movieImg={theCreatorImage} />
        <MultiCarouselUpcoming />
        <HeroMovie movieImg={pastLivesImage} />
    </>
  );
}
