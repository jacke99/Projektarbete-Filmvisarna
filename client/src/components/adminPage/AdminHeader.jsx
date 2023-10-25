import { Link } from "react-router-dom";

export default function AdminHeader() {


    return (
      <div className="mt-20">
        <nav>
        <ul className="flex justify-center">
          <li className="mr-6">
            <Link to="/admin/movies" className={`cursor-pointer text-blue-500 hover:text-blue-800`}>
               Filmer
            </Link>
          </li>
          <li className="mr-6">
            <Link to="/admin/users" className={`cursor-pointer text-blue-500 hover:text-blue-800`}>
               Användare
            </Link>
          </li>
          <li className="mr-6">
             <Link to="/admin/bookings" className={`cursor-pointer text-blue-500 hover:text-blue-800`}>
               Bokningar
            </Link>
          </li>
        </ul>
        </nav>
        </div>
    );
}