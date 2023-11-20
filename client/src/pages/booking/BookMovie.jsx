import { useNavigate, useParams } from "react-router-dom";
import ChooseSeats from "../../components/bookMovie/ChooseSeats";
import TicketCounter from "../../components/bookMovie/TicketCounter";
import {useStates} from "react-easier"
import { useEffect, useState } from "react";
import { performRequest } from "../../service/fetchService";


export default function BookMovie() {
  const navigate = useNavigate();
  const { id } = useParams()
  const [screening, setScreening] = useState(null);
  const [movie, setMovie] = useState(null);
  const [seats, setSeats] = useState([])
  const s = useStates("toggleSeparateSeats")
  //eslint-disable-next-line
  const counters = useStates("ticketCounter", {
    adult: 2,
    child: 0,
    senior: 0,
    total: 2
  });
  useEffect(() => {
      let screeningId = ""
      const eventSource = new EventSource(`/api/screenings/${id}`);
      eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if(screeningId === "") {
        screeningId = data._id
        setScreening(data);
      } else if (screeningId === data._id) {
        setScreening(data)
      }
      
    };
    eventSource.onerror = (error) => {
      console.error(error);
      eventSource.close();
    };
    return () => {
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
      rows: s.toggle ? seats.map(seat => {
        return {row: seat.row}
      }) : [{row: seats[0].row}],
      seats: seats.map(seat => {
        return {seat: seat.seat, seatNumber: seat.seatNumber}
      }),
      adult: counters.adult,
      child: counters.child,
      senior: counters.senior,
    }

    navigate("/bokning/bekraftelse", {state: {booking: booking, movie: movie, screening: screening}})
  }
  
  return (
    <>    
    {screening && movie && <section className="flex flex-col items-center min-h-screen mb-20">
        <TicketCounter screening={screening} movie={movie} seats={seats} setSeats={setSeats}/>
        <ChooseSeats screening={screening} seats={seats} setSeats={setSeats}/>

        <button className="bg-gold text-black-100 rounded-md px-6 p-2" onClick={counters.total === seats.length ? navToBookingP2 : undefined}>Fortsätt</button>
    </section>}
    </>
  );
}
