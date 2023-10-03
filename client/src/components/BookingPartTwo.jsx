import { killersPoster } from "../assets";
import { NavLink } from "react-router-dom";
import { styles } from "../styles";


export default function BookingPartTwo(){
    return(
        <div className=" mt-40 px-6 flex flex-col">
             <NavLink to="/booking" className="text-white-100 font-inconsolata underline mb-6"> Tillbaka</NavLink>
            <h1 className="text-white-100 text-xl mb-8">The Creator | Sön 24 sep</h1>
            
            <div className="mb-10 max-w-full flex items-end justify-start md:justify-start lg:justify-start">
      <img
        src={killersPoster}
        alt="movie poster from Killers of the flower moon"
        className="w-34 h-48 rounded-lg"
      />
      <div className="text-white-100 ml-4 flex flex-col lg:px-6 md:px-6">
        <p className="text-xs">Idag 25/9</p>
        <h2 className="text-base font-extra-bold">The Creator</h2>
        <p className="font-inconsolata text-xs">Sifi, drama</p>
        <p className="text-xs">1 tim 33min | 11 år</p>
      </div>
      
    </div>
    <div className="text-white-100 text-sm mb-10">
    <h2 className="font-inconsolata">Salong 3</h2>
    <p className="font-inconsolata">Imorgon, Söndag 25/9</p>
    <p className="font-inconsolata">kl 20:00</p>
    <p className="font-inconsolata">2 x Ordinarie/Vuxna</p>
    </div>
      
    <div className="text-white-100 mb-10">
        <p>Totalt att betala: 298.00 SEK</p>
    </div>
    <button className={`${styles.buttonStyle} mb-10 md:max-w-xs`}>Boka</button>

    </div>
    )
}

 {/*  <div className="flex">   
        <img
        src={killersPoster}
        alt="movie poster from Killers of the flower moon"
        className="w-34 h-48 rounded-lg"
      />
      <div className="text-white-100 flex flex-col lg:px-6 md:px-6">
   
        <h2 className="text-base font-extra-bold">The Creator</h2>
        <p className="font-inconsolata text-xs">Sifi, drama</p>
        <p className="text-xs">1 tim 33min | 11 år</p>
      </div>
      </div>

    <div className="text-white-100 text-xs">
    <h2 className="font-inconsolata">Salong 3</h2>
    <p className="font-inconsolata">Imorgon, Söndag 25/9</p>
    <p className="font-inconsolata">kl 20:00</p>
    <p className="font-inconsolata">2 x Ordinarie/Vuxna</p>
    </div>
    */}