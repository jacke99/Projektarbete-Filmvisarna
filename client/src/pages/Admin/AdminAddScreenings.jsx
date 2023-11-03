import AdminNavigation from "../../components/adminPage/AdminNavigation";
import { Link } from "react-router-dom";
import AddScreeningForm from "../../components/adminPage/AddScreeningForm";

export default function AdminAddScreenings(){
    return(
        <div className="mt-20">
        <AdminNavigation/>
            <AddScreeningForm/>
            <Link to="/admin/movies" className={`text-4-xl underline`}>
            ADMIN screenings
            </Link>
        </div>
    )

}