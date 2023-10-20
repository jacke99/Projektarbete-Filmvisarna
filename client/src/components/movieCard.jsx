/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

//MovieCard används som kort för filmer och tillhörande filmtitel i bildkarusellen
export default function MovieCard({ title, img, alt }) {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <img
        className="sm: h-[222px] w-[150px] rounded-lg object-cover object-center md:h-[252px] md:w-[170px] lg:h-[296px] lg:w-[200px]"
        src={img}
        alt={alt}
        onClick={() => navigate("/movies/1")}
      />

      <h2
        className="lg:text-l
       text-s w-[150px] font-inconsolata text-white lg:w-[200px]"
      >
        {title}
      </h2>
    </div>
  );
}
