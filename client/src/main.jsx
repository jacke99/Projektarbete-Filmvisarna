import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import BookMovie from "./pages/BookMovie";
import Movies from "./pages/Movies";
import Register from "./pages/Register";
import MovieDetails from "./pages/MovieDetails";
import BookingPartTwo from "./components/BookingPartTwo";
import Admin from "./pages/Admin";
import "./index.css";
import MyPages from "./pages/MyPages";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/booking", element: <Booking /> },
      { path: "/booking/:id", element: <BookMovie /> },
      { path: "/booking/confirm", element: <BookingPartTwo /> },
      { path: "/movies", element: <Movies /> },
      { path: "/register", element: <Register /> },
      { path: "/movies/:id", element: <MovieDetails /> },
      { path: "/mypages", element: <MyPages />},
      { path: "/admin", element: <Admin /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
