import { useNavigate, useParams } from "react-router-dom";
import ChooseSeats from "../components/bookMovie/ChooseSeats";
import TicketCounter from "../components/bookMovie/TicketCounter";
import {useStates} from "react-easier"
import { useEffect, useState } from "react";
import { performRequest } from "../service/fetchService";


export default function BookMovie() {
  const navigate = useNavigate();
  const { id } = useParams()
  const [screening, setScreening] = useState(null);
  const [movie, setMovie] = useState(null);
  const [seats, setSeats] = useState([])
  //eslint-disable-next-line
  const counters = useStates("ticketCounter", {
    adult: 2,
    child: 0,
    senior: 0,
    total: 2
  });
  useEffect(() => {
      const eventSource = new EventSource(`/api/screenings/${id}`);
      eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setScreening(data);
    };
    eventSource.onerror = (error) => {
      console.error(error);
      eventSource.close();
    };
  },[id])

  useEffect(() => {
    (async () => {
      if(screening === null) return;
      const data = await performRequest(`/api/movies/${screening.movieID}`, "GET");
      setMovie(data);
    })() 
  }, [screening])

  async function navToBookingP2() {
    const booking = {
      id: screening._id,
      row: seats[0].row,
      seats: seats.map(seat => {
        return {seat: seat.seat}
      }),
      adult: counters.adult,
      child: counters.child,
      senior: counters.senior,
    }
    console.log(booking);
    // const res = await performRequest("/api/booking", "POST", booking);

    navigate("/booking/confirm", {state: {booking: booking, movie: movie, screening: screening}})
  }
  
  return (
    <>    
    {screening && movie && <section className="mt-2 flex flex-col items-center min-h-screen">
        <TicketCounter screening={screening} movie={movie}/>
        <ChooseSeats screening={screening} seats={seats} setSeats={setSeats}/>

        <button className="bg-gold text-black-100 rounded-md px-4 p-1" onClick={navToBookingP2}>Fortsätt</button>
    </section>}
    </>
  );
}
