import ChooseSeats from "../components/ChooseSeats";
import TicketCounter from "../components/TicketCounter";


export default function BookMovie() {
  return (
    <section>
        <TicketCounter />
        <ChooseSeats />

        <button>Boka</button>
    </section>
  )
}
