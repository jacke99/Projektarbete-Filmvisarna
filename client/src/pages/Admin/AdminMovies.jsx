import AdminHeader from "../../components/adminPage/AdminHeader";
import AdminForm from "../../components/adminPage/AdminForm";
import { Link } from "react-router-dom";


export default function AdminMovies() {
    return (
        <div className="mt-20 mx-12">
        <AdminHeader/>
            <AdminForm/>
            <Link to="/admin/movies" className={`text-4-xl underline`}>
            ADMIN MOVIES
            </Link>
        </div>
    );
}

