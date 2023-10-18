import { useState } from "react";


function Admin() {
    const [showMoviesForm, setShowMoviesForm] = useState(false);
    const [showBookingsForm, setShowBookingsForm] = useState(false);
    const [showUsersForm, setShowUsersForm] = useState(false);
    const [showTheatersForm, setShowTheatersForm] = useState(false);

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

    return (
        <div className="min-h-screen bg-primary">
            <div className="py-6 mt-10 pl-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="mt-6 text-2xl font-semibold text-white">Admin Instrumentpanel</h1>
                </div>
            </div>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
                    <div className="bg-black overflow-hidden shadow rounded-lg border-2 border-gold">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium text-white">Redigera Filmer</h3>
                            <button
                                className="mb-4 mt-2 md:mt-6 md:mb-6 lg:mt-8 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto"
                                onClick={toggleMoviesForm}
                            >
                                {showMoviesForm ? "Dölj Formulär" : "Visa Formulär"}
                            </button>
                            {showMoviesForm && (
                                <form className=" text-black" action="/api/movies" method="post" encType="multipart/form-data">
                                    <input className="border-2 border-black" type="text" name="title" placeholder="Titel..." />
                                    <input className="border-2 border-black" type="text" name="desc" placeholder="Beskrivning..." />
                                    <input className="border-2 border-black" type="text" name="trailer" placeholder="Trailer..." />
                                    <input className="border-2 border-black" type="text" name="director" placeholder="Direktör..." />
                                    <input className="border-2 border-black" type="text" name="actors" placeholder="Skådespelare..." />
                                    <input className="border-2 border-black" type="text" name="length" placeholder="Längd..." />
                                    <input className="border-2 border-black" type="text" name="genre" placeholder="Genre..." />
                                    <input className="border-2 border-black" type="text" name="speech" placeholder="Språk..." />
                                    <input className="border-2 border-black" type="text" name="subtitles" placeholder="Undertext..." />
                                    <input className="border-2 border-black mb-6" type="number" name="ageRestriction" placeholder="Åldersgräns" />



                                    <label htmlFor="img_poster" className="text-white" >Huvudbild</label>
                                    <input type="file" name="img_poster" id="files" multiple className="text-white" />

                                    <label htmlFor="img-header" className="text-white" >Bakgrundsbild</label>
                                    <input type="file" name="img_header" id="files" multiple className="text-white" />


                                    <button className=" mt-2 md:mt-6 md:mb-6 lg:mt-8 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto" type="submit">Skicka in</button>
                                </form>
                            )}
                        </div>
                    </div>
                    <div className="bg-black overflow-hidden shadow rounded-lg border-2 border-gold">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium text-white">Redigera Bokningar</h3>
                            <button
                                className="mb-4 mt-2 md:mt-6 md:mb-6 lg:mt-8 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto"
                                onClick={toggleBookingsForm}
                            >
                                {showBookingsForm ? "Dölj Formulär" : "Visa Formulär"}
                            </button>
                            {showBookingsForm && (
                                <form className=" text-white">
                                    <input type="text" name="file-name" id="name" />
                                    <input type="file" name="file" id="files" multiple />
                                    <button className=" mt-2 md:mt-6 md:mb-6 lg:mt-8 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto" type="submit">Skicka in</button>
                                </form>
                            )}
                        </div>
                    </div>
                    <div className="bg-black overflow-hidden shadow rounded-lg border-2 border-gold">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium text-white">Redigera Användare</h3>
                            <button
                                className="mb-4 mt-2 md:mt-6 md:mb-6 lg:mt-8 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto"
                                onClick={toggleUsersForm}
                            >
                                {showUsersForm ? "Dölj Formulär" : "Visa Formulär"}
                            </button>
                            {showUsersForm && (
                                <form className=" text-white">
                                    <input type="text" name="file-name" id="name" />
                                    <input type="file" name="file" id="files" multiple />
                                    <button className=" mt-2 md:mt-6 md:mb-6 lg:mt-8 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto" type="submit">Skicka in</button>
                                </form>
                            )}
                        </div>
                    </div>
                    <div className="bg-black overflow-hidden shadow rounded-lg border-2 border-gold mb-8">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium text-white">Redigera Salonger</h3>
                            <button
                                className="mb-4 mt-2 md:mt-6 md:mb-6 lg:mt-8 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto"
                                onClick={toggleTheatersForm}
                            >
                                {showTheatersForm ? "Dölj Formulär" : "Visa Formulär"}
                            </button>
                            {showTheatersForm && (
                                <form className=" text-white">
                                    <input type="text" name="file-name" id="name" />
                                    <input type="file" name="file" id="files" multiple />
                                    <button className=" mt-2 md:mt-6 md:mb-6 lg:mt-8 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto" type="submit">Skicka in</button>
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
