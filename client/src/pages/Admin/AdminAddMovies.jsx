
import AddMovieForm from "../../components/adminPage/AddMovieForm";
import AdminNavigation from "../../components/adminPage/AdminNavigation";
import { Link } from "react-router-dom";


export default function AdminAddMovies() {
    return (
        <div className="mt-20">
        <AdminNavigation/>
            <AddMovieForm/>
            <Link to="/admin/movies" className={`text-4-xl underline`}>
            ADMIN MOVIES
            </Link>
        </div>
    );
}

