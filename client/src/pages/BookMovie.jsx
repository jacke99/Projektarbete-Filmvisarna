import { useNavigate } from "react-router-dom";
import ChooseSeats from "../components/ChooseSeats";
import TicketCounter from "../components/TicketCounter";
import {useStates} from "react-easier"


export default function BookMovie() {
  const navigate = useNavigate();
  //eslint-disable-next-line
  const counters = useStates("ticketCounter", {
    adult: 2,
    child: 0,
    senior: 0,
    total: 2
  });
  return (
    <section className="mt-2 mb-40 flex flex-col items-center ">
        <TicketCounter />
        <ChooseSeats />

        <button className="bg-gold text-black-100 rounded-md px-4 p-1" onClick={() => navigate("/booking/confirm")}>Fortsätt</button>
    </section>
  );
}
