import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Tickets from "./pages/Tickets";
import BookMovie from "./pages/BookMovie";
import Movies from "./pages/Movies";
import Register from "./pages/Register";
import MovieDetails from "./pages/MovieDetails";
import BookingPartTwo from "./components/bookMovie/BookingPartTwo";
import Admin from "./pages/Admin/Admin";
import AdminMovies from "./pages/Admin/AdminMovies";
import AdminBookings from "./pages/Admin/AdminBookings";
import AdminUsers from "./pages/Admin/AdminUsers";
import "./index.css";
import MyPages from "./pages/MyPages";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/booking", element: <Tickets /> },
      { path: "/booking/:id", element: <BookMovie /> },
      { path: "/booking/confirm", element: <BookingPartTwo /> },
      { path: "/movies", element: <Movies /> },
      { path: "/register", element: <Register /> },
      { path: "/movies/:id", element: <MovieDetails /> },
      { path: "/mypages", element: <MyPages />},
      { path: "/admin", element: <Admin /> },
      { path: "/admin/movies", element: <AdminMovies/> },
      { path: "/admin/bookings", element: <AdminBookings/> },
      { path: "/admin/users", element: <AdminUsers/> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
