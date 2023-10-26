
import BookMovieHero from "../components/BookMovieHero.jsx";
import { styles } from "../styles.js";
import { useParams } from 'react-router-dom';
import useFetch from "../hooks/useFetch.js";
import { useEffect, useState } from "react";
import { performRequest } from "../service/fetchService.js";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie]= useState("")
  const { data, isPending, error } = useFetch(`/api/movies/${id}`)
  console.log(data)

 useEffect(()=>{
  (async ()=>{
    if(data){
    const resp = await performRequest(`/api/filteredscreenings?movie=${data.title}`, "GET")
    setMovie(resp)}
  })()
 },[data])

  function handleClickScroll() {
    const element = document.getElementById("scrollTo");
    console.log(element);
    if(element) {
      element.scrollIntoView({behavior: "smooth"})
    }
  }
  return (
    <>
    {data &&(
    <div className=" mt-10 mb-20 h-full bg-primary">
      <div className="relative h-96 md:h-[30rem] lg:h-[36rem] ">
        <img
          src={`/img/${data.img_header}`}
          alt="movie poster"
          className=" h-full min-w-full object-cover"
        /> 
        <img
          src={`/img/${data.img_poster}`}
          alt="movie poster"
          className="  absolute bottom-28 left-5 block h-44 sm:hidden "
        />
        <div
          className={`absolute bottom-7 left-5 p-1 lg:left-24 text-shadow`} >
          <p className={`${styles.trailerTitle} `}>{data.title}</p>
          <p className={`${styles.trailerSubTitle} `}>{data.genre}</p>
          <p className={`${styles.trailerSubTitle} bold font-inconsolata`}>
            {data.length} | {data.ageRestriction} 
          </p>
        </div>
      </div>
      <div className="relative m-auto flex flex-col p-8 sm:p-12 lg:pb-8">
        <p className={` mb-4 text-white sm:text-xl md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
        {data.description}
        </p>
        <button onClick={handleClickScroll} className="mb-4 mt-2 md:mt-6 md:mb-6 lg:mt-8 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto">
          Biljetter
        </button>
        <div className={`${styles.movieDescInfo} md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
          <span>Regi:</span>
          <span>{data.director}</span>
        </div>
        <div className={`${styles.movieDescInfo} md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
          <span>Skådespelare:</span>
          <span>{data.actors}</span>
        </div>
        <div className={`${styles.movieDescInfo} md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
          <span>Originaltitel:</span>
          <span>{data.title}</span>
        </div>
        <div className={`${styles.movieDescInfo} md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
          <span>Längd:</span>
          <span>{data.length}</span>
        </div>
        <div className={`${styles.movieDescInfo} md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
          <span>Originalspråk</span>
          <span>{data.speech}</span>
        </div>
        <div className={`${styles.movieDescInfo} md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
          <span>Åldersgräns:</span>
          <span>{data.ageRestriction}</span>
        </div>

        <img
          src={`/img/${data.img_poster}`}
          alt="movie poster"
          className=" absolute top-[22rem] right-[6rem] hidden h-56 sm:block lg:h-72 lg:top[22rem] lg:right-[19rem]"
        />
        <p id="scrollTo"></p>
     
            
      </div>
      <BookMovieHero data={movie} />
    </div>
   
    
    )}
    </>
    )
  }
  
 