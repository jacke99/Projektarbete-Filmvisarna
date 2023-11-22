import { styles } from "../styles.js";
import { Link } from "react-router-dom";
import MovieFilterForm from "../components/ticketPage/MovieFilterForm.jsx";
import ScreeningCard from "../components/ScreeningCard.jsx";
import newDateFormat from "../service/newDateFormat.js";

import { useEffect, useState } from "react";

export default function Tickets() {
  const [query, setQuery] = useState("");
  const [headerData, setHeaderData] = useState(null);
  const [inputValues, setInputValues] = useState({
    age: "",
    date: "",
    movie: "",
  });

  useEffect(() => {
    (async () => {
      const data = await fetch("/api/filteredscreenings");
      const json = await data.json();
      setHeaderData(json[0]);
    })();
  }, []);

  useEffect(() => {
    if (
      inputValues.age === "" &&
      inputValues.date === "" &&
      inputValues.movie === ""
    ) {
      handleSubmit();
    }
    //eslint-disable-next-line
  }, [inputValues]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValues.age || inputValues.date || inputValues.movie) {
        const queryParams = {};
        if (inputValues.age) {
          queryParams.age = inputValues.age;
        }
        if (inputValues.date) {
          queryParams.date = inputValues.date;
        }
        if (inputValues.movie) {
          queryParams.movie = inputValues.movie;
        }
        const queryString = new URLSearchParams(queryParams).toString();

        setQuery(queryString);
        window.history.replaceState(null, null, `?${queryString}`);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [inputValues]);

  function handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }

    const queryParams = {};
    if (inputValues.age) {
      queryParams.age = inputValues.age;
    }
    if (inputValues.date) {
      queryParams.date = inputValues.date;
    }
    if (inputValues.movie) {
      queryParams.movie = inputValues.movie;
    }
    const queryString = new URLSearchParams(queryParams).toString();

    setQuery(queryString);
    window.history.replaceState(null, null, `?${queryString}`);
  }

  return (
    headerData && (
      <div className="mb-20 bg-primary font-inconsolata">
        <section
          className={`relative flex items-center justify-center bg-primary text-center`}
        >
          <img
            className={`${styles.imgHeader}`}
            src={`/img/${headerData.movie.img_header}`}
            alt="Img with from movie"
          />
          <div className="translate-50-50 absolute left-1/2 top-1/2">
            <h2 className={`${styles.heroHeader}`}>
              {newDateFormat(headerData.date)} {headerData.time}
            </h2>
            <h2
              className={`${styles.heroSubHeader} shadow-black [text-shadow:1px_1px_2px_var(--tw-shadow-color)]`}
            >
              {headerData.movie.title}{" "}
            </h2>
            <Link to={`/filmer/${headerData.movie._id}`}>
              <p className={`${styles.heroSubText}`}>Mer info {">"}</p>
            </Link>
          </div>
        </section>

        <h1
          className={` ${styles.wrapper} ${styles.paddingTop} ${styles.headerText} text-center`}
        >
          Biljetter till föreställningar
        </h1>

        <MovieFilterForm
          inputValues={inputValues}
          setInputValues={setInputValues}
        />
        <ScreeningCard setInputValues={setInputValues} query={query} />
      </div>
    )
  );
}
