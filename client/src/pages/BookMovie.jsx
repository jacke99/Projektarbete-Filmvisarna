import ChooseSeats from "../components/ChooseSeats";
import TicketCounter from "../components/TicketCounter";


export default function BookMovie() {
  return (
    <section className="mt-20 flex flex-col items-center ">
        <TicketCounter />
        <ChooseSeats />

        <button className="bg-gold">Boka</button>
    </section>
  )
}
