import { Link, useLocation } from "react-router-dom";
import {useState, useEffect} from "react"

export default function AdminNavigation() {
  const [active, setActive] = useState("");
  let location = useLocation()

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    setActive(pathParts[2])
  },[location])
    return (
        <ul className="absolute flex flex-col gap-2 bg-gradient-to-r from-primary to-footerGrey rounded-xl h-[50%] w-40 px-2 py-2">
          <h2 className="text-white text-center">Meny</h2>
          <li className="">
            <Link to="/admin/movies" className={`${
                active === "movies" ? "text-white" : "text-gold"
              } cursor-pointer hover:text-white`}>
               Filmer
            </Link>
          </li>
          <li className="">
            <Link to="/admin/users" className={`${
                active === "users" ? "text-white" : "text-gold"
              } cursor-pointer hover:text-white`}>
               Användare
            </Link>
          </li>
          <li className="">
             <Link to="/admin/bookings" className={`${
                active === "bookings" ? "text-white" : "text-gold"
              } cursor-pointer hover:text-white`}>
               Bokningar
            </Link>
          </li>
        </ul>
     );
}