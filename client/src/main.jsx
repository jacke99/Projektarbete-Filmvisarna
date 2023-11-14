import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Tickets from "./pages/Tickets";
import BookMovie from "./pages/booking/BookMovie";
import Movies from "./pages/Movies";
import Register from "./pages/Register";
import MovieDetails from "./pages/MovieDetails";
import BookingTickets from "./pages/booking/BookingTickets";
import Admin from "./pages/Admin/Admin";
import AdminAddMovies from "./pages/Admin/AdminAddMovies";
import AdminBookings from "./pages/Admin/AdminBookings";
import AdminUsers from "./pages/Admin/AdminUsers";
import "./index.css";
import MyPages from "./pages/MyPages";
import AdminAddScreenings from "./pages/Admin/AdminAddScreenings";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App className="wrapper"/>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/booking", element: <Tickets /> },
      { path: "/booking/:id", element: <BookMovie /> },
      { path: "/booking/confirm", element: <BookingTickets /> },
      { path: "/movies", element: <Movies /> },
      { path: "/register", element: <Register /> },
      { path: "/movies/:id", element: <MovieDetails /> },
      { path: "/mypages", element: <MyPages />},
      {
        path: "/admin",
        element: <Admin />,
        children: [
          { path: "movies", element: <AdminAddMovies /> },
          { path: "bookings", element: <AdminBookings /> },
          { path: "users", element: <AdminUsers /> },
          { path: "screenings", element: <AdminAddScreenings /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
