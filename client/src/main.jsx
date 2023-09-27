import * as ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Movies from "./pages/Movies";
import Register from "./pages/Register";
import MovieDetails from "./pages/MovieDetails";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/booking", element: <Booking /> },
      { path: "/movies", element: <Movies /> },
      { path: "/register", element: <Register /> },
      { path: "/movies/:id", element: <MovieDetails /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
