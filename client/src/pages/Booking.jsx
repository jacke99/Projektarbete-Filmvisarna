
import React from "react";
import { killersImage } from "../assets";
import {styles} from "../styles.js"
import { Link } from 'react-router-dom';
import MovieFilterForm from "../components/MovieFilterForm";

export default function Booking() {


  return(
  <div className="bg-primary font-inconsolata">
    <div className="relative">
      <img
        src={killersImage} 
        alt="photo from the movie Killers"
        style={{ width: '100%', maxHeight: 'auto' }}
      />
      <div className={`${styles.centerAbsolutePos} top-1/2 text-gold flex flex-col text-center`}>
      <h1 className={`lg:text-4xl`}>26/9 18:00</h1> <h2 className={`lg:text-4xl`}>Killers of the Flower Moon</h2> 
      <Link to="/movies/:id" className={`underline text-4-xl`}>Se trailer</Link>
      </div>
 </div>
  <MovieFilterForm/>
 
  
  </div>
  )

}
