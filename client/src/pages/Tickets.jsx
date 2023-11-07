import { styles } from "../styles.js";
import { Link } from "react-router-dom";
import MovieFilterForm from "../components/ticketPage/MovieFilterForm.jsx";
// import MovieFilterFormVersion2 from "../components/ticketPage/MovieFilterFormVersion2.jsx";
import ScreeningCard from "../components/ScreeningCard.jsx";
import useFetch from "../hooks/useFetch.js";
import { useEffect, useState } from "react";

export default function Tickets() {
  const [query, setQuery]= useState("");
  const [headerData, setHeaderData] = useState(null);
  const [inputValues, setInputValues]= useState({
    age: "",
    date:"",
    movie:"",
  })
  
  
  const { data, isPending, error } = useFetch(`/api/filteredscreenings${query?"?":""}${query}`);

  useEffect(() => {
    (async () => {
      const data = await fetch("/api/filteredscreenings");
      const json = await data.json();
      setHeaderData(json[0]);
    })();
  }, [])
  
  useEffect(() => {
    if(inputValues.age === "" && inputValues.date === "" && inputValues.movie === "") {
      handleSubmit()
    }
    //eslint-disable-next-line
  }, [inputValues])

  // const handleOnChange = (e) => {
  //   e.preventDefault()
  //   const { name, value } = e.target;
    
  //   console.log("Input förändring:", name, value);
  //   setInputValues((prevInputValues) => ({
  //     ...prevInputValues,
  //     [name]: value,
  //   }));
  
  //   // Skapa en ny söksträng med de aktuella värdena.
  //   const queryParams = new URLSearchParams({
  //     age: inputValues.age,
  //     date: inputValues.date,
  //     movie: inputValues.movie,
  //   }).toString();
    
  //   // Uppdatera söksträngen genom att anropa setQuery.
  //   setQuery(queryParams);
  // };
  function handleSubmit(e) {
    if(e) {
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
    <div className="mb-20 bg-primary font-inconsolata">
      <div className="relative">
        {headerData && (
          <>
            <img
              src={`/img/${headerData.movie.img_header}`}
              alt={`photo from the movie ${headerData.movie.title}`}
              className="w-full object-cover object-center lg:h-[550px]"
            />
            <div
              className={`${styles.centerAbsolutePos} top-1/2 flex flex-col text-center text-gold`}
            >
              <h1 className={`lg:text-4xl [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-black`}>{`${headerData.date} ${headerData.time}`}</h1>

              <h2 className={`lg:text-4xl [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-black`}>{`${headerData.movie.title}`}</h2>
              <Link to={`/movies/${headerData.movie._id}`} className={`text-4-xl underline [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-black`}>
                Se trailer
              </Link>
            </div>
          </>
        )}
      </div>
        {data && !isPending && <MovieFilterForm data={data} handleSubmit={handleSubmit}
        inputValues={inputValues} setInputValues={setInputValues} />}
        <ScreeningCard data={data} isPending={isPending} setInputValues={setInputValues} error={error} handleSubmit={handleSubmit} />
      </div>

);
}


    //   {data && !isPending && <MovieFilterFormVersion2 data={data} handleOnChange={handleOnChange}
    //   inputValues={inputValues} setInputValues={setInputValues} />}
    // <ScreeningCard data={data} isPending={isPending} error={error} handleSubmit={handleSubmit} />