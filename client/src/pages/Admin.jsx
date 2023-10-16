import { useState } from "react";


function Admin() {
    const [showMoviesForm, setShowMoviesForm] = useState(false);
    const [showBookingsForm, setShowBookingsForm] = useState(false);
    const [showUsersForm, setShowUsersForm] = useState(false);
    const [showTheatersForm, setShowTheatersForm] = useState(false);
    const [showScreeningsForm, setShowScreeningsForm] = useState(false);

    const toggleMoviesForm = () => {
        setShowMoviesForm(!showMoviesForm);
    };

    const toggleBookingsForm = () => {
        setShowBookingsForm(!showBookingsForm);
    };

    const toggleUsersForm = () => {
        setShowUsersForm(!showUsersForm);
    };

    const toggleTheatersForm = () => {
        setShowTheatersForm(!showTheatersForm);
    };

    const toggleScreeningsForm = () => {
        setShowScreeningsForm(!showScreeningsForm);
    };

    return (
        <div className="min-h-screen bg-primary">
            <div className="py-6 mt-10 pl-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-semibold text-white">Admin Dashboard</h1>
                </div>
            </div>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
                    <div className="bg-black overflow-hidden shadow rounded-lg border-2 border-gold">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium text-white">Bookings</h3>
                            <button
                                className="mb-4 mt-2 md:mt-6 md:mb-6 lg:mt-8 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto"
                                onClick={toggleBookingsForm}
                            >
                                {showBookingsForm ? "Hide Form" : "Show Form"}
                            </button>
                            {showBookingsForm && (
                                <form className=" text-white">
                                    <input type="text" name="file-name" id="name" />
                                    <input type="file" name="file" id="files" multiple />
                                    <button className=" mt-2 md:mt-6 md:mb-6 lg:mt-8 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto" type="submit">Submit</button>
                                </form>
                            )}
                        </div>
                    </div>
                    <div className="bg-black overflow-hidden shadow rounded-lg border-2 border-gold">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium text-white">Users</h3>
                            <button
                                className="mb-4 mt-2 md:mt-6 md:mb-6 lg:mt-8 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto"
                                onClick={toggleUsersForm}
                            >
                                {showUsersForm ? "Hide Form" : "Show Form"}
                            </button>
                            {showUsersForm && (
                                <form className=" text-white">
                                    <input type="text" name="file-name" id="name" />
                                    <input type="file" name="file" id="files" multiple />
                                    <button className=" mt-2 md:mt-6 md:mb-6 lg:mt-8 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto" type="submit">Submit</button>
                                </form>
                            )}
                        </div>
                    </div>
                    <div className="bg-black overflow-hidden shadow rounded-lg border-2 border-gold">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium text-white">Screenings</h3>
                            <button
                                className="mb-4 mt-2 md:mt-6 md:mb-6 lg:mt-8 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto"
                                onClick={toggleScreeningsForm}
                            >
                                {showScreeningsForm ? "Hide Form" : "Show Form"}
                            </button>
                            {showScreeningsForm && (
                                <form className=" text-white">
                                    <input type="text" name="file-name" id="name" />
                                    <input type="file" name="file" id="files" multiple />
                                    <button className=" mt-2 md:mt-6 md:mb-6 lg:mt-8 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto" type="submit">Submit</button>
                                </form>
                            )}
                        </div>
                    </div>
                    <div className="bg-black overflow-hidden shadow rounded-lg border-2 border-gold">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium text-white">Movies</h3>
                            <button
                                className="mb-4 mt-2 md:mt-6 md:mb-6 lg:mt-8 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto"
                                onClick={toggleMoviesForm}
                            >
                                {showMoviesForm ? "Hide Form" : "Show Form"}
                            </button>
                            {showMoviesForm && (
                                <form className=" text-black" action="/api/movies" method="post" encType="multipart/form-data">
                                    <input type="text" name="title" placeholder="Title..."/>
                                    <input type="text" name="desc" placeholder="Description..."/>
                                    <input type="text" name="trailer" placeholder="Trailer..."/>
                                    <input type="text" name="director" placeholder="Director..."/>
                                    <input type="text" name="actors" placeholder="Actors..."/>
                                    <input type="text" name="length" placeholder="Length..."/>
                                    <input type="text" name="genre" placeholder="Genre..."/>
                                    <input type="text" name="speech" placeholder="Speech..."/>
                                    <input type="text" name="subtitles" placeholder="Subtitles..."/>
                                    <input type="number" name="ageRestriction" placeholder="Age restriction"/>
                                    <input type="file" name="img-file" id="files" multiple />
                                    <button className=" mt-2 md:mt-6 md:mb-6 lg:mt-8 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto" type="submit">Submit</button>
                                </form>
                            )}
                        </div>
                    </div>
                    <div className="bg-black overflow-hidden shadow rounded-lg border-2 border-gold mb-8">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium text-white">Theaters</h3>
                            <button
                                className="mb-4 mt-2 md:mt-6 md:mb-6 lg:mt-8 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto"
                                onClick={toggleTheatersForm}
                            >
                                {showTheatersForm ? "Hide Form" : "Show Form"}
                            </button>
                            {showTheatersForm && (
                                <form className=" text-white">
                                    <input type="text" name="file-name" id="name" />
                                    <input type="file" name="file" id="files" multiple />
                                    <button className=" mt-2 md:mt-6 md:mb-6 lg:mt-8 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto" type="submit">Submit</button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
