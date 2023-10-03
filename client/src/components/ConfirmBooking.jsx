import { useState } from "react";
import { projector } from "../assets";
import { styles } from "../styles";

export default function ConfirmBooking() {
  const [bookingConfirmed, setBookingConfirmed] = useState(true);

  const handleCloseConfirmation = () => {
    setBookingConfirmed(false);
  };

  return (

<div className="w-3/4 md:w-5/12 lg:w-96 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gold z-50 shadow-md text-center rounded-md">
  {bookingConfirmed && (
    <div className="w-full flex flex-col h-full relative">
      <img
        src={projector}
        alt="photo of popcorn"
        className="w-full h-60 rounded-t-lg md:h-60"
      />
      <h1 className={`${styles.centerAbsolutePos} top-1/4  text-white-100 text-3xl font-bold`}>
        Tack för din bokning!
      </h1>
      <div className="flex-grow p-5 flex flex-col justify-between">
        <p className="font-xs font-inconsolata">Bokningsnummer: <span>X2354</span> </p>
        <p className="font-xs font-inconsolata">Film: <span>Past lives</span></p>
        <p className="font-xs font-inconsolata">Biljetter: <span> 1 Vuxen, 3 Barn</span></p>
        <p className="font-xs font-inconsolata">Plats: <span> Rad 4, stol 17,18,19,20</span></p>
        <p className="font-xs font-inconsolata">datum: <span> 2024-03-22</span></p>
        <p className="font-xs font-inconsolata">Epost: <span>dinmail@mail.com</span></p>
        <p className="font-xs font-inconsolata">Tel: <span>0763399987</span></p>
        <p className="font-xs font-inconsolata">Pris: <span>670 SEK</span></p>
        <button onClick={handleCloseConfirmation} className='booking-btn mt-4 text-white-100 py-1 px-2.5 rounded bg-black-100 md:w-1/2 mx-auto'>
          Stäng
        </button>
      </div>
    </div>
  )}
</div>


  );
}

{/*     <div className="w-3/4 md:w-5/12 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gold z-50 shadow-md text-center rounded-md">
  {bookingConfirmed && (
    <div className="w-full flex flex-col h-full relative">
      <img
        src={projector}
        alt="photo of popcorn"
        className="w-full rounded-t-lg md:h-60"
      />
      <h1 className={`${styles.centerAbsolutePos} top-1/4 text-white-100 text-3xl font-bold`}>
        Tack för din bokning!
      </h1>
      <div className="flex-grow p-5 flex flex-col justify-between">
        <p>Bokningsnummer: X2354</p>
        <p>Film: Past lives</p>
        <p>Biljetter: 1 Vuxen, 3 Barn</p>
        <p>Plats: Rad 4, stol 17,18,19,20</p>
        <p>datum: 2024-03-22</p>
        <p>Epost: dinmail@mail.com</p>
        <p>Tel: 07633XXXXX</p>
        Pris: 670 SEK
        <button onClick={handleCloseConfirmation} className='booking-btn mt-4 text-white-100 py-1 px-2.5 rounded-sm bg-black-100 md:w-1/2'>
          Stäng
        </button>
      </div>
    </div>
  )}
</div>   */}