import { killersPoster } from "../assets";
import { NavLink } from "react-router-dom";
import { styles } from "../styles";

export default function BookingPartTwo(){
    return(
        <div className="mt-40 px-6">
             <NavLink to="/din-lank" className="text-white-100 font-inconsolata underline"> Tillbaka</NavLink>
            <h1 className="text-white-100 text-xl">The Creator | Sön 24 sep</h1>
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

    <div className="text-white-100 text-xs">
    <h2 className="font-inconsolata">Salong 3</h2>
    <p className="font-inconsolata">Imorgon, Söndag 25/9</p>
    <p className="font-inconsolata">kl 20:00</p>
    <p className="font-inconsolata">2 x Ordinarie/Vuxna</p>
    </div>

    <div>
        <p>Totalt att betala: 298.00 SEK</p>
    </div>
    <button className={`${styles.buttonStyle}`}>Boka</button>

        </div>
    )
}