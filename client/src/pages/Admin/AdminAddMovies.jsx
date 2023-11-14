
import { useEffect } from "react";
import AddMovieForm from "../../components/adminPage/AddMovieForm";
import { useNavigate } from "react-router-dom";
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

      //kommentar
    return (
        <div className="mt-12">
            <AddMovieForm/>
        </div>
    );
}

