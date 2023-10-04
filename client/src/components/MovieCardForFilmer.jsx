/* eslint-disable react/prop-types */
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
        <div className="md: flex flex-col justify-center">
          <div className="my-4 flex flex-col text-white-100">
            <h2 className="font-extra-bold text-base">The Creator</h2>
            <p className="font-inconsolata text-xs">Sifi, drama</p>
            <p className="flex-col pt-1 text-xs">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam
              facere totam tenetur omnis consequuntur vero ipsum, reprehenderit
              molestiae a quae illum esse quo nulla blanditiis voluptatibus amet
              eius? Veritatis, culpa.
            </p>
          </div>
          <button
            onClick={() => navigate("/movies/1")}
            className="self-start rounded-md bg-gold p-1 px-4 text-black-100"
          >
            Biljetter
          </button>
        </div>
      </div>
    </div>
  );
}
