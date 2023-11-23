import { useState } from "react";
import { BsPlayCircleFill } from "react-icons/bs";
import { BsXCircle } from "react-icons/bs";
import PropTypes from "prop-types";
import "./MovieTrailer.css";
import { styles } from "../../styles.js";

/**
 * @author Hipnosic (Daniel Rotaru)
 * @description The MovieTrailer component retrieves movie details based on a provided id and then presents an interactive poster image. Clicking on the image triggers the display of a video overlay, allowing users to watch the movie trailer fetched from YouTube.
 */

export default function MovieTrailer(props) {
  const [showVideo, setShowVideo] = useState(false);
  const { movieDetails } = props;

  const openVideo = () => {
    setShowVideo(true);
  };

  const closeVideo = () => {
    setShowVideo(false);
  };

  if (!movieDetails) {
    return <div>No data available for this movie.</div>;
  }

  if (!movieDetails.trailer) {
    return <div>No trailer available for this movie.</div>;
  }
  const imgHeaderSrc = movieDetails.img_header
    ? `/img/${movieDetails.img_header}`
    : "";
  return (
    <div className="relative w-full">
      <div className="w-full">
        <div className="relative inset-0">
          <div
            className={`${styles.trailerDetails} absolute bottom-0 left-0 bg-black bg-opacity-20 p-4 text-white`}
          >
            <p
              className={`${styles.trailerTitle} mb-1 text-2xl font-bold`}
              style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)" }}
            >
              {movieDetails.title}
            </p>
            <p
              className={`${styles.trailerSubTitle} text-md mb-1`}
              style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)" }}
            >
              {movieDetails.genre}
            </p>
            <p
              className={`${styles.trailerSubTitle} text-md font-inconsolata font-bold`}
              style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)" }}
            >
              {movieDetails.length} |{" "}
              <span>
                {" "}
                {movieDetails.ageRestriction === 0
                  ? "Ingen åldersgräns"
                  : movieDetails.ageRestriction + " år"}
              </span>
            </p>
          </div>
          <img
            src={imgHeaderSrc}
            alt="movie header"
            className={`${styles.imgHeader}cursor-pointer`}
            onClick={openVideo}
          />
          <div className="translate-50-50 absolute left-1/2 top-1/2">
            <BsPlayCircleFill
              className="play-button cursor-pointer text-5xl text-white  md:text-6xl lg:text-7xl xl:text-8xl"
              onClick={openVideo}
            />
          </div>
        </div>
      </div>

      {showVideo && (
        <div
          className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-80"
          onClick={closeVideo}
        >
          <div className="w-full max-w-screen-md">
            <iframe
              src={`https://www.youtube.com/embed/${movieDetails.trailer}?autoplay=1&rel=0&modestbranding=1`}
              className="absolute left-0 top-0 w-full"
              style={{ height: "80vh" }}
            ></iframe>
            <div
              className="absolute bottom-20 left-0 flex w-full justify-center"
              style={{ zIndex: 2 }}
            >
              <BsXCircle
                className="close-button cursor-pointer text-4xl text-white md:text-4xl lg:text-5xl xl:text-6xl"
                onClick={closeVideo}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

MovieTrailer.propTypes = {
  movieDetails: PropTypes.shape({
    trailer: PropTypes.string,
    img_header: PropTypes.string,
    title: PropTypes.string,
    genre: PropTypes.string,
    length: PropTypes.string,
    ageRestriction: PropTypes.number,
  }),
};
