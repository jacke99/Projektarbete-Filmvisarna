import ChooseSeats from "../components/ChooseSeats";
import TicketCounter from "../components/TicketCounter";
import {useStates} from "react-easier"


export default function BookMovie() {
  //eslint-disable-next-line
  const counters = useStates("ticketCounter", {
    adult: 0,
    child: 0,
    senior: 0,
  });
  return (
    <section>
        <TicketCounter />
        <ChooseSeats />

        <button>Boka</button>
    </section>
  )
}
