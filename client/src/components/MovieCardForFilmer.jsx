import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

export default function MovieCardForFilmer({ movie }) {
  const navigate = useNavigate();

  const handleReadMoreClick = () => {
    navigate(`/movies/${movie.id}`);
  };


  return (
    <div className="lg:flex lg:justify-center">
      <div className="lg:pr-15 flex max-w-7xl flex-col justify-between border-t-[0.5px] border-gold py-8 md:flex-row md:gap-4 md:pr-6 lg:flex-row lg:justify-start lg:gap-8">
        <img
          src={`/img/${movie.img_poster}`}
          alt={`movie poster for ${movie.title}`}
          className="border-[0.5px] border-gold [250px] w-full object-cover object-center lg:h-[450px] lg:w-1/2"
        />
        <div className="md: flex flex-col justify-center md:justify-around lg:justify-around">
          <div className="my-4 flex flex-col text-white-100 md:my-0 lg:my-0">
            <h2 className="font-extra-bold text-base md:text-lg lg:text-xl">
              {movie.title}
            </h2>
            <p className="font-inconsolata text-sm lg:text-base">{movie.genre}</p>
            <p className="flex-col pt-1 text-sm lg:text-lg">{movie.description}</p>
          </div>
          <button
            onClick={() => navigate(`/movies/${movie.id}`)}
            className="self-start rounded-md bg-gold px-4 py-2 text-black-100 lg:px-6 lg:py-3 lg:text-lg"
          >
            Läs mer!
          </button>
        </div>
      </div>
    </div>
  );
}
MovieCardForFilmer.propTypes = {
  movie: PropTypes.object.isRequired,
};

