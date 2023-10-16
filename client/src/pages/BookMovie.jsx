import { useNavigate } from "react-router-dom";
import ChooseSeats from "../components/ChooseSeats";
import TicketCounter from "../components/TicketCounter";
import {useStates} from "react-easier"
import { useEffect } from "react";


export default function BookMovie() {
  const navigate = useNavigate();
  //eslint-disable-next-line
  const counters = useStates("ticketCounter", {
    adult: 2,
    child: 0,
    senior: 0,
    total: 2
  });
  const screeningId = "652927575a5dbfd02640097f"
  useEffect(() => {
    const eventSource = new EventSource(`/api/screenings/${screeningId}`);
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data); //ska sparas i state så att sidan uppdateras.
    };
    eventSource.onerror = (error) => {
      console.error(error);
      eventSource.close();
    };
  },[])

  return (
    <section className="mt-2 flex flex-col items-center min-h-screen">
        <TicketCounter />
        <ChooseSeats />

        <button className="bg-gold text-black-100 rounded-md px-4 p-1" onClick={() => navigate("/booking/confirm")}>Fortsätt</button>
    </section>
  );
}
