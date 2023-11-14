import { useState } from 'react';
import { BsPlayCircleFill } from 'react-icons/bs';
import { BsXCircle } from 'react-icons/bs';
import PropTypes from 'prop-types';
import './MovieTrailer.css';
import { styles } from "../../styles.js";


/**
 * @author Hipnosic (Daniel Rotaru)
 * @description The MovieTrailer component retrieves movie details based on a provided id and then presents an interactive poster image. Clicking on the image triggers the display of a video overlay, allowing users to watch the movie trailer fetched from YouTube.
 */

export default function MovieTrailer(props) {

    const [showVideo, setShowVideo] = useState(false);
    const {movieDetails} = props;

    console.log(movieDetails)
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
const imgHeaderSrc = movieDetails.img_header ? `/img/${movieDetails.img_header}` : '';
    return (
        <div className="relative w-full">
            <div className="w-full" style={{ paddingBottom: '4.25%' }}>
                <div className="relative inset-0">
                    <img src={imgHeaderSrc} alt="movie header" className={`${styles.imgHeader}cursor-pointer`} onClick={openVideo} />
                    <div className="translate-50-50 absolute left-1/2 top-1/2">
                        <BsPlayCircleFill className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl  text-white cursor-pointer play-button" onClick={openVideo} />
                    </div>
                </div>
            </div>

            {showVideo && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-50" onClick={closeVideo}>
                    <div className="max-w-screen-md w-full">
                        <iframe
                            src={`https://www.youtube.com/embed/${movieDetails.trailer}?autoplay=1&rel=0&modestbranding=1`}
                            className="w-full absolute top-0 left-0"
                            style={{ height: '80vh' }}
                        ></iframe>
                        <div
                            className="absolute bottom-20 left-0 w-full flex justify-center"
                            style={{ zIndex: 2 }}
                        >
                            <BsXCircle className="text-4xl md:text-4xl lg:text-5xl xl:text-6xl text-white cursor-pointer close-button" onClick={closeVideo} />
                        </div>
                    </div >
                </div>
            )}
        </div>
    );
}

MovieTrailer.propTypes = {
    
    movieDetails: PropTypes.shape({
        trailer: PropTypes.string,
        img_header: PropTypes.string,
      }),
};

