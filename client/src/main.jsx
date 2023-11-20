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
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/bokning", element: <Tickets /> },
      { path: "/bokning/:id", element: <BookMovie /> },
      { path: "/bokning/bekraftelse", element: <BookingTickets /> },
      { path: "/filmer", element: <Movies /> },
      { path: "/registrera", element: <Register /> },
      { path: "/filmer/:id", element: <MovieDetails /> },
      { path: "/minasidor", element: <MyPages />},
      {
        path: "/admin",
        element: <Admin />,
        children: [
          { path: "filmer", element: <AdminAddMovies /> },
          { path: "bokningar", element: <AdminBookings /> },
          { path: "anvandare", element: <AdminUsers /> },
          { path: "visningar", element: <AdminAddScreenings /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
