import { killersPoster, killersImage } from "../assets/index.js";
import BookMovieHero from "../components/BookMovieHero.jsx";
import MovieFilterForm from "../components/MovieFilterForm.jsx";
import { styles } from "../styles.js";
import { useEffect } from "react";
export default function MovieDetails() {
  function handleClickScroll() {
    const element = document.getElementById("scrollTo");
    console.log(element);
    if(element) {
      element.scrollIntoView({behavior: "smooth"})
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className=" mt-20 mb-20 h-full bg-primary">
      <div className="relative h-96 md:h-[30rem] lg:h-[36rem] ">
        <img
          src={killersImage}
          alt="movie poster"
          className=" h-full min-w-full object-cover"
        />
        <img
          src={killersPoster}
          alt="movie poster"
          className="  absolute bottom-28 left-5 block h-44 sm:hidden "
        />
        <div
          className={`absolute bottom-7 left-5 p-1 lg:left-24 text-shadow`}
        >
          <p className={`${styles.trailerTitle} `}>Lorem Ipsum</p>
          <p className={`${styles.trailerSubTitle} `}>Romantica, Comadia</p>
          <p className={`${styles.trailerSubTitle} bold font-inconsolata`}>
            1 tim 33min | 11 år
          </p>
        </div>
      </div>
      <div className="relative m-auto flex flex-col p-8 sm:p-12 lg:pb-8">
        <p className={` mb-4 text-white sm:text-xl md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
          Lorem Ipsum è un testo segnaposto utilizzato nel settore della
          tipografia e della stampa. Lorem Ipsum è considerato il testo
          segnaposto standard sin dal sedicesimo secolo, quando un anonimo
          tipografo prese una cassetta di caratteri e li assemblò per preparare
          un testo campione. quando un anonimo tipografo prese una cassetta di
          caratteri e li assemblò per preparare un.
        </p>
        <button onClick={handleClickScroll} className="mb-4 mt-2 md:mt-6 md:mb-6 lg:mt-8 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto">
          Biljetter
        </button>
        <div className={`${styles.movieDescInfo} md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
          <span>Regi:</span>
          <span>Lorem Ipsum</span>
        </div>
        <div className={`${styles.movieDescInfo} md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
          <span>Skådespelare:</span>
          <span>Testo segnaposto, Testo segnaposto</span>
        </div>
        <div className={`${styles.movieDescInfo} md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
          <span>Originaltitel:</span>
          <span>testo segnaposto</span>
        </div>
        <div className={`${styles.movieDescInfo} md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
          <span>Premiär:</span>
          <span>22 sep 2023</span>
        </div>
        <div className={`${styles.movieDescInfo} md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
          <span>Originalspråk</span>
          <span>Lorem Ipsum</span>
        </div>
        <img
          src={killersPoster}
          alt="movie poster"
          className=" absolute top-[22rem] right-[6rem] hidden h-56 sm:block lg:h-72 lg:top[22rem] lg:right-[19rem]"
        />
        <p id="scrollTo"></p>
        <MovieFilterForm />
        <BookMovieHero />
      </div>
    </div>
  );
}
