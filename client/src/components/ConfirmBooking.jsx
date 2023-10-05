import { useNavigate } from "react-router-dom";


//eslint-disable-next-line
export default function ConfirmBooking() {
  const navigate = useNavigate()
  return (
    <>
<div className="bg-white-100 w-3/4 md:w-5/12 lg:w-96 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 rounded-md">
  
  <div className="text-center mt-4 w-full h-full">
  
    <h1 className={` top-1/4 text-xl font-bold`}>
      Tack för din bokning!
    </h1>
    <div className="flex-grow p-5 flex flex-col items-start justify-between">
      <p className="text-left mb-2">Bokningsbekräftelse har nu skickats till din email!</p>
      <p>Bokningsnummer: <span>X2354</span> </p>
      <p>Film: <span>Past lives</span></p>
      <p>Biljetter: <span> 1 Vuxen, 3 Barn</span></p>
      <p>Plats: <span> Rad 4, stol 17,18,19,20</span></p>
      <p>datum: <span> 2024-03-22</span></p>
      <p>Epost: <span>dinmail@mail.com</span></p>
      <p>Tel: <span>0763399987</span></p>
      <p>Pris: <span>670 SEK</span></p>
     
    </div>
    <button onClick={() => navigate("/")} className='bg-gold text-black-100 rounded-md px-4 p-1 mb-4'>
        Stäng
      </button>
  </div>

 </div>

</>

  );
}

{/*<div className="w-3/4 md:w-5/12 lg:w-96 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary z-50 shadow-md text-center rounded-md">
  
    <div className="w-full flex flex-col h-full relative">
      <img
        src={projector}
        alt="photo of old projector"
        className="w-full h-60 rounded-t-lg md:h-60"
      />
      <h1 className={`${styles.centerAbsolutePos} top-1/4  text-white-100 text-3xl font-bold`}>
        Tack för din bokning!
      </h1>
      <div className="flex-grow p-5 flex flex-col justify-between text-white-100">
        <p>Bokningsbekräftelse har nu skickats till din email</p>
        <p className="font-bold">Bokningsnummer: <span>X2354</span> </p>
        <p className="font-xs">Film: <span>Past lives</span></p>
        <p className="font-xs">Biljetter: <span> 1 Vuxen, 3 Barn</span></p>
        <p className="font-xs">Plats: <span> Rad 4, stol 17,18,19,20</span></p>
        <p className="font-xs">datum: <span> 2024-03-22</span></p>
        <p className="font-xs">Epost: <span>dinmail@mail.com</span></p>
        <p className="font-xs">Tel: <span>0763399987</span></p>
        <p className="font-xs">Pris: <span>670 SEK</span></p>
        <button onClick={() => navigate("/")} className='booking-btn mt-4 py-1 pz-0.5 text-black rounded bg-gold md:w-1/2 mx-auto'>
          Stäng
        </button>
      </div>
    </div>
  
</div>*/}