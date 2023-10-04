import { killersPoster } from "../assets";
import { NavLink } from "react-router-dom";
import ConfirmBooking from "./ConfirmBooking";
import BookingTicketsForm from "./BookingTicketsForm"
import { useStates } from "react-easier"




export default function BookingPartTwo(){
    const toggleConfirmation = useStates("toggleConfirmation", {
      toggle: false,
    })
  
    return(
        <>
        <div className="lg:px-96 mt-40 px-6 flex flex-col md:items-center">
             <NavLink to="/booking" className="text-white-100 font-inconsolata underline mb-6"> Tillbaka</NavLink>
            <h1 className="text-white-100 text-xl mb-8 lg:text-4xl">The Creator | Sön 24 sep</h1>
            
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
    <BookingTicketsForm />
    <button onClick={() => toggleConfirmation.toggle = true} className={`bg-gold w-36 text-black px-6 py-2 rounded m-auto mb-10`}>Boka</button>
    </div>
    {toggleConfirmation.toggle &&(
        <ConfirmBooking />
    )}

   
    </>
    )
}
