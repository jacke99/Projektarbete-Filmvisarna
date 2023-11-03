
import { useEffect } from "react";
import AdminNavigation from "../../components/adminPage/AdminNavigation";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../../service/jwtService";
function Admin() {
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
        <div className="mt-12 h-screen">
          <AdminNavigation/>
          <h1 className="text-2xl font-semibold text-white text-center">ADMIN STARTSIDA</h1>
        </div>
    );
}

export default Admin;
