import React from "react";
import {styles} from "../styles.js";
import { killersPoster } from "../assets";
export default function BookMovieHero(){
    return(
        <div>
    <img
        src={killersPoster} 
        alt="movie poster from Killers of the flower moon"
        className={`${styles.moviePosterImg}`}
      />
        <div className="text-white-100">
        <h2>The Creator</h2>
        <p>Sifi, drama</p>
        <p>1 tim 33min | 11 år</p>
        <p>Idag 25/9</p>
    </div>
    <button className="bg-gold">Boka</button>
        </div>
    )
}