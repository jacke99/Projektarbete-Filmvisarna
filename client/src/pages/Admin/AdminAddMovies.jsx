
import { useEffect } from "react";
import AddMovieForm from "../../components/adminPage/AddMovieForm";
import AdminNavigation from "../../components/adminPage/AdminNavigation";
import { Link, useNavigate } from "react-router-dom";
import { parseJwt } from "../../service/jwtService";


export default function AdminAddMovies() {
    const navigate = useNavigate()
    useEffect(() => {
        const authToken = sessionStorage.getItem("AuthToken");
        if(!authToken || authToken === "") {
          navigate("/")
        } else if(authToken) {
          const decoded = parseJwt(authToken)
          if(decoded.role !== "ADMIN") {
            navigate("/")
          }
        }
      }, [navigate])
    return (
        <div className="mt-12">
        <AdminNavigation/>
            <AddMovieForm/>
            <Link to="/admin/movies" className={`text-4-xl underline`}>
            ADMIN MOVIES
            </Link>
        </div>
    );
}

