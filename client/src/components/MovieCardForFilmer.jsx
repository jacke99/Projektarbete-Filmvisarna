/* DENNA TILLHÖR SIDAN FILMER*/
import { killersImage } from "../assets";
import { useNavigate } from "react-router-dom";

export default function MovieCardForFilmer() {
  const navigate = useNavigate();

  return (
    <div className="lg:flex lg:justify-center">
      <div className=" lg:pr-15 flex max-w-7xl flex-col justify-between border-t-[0.5px] border-gold py-8  md:flex-row md:gap-4 md:pr-6 lg:flex-row lg:justify-start lg:gap-8">
        <img
          src={killersImage}
          alt="movie poster from Killers of the flower moon"
          className="h-[250px]  w-full object-cover object-center lg:h-[450px] lg:w-1/2"
        />
        <div className="md: flex flex-col justify-center md:justify-around lg:justify-around">
          <div className="my-4 flex flex-col text-white-100 md:my-0 lg:my-0">
            <h2 className="font-extra-bold text-base md:text-lg lg:text-xl">
              The Creator
            </h2>
            <p className="font-inconsolata text-sm lg:text-base">Sifi, drama</p>
            <p className="flex-col pt-1 text-sm lg:text-lg">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam
              facere totam tenetur omnis consequuntur vero ipsum, reprehenderit
              molestiae a quae illum esse quo nulla blanditiis voluptatibus amet
              eius? Veritatis, culpa.
            </p>
          </div>
          <button
            onClick={() => navigate("/movies/1")}
            className="self-start rounded-md bg-gold px-4 py-2 text-black-100 lg:px-6 lg:py-3 lg:text-lg"
          >
            Biljetter
          </button>
        </div>
      </div>
    </div>
  );
}
