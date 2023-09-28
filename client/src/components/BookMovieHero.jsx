import React from "react";
import {styles} from "../styles.js";
import { killersPoster } from "../assets";
export default function BookMovieHero(){
    return(

<div className="max-w-full p-4 flex items-center justify-between">
      <img
        src={killersPoster}
        alt="movie poster from Killers of the flower moon"
        className="w-34 h-48 rounded-lg"
      />
      <div className="text-white-100 flex flex-col">
        <p className="text-xs">Idag 25/9</p>
        <h2 className="text-base font-extra-bold">The Creator</h2>
        <p className="font-inconsolata text-xs">Sifi, drama</p>
        <p className="text-xs">1 tim 33min | 11 år</p>
      </div>
      <button className="bg-gold text-black-100 rounded-md px-4 p-1">Boka</button>
    </div>

)
}
        
  