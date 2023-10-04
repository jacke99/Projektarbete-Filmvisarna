import { useNavigate } from "react-router-dom";
import { killersPoster, pastLivesPoster,smsPoster } from "../assets";
export default function BookMovieHero(){
  const navigate = useNavigate();
    return(
<>
<div className="max-w-full p-4 flex items-center justify-between md:justify-start lg:justify-start md:px-20 lg:px-96">
      <img
        src={pastLivesPoster}
        alt="movie poster from Killers of the flower moon"
        className="w-34 h-48 rounded-lg"
      />
      <div className="text-white-100 flex flex-col lg:px-6 md:px-6">
        <p className="text-xs">Idag 25/9</p>
        <h2 className="text-base font-extra-bold">The Creator</h2>
        <p className="font-inconsolata text-xs">Sifi, drama</p>
        <p className="text-xs">1 tim 33min | 11 år</p>
      </div>
      <button className="bg-gold text-black-100 rounded-md px-4 p-1 md:ml-auto lg:ml-auto"
        onClick={() => {
          navigate("/booking/1")
          window.scrollTo(0, 0)}}
      >Boka</button>
    </div>

      <div className="flex max-w-full items-center justify-between p-4 md:justify-start md:px-20 lg:justify-start lg:px-96">
        <img
          src={killersPoster}
          alt="movie poster from Killers of the flower moon"
          className="w-34 h-48 rounded-lg"
        />
        <div className="flex flex-col text-white-100 md:px-6 lg:px-6">
          <p className="text-xs">Idag 25/9</p>
          <h2 className="font-extra-bold text-base">The Creator</h2>
          <p className="font-inconsolata text-xs">Sifi, drama</p>
          <p className="text-xs">1 tim 33min | 11 år</p>
        </div>
        <button className="bg-gold text-black-100 rounded-md px-4 p-1 md:ml-auto lg:ml-auto"
        onClick={() => {
          navigate("/booking/1")
          window.scrollTo(0, 0)}}
      >Boka</button>
      </div>
      
    

      <div className="flex max-w-full items-center justify-between p-4 md:justify-start md:px-20 lg:justify-start lg:px-96">
        <img
          src={smsPoster}
          alt="movie poster from Killers of the flower moon"
          className="w-34 h-48 rounded-lg"
        />
        <div className="flex flex-col text-white-100 md:px-6 lg:px-6">
          <p className="text-xs">Idag 25/9</p>
          <h2 className="font-extra-bold text-base">The Creator</h2>
          <p className="font-inconsolata text-xs">Sifi, drama</p>
          <p className="text-xs">1 tim 33min | 11 år</p>
        </div>
        <button className="bg-gold text-black-100 rounded-md px-4 p-1 md:ml-auto lg:ml-auto"
            onClick={() => {
              navigate("/booking/1")
              window.scrollTo(0, 0)}}
          >Boka
        </button>
      </div>
      
</>
)
}
