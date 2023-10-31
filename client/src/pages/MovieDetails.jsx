import BookMovieHero from "../components/BookMovieHero.jsx";
import { styles } from "../styles.js";
import { useParams, Link } from 'react-router-dom';
import useFetch from "../hooks/useFetch.js";
import YouTube from 'react-youtube';
import { useEffect, useState } from "react";
import { performRequest } from "../service/fetchService.js";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie]= useState("")
  //eslint-disable-next-line
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


  // Options för att ändra storlek på videon
  const opts = {
    height: '400',
    width: '1000',
   
  };

  return (
    <>
    {data &&(
     
     
      
    <div className="  mb-20 h-full bg-primary  w-1/10  " >
      <div className="md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto w-1/10  ">
          <YouTube
        videoId={data.trailer} opts={opts} className="trailer-container  flex  md:mt-20 sm:mt-8  md:w-full md:h-[60%] lg:w-full xl:full sx:w-1/5 xl:w-[110%]"  // Use the YouTube video ID from your data
      /></div>
      
      

        
      {/* // impelemterar en embedded youtubevideo med react-youtube */}
    
        
       {/* Alternativ 1 = kopierar hela "bädda in" från dela på youtube
      <div className="trailer-container flex items-center justify-center mt-24  md:w-full lg:w-full">
        <div dangerouslySetInnerHTML={{ __html: data.trailer }} />
      </div> */}
      
        {/* <img
          src={`/img/${data.img_poster}`}
          alt="movie poster"
          className="  bottom-28 left-5 block h-44 sm:hidden "
        /> */}
      
      
      <div className=" m-auto flex flex-col p-8 sm:p-12 lg:pb-8">
      <div
          className={` text-shadow flex flex-col pb-8 sm:text-xl md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`} >
          <p className={`${styles.trailerTitle} `}>{data.title}</p>
          <p className={`${styles.trailerSubTitle} `}>{data.genre}</p>
          <p className={`${styles.trailerSubTitle} bold font-inconsolata`}>
            {data.length} | {data.ageRestriction} 
          </p>
        </div>
        <div className="movie-poster pb-8 sm:text-xl md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto" >
        <img
          src={`/img/${data.img_header}`}
          alt="movie poster"
          className="w-340 h-48 rounded-lg ]"
        />
        </div>
        
        <p className={` mb-4 text-white sm:text-xl md:w-5/6 lg:mt-14 lg:mb-10 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto`}>
        {data.description}
        </p>
        <button onClick={handleClickScroll} className="mb-4 mt-10 lg:hidden  md:mt-10 md:mb-6 lg:mt-20 lg:mb-8 rounded-xl bg-gold px-4 py-2 text-xl text-black sm:px-5 sm:text-2xl mx-auto">
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

        <div className="text-white text-[25px] sm:text-[25px] md:text-[30px] lg:text-[35px]  md:mt-32 lg:mt-32 mt-20 md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto ">
          <h2>Aktuell visningar </h2>
        </div>
        {movie.length > 0 ? (
          <div className="md:w-5/6 lg:w-2/3 xl:w-3/5 2xl:w-3/6 md:m-auto">
  <BookMovieHero data={movie}/>
  </div>
) : (
  <div className="p-4 text-center">
  <p className="text-white-100">Tyvärr finns inga visningar tillgängliga just nu
  för {`${data.title}`}</p>
  <Link to={"/booking"} className={`text-4-xl underline text-white-100`}>
            Andra filmer som visas
          </Link>
  </div>
)}
      
        <p id="scrollTo"></p>
     
            
      </div>
 

    </div>
   
    
    )}
    </>
    )
  }
  
 