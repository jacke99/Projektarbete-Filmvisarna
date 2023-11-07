import { styles } from "../styles.js";
import { Link,  } from "react-router-dom";
import MovieFilterForm from "../components/ticketPage/MovieFilterForm.jsx";
// import MovieFilterFormVersion2 from "../components/ticketPage/MovieFilterFormVersion2.jsx";
import ScreeningCard from "../components/ScreeningCard.jsx";
import useFetch from "../hooks/useFetch.js";
import { useState } from "react";

export default function Tickets() {
  // const navigate = useNavigate();
  const [query, setQuery]= useState("");

  const [inputValues, setInputValues]= useState({
    age: "",
    date:"",
    movie:"",
    
  })

  //eslint-disable-next-line
  const { data, isPending, error } = useFetch(`/api/filteredscreenings${query?"?":""}${query}`)
  console.log(query)
  console.log(data)

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
    e.preventDefault();
    console.log(inputValues)

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

    setQuery(queryString)
    // navigate(`/booking?${queryString}`);
    setInputValues({
      age:"",
      date:"",
      movie:"",
    })
  }

  return (
    <div className="mt-16 mb-20 bg-primary font-inconsolata">
      <div className="relative">
        {data && data.length > 0 && (
          <>
            <img
              src={`/img/${data[0].movie.img_header}`}
              alt={`photo from the movie ${data[0].movie.title}`}
              className="w-full object-cover object-center lg:h-[550px]"
            />
            <div
              className={`${styles.centerAbsolutePos} top-1/2 flex flex-col text-center text-gold`}
            >
              <h1 className={`lg:text-4xl [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-black`}>{`${data[0].date} ${data[0].time}`}</h1>

              <h2 className={`lg:text-4xl [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-black`}>{`${data[0].movie.title}`}</h2>
              <Link to={`/movies/${data[0].movie._id}`} className={`text-4-xl underline [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-black`}>
                Se trailer
              </Link>
            </div>
          </>
        )}
      </div>
        {data && !isPending && <MovieFilterForm data={data} handleSubmit={handleSubmit}
        inputValues={inputValues} setInputValues={setInputValues} />}
      <ScreeningCard data={data} isPending={isPending} error={error} handleSubmit={handleSubmit} />
      </div>

);
}


    //   {data && !isPending && <MovieFilterFormVersion2 data={data} handleOnChange={handleOnChange}
    //   inputValues={inputValues} setInputValues={setInputValues} />}
    // <ScreeningCard data={data} isPending={isPending} error={error} handleSubmit={handleSubmit} />