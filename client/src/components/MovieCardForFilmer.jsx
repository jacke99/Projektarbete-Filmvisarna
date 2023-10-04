/* eslint-disable react/prop-types */
import { killersImage } from "../assets";
import { useNavigate } from "react-router-dom";

export default function MovieCardForFilmer() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col justify-between border-t-[0.5px] border-gold p-6  lg:justify-start lg:px-96">
        <img
          src={killersImage}
          alt="movie poster from Killers of the flower moon"
          className="h-[250px] w-full object-cover object-center lg:h-[550px]"
        />
        <div>
          <div className="my-4 flex flex-col text-white-100">
            <h2 className="font-extra-bold text-base">The Creator</h2>
            <p className="font-inconsolata text-xs">Sifi, drama</p>
            <p className="flex-col pt-1 text-xs md:w-1/2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam
              facere totam tenetur omnis consequuntur vero ipsum, reprehenderit
              molestiae a quae illum esse quo nulla blanditiis voluptatibus amet
              eius? Veritatis, culpa.
            </p>
          </div>
          <button
            onClick={() => navigate("/movies/1")}
            className="rounded-md bg-gold p-1 px-4 text-black-100"
          >
            Biljetter
          </button>
        </div>
      </div>
    </>
  );
}
