import { killersPoster, killersImage } from "../assets/index.js";
import { styles } from "../styles.js";
export default function MovieDetails() {
  return (
    <div className=" h-full bg-primary">
      <div className="relative h-96 md:h-[28rem] lg:h-[32rem]">
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
          className={`absolute bottom-7 left-5 rounded bg-primary bg-opacity-60 p-1 lg:left-24`}
        >
          <p className={`${styles.trailerTitle} `}>Lorem Ipsum</p>
          <p className={`${styles.trailerSubTitle} `}>Romantica, Comadia</p>
          <p className={`${styles.trailerSubTitle} bold font-inconsolata`}>
            1 tim 33min | 11 år
          </p>
        </div>
      </div>
      <div className="relative m-auto flex flex-col p-8 sm:p-12 md:w-5/6 lg:w-2/3 lg:pb-8 xl:w-3/5 2xl:w-3/6">
        <p className={` mb-8 text-white sm:text-xl `}>
          Lorem Ipsum è un testo segnaposto utilizzato nel settore della
          tipografia e della stampa. Lorem Ipsum è considerato il testo
          segnaposto standard sin dal sedicesimo secolo, quando un anonimo
          tipografo prese una cassetta di caratteri e li assemblò per preparare
          un testo campione. quando un anonimo tipografo prese una cassetta di
          caratteri e li assemblò per preparare un.
        </p>
        <button className=" m-auto mb-4 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl">
          Biljetter
        </button>
        <div className={`${styles.movieDescInfo}`}>
          <span>Regi:</span>
          <span>Lorem Ipsum</span>
        </div>
        <div className={`${styles.movieDescInfo}`}>
          <span>Skådespelare:</span>
          <span>Testo segnaposto, Testo segnaposto</span>
        </div>
        <div className={`${styles.movieDescInfo}`}>
          <span>Originaltitel:</span>
          <span>testo segnaposto</span>
        </div>
        <div className={`${styles.movieDescInfo}`}>
          <span>Premiär:</span>
          <span>22 sep 2023</span>
        </div>
        <div className={`${styles.movieDescInfo}`}>
          <span>Originalspråk</span>
          <span>Lorem Ipsum</span>
        </div>
        <img
          src={killersPoster}
          alt="movie poster"
          className=" absolute bottom-8 right-12 hidden h-56 sm:block "
        />
      </div>
    </div>
  );
}
