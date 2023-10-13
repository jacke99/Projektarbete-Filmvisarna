import React, { useState } from "react";

function Admin() {
    const [showMoviesForm, setShowMoviesForm] = useState(false);

    const toggleMoviesForm = () => {
        setShowMoviesForm(!showMoviesForm);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
                </div>
            </div>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium text-gray-900">Bookings</h3>
                            {/* Add your content for Bookings here */}
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium text-gray-900">Users</h3>
                            {/* Add your content for Users here */}
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium text-gray-900">Screenings</h3>
                            {/* Add your content for Screenings here */}
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium text-gray-900">Movies</h3>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={toggleMoviesForm}
                            >
                                {showMoviesForm ? "Hide Form" : "Show Form"}
                            </button>
                            {showMoviesForm && (
                                <form>
                                    <input type="text" name="file-name" id="name" />
                                    <input type="file" name="file" id="files" multiple />
                                    <button type="submit">Submit</button>
                                </form>
                            )}
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium text-gray-900">Theaters</h3>
                            {/* Add your content for Theaters here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
