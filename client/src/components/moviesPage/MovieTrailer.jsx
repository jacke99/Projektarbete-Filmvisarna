import { useState } from 'react';
import { BsPlayCircleFill } from 'react-icons/bs';
import PropTypes from 'prop-types';
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import './MovieTrailer.css';

/**
 * @author Hipnosic (Daniel Rotaru)
 * @description The MovieTrailer component retrieves movie details based on a provided id and then presents an interactive poster image. Clicking on the image triggers the display of a video overlay, allowing users to watch the movie trailer fetched from YouTube.
 */

export default function MovieTrailer() {
    const { id } = useParams();
    const { data, isPending, error } = useFetch(`/api/movies/${id}`);
    const [showVideo, setShowVideo] = useState(false);

    const openVideo = () => {
        setShowVideo(true);
    };

    const closeVideo = () => {
        setShowVideo(false);
    };

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>No data available for this movie.</div>;
    }

    if (!data.trailer) {
        return <div>No trailer available for this movie.</div>;
    }

    return (
        <div className="relative w-full">
            <div className="w-full" style={{ paddingBottom: '4.25%' }}>
                <div className="relative inset-0">
                    <img src={`/img/${data.img_header}`} alt="movie header" className="w-full object-cover object-center lg:h-[550px] cursor-pointer" onClick={openVideo} />
                    <div className="translate-50-50 absolute left-1/2 top-1/2">
                        <BsPlayCircleFill className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl  text-white cursor-pointer play-button" onClick={openVideo} />
                    </div>
                </div>
            </div>

            {showVideo && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-50" onClick={closeVideo}>
                    <div className="max-w-screen-md w-full">
                        <iframe
                            src={`https://www.youtube.com/embed/${data.trailer}?autoplay=1&rel=0&modestbranding=1`}
                            className="w-full absolute top-0 left-0"
                            style={{ height: '80vh' }}
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
}

MovieTrailer.propTypes = {
    id: PropTypes.string.isRequired,
};
