import { useNavigate } from "react-router-dom";
import { styles } from "../../styles";
import PropTypes from "prop-types";
import { useState } from "react";
export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const handleReadMoreClick = () => {
    navigate(`/filmer/${movie._id}`);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const renderDescription = () => {
    const maxLength = 80;
    const shortDescription = movie.description.slice(0, maxLength);
    const readMore = <p className="inline-block underline"> Läs mer</p>;
    return showFullDescription ? (
      movie.description
    ) : (
      <>
        {shortDescription}... {readMore}
      </>
    );
  };

  return (
    <div className="lg:flex lg:justify-start">
      <div className="flex max-w-7xl flex-col justify-between border-t-[0.5px] border-gold py-4 md:flex-row md:gap-4 md:py-8  lg:flex-row lg:justify-start lg:gap-8">
        <img
          src={`/img/${movie.img_poster}`}
          alt={`movie poster for ${movie.title}`}
          className="hidden w-[200px] rounded-xl object-cover md:block md:w-[200px] "
        />
        <img
          src={`/img/${movie.img_header}`}
          alt={`movie poster for ${movie.title}`}
          className="h-56 w-[calc(100%_+_24px)] object-cover  md:hidden"
        />
        <div className="md: flex flex-col justify-center md:justify-around lg:justify-around">
          <div className="my-4 flex flex-col text-white-100">
            <h2 className={`${styles.subHeaderText}`}>{movie.title}</h2>
            <p className={`${styles.subText}`}>{movie.genre}</p>
            <p className={`${styles.bodyText} hidden md:block`}>
              {movie.description}
            </p>
            <div
              className={`${styles.bodyText} md:hidden`}
              onClick={toggleDescription}
            >
              {renderDescription()}
            </div>
          </div>
          <button
            onClick={handleReadMoreClick}
            className={`${styles.buttonStyle} self-start`}
          >
            Till filmen
          </button>
        </div>
      </div>
    </div>
  );
}
MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};

// self-start rounded-md bg-gold px-4 py-2 text-black-100 lg:px-6 lg:py-3 lg:text-lg
