import { useNavigate } from "react-router-dom";
import ChooseSeats from "../components/ChooseSeats";
import TicketCounter from "../components/TicketCounter";
import {useStates} from "react-easier"


export default function BookMovie() {
  const navigate = useNavigate();
  //eslint-disable-next-line
  const counters = useStates("ticketCounter", {
    adult: 0,
    child: 0,
    senior: 0,
  });
  return (
    <section className="mt-20 mb-40 flex flex-col items-center ">
        <TicketCounter />
        <ChooseSeats />

        <button className="bg-gold" onClick={() => navigate("/booking/confirm")}>Fortsätt</button>
    </section>
  );
}
