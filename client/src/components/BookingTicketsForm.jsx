import { Link, useNavigate } from "react-router-dom";


export default function BookingTicketsForm() {
    const navigate = useNavigate()
  return (
    <div className="text-white flex flex-col w-4/5 items-center m-auto">
        <div className="flex flex-col">
            <h4 className="text-2xl">Är du medlem? (valfritt)</h4>
            <ul className="list-disc mb-10">
                <li className="ml-6">Förhandsvisningar & medlemskvällar.</li>
                <li className="ml-6">Rabatt på dryck och snacks</li>
            </ul>

            <button className="bg-gold w-36 text-black px-6 py-2 rounded m-auto" onClick={() => navigate("/register")}>Bli medlem</button>
            <p className="text-center mb-8 mt-1">eller <Link className="underline" to="/register">logga in!</Link></p>
        </div>
        <form className="flex flex-col">
            <label className="font-inconsolata" htmlFor="email">Fyll i mailadress</label>
            <input className="py-2 px-4 rounded w-[16em]" type="text" />
            <label className="font-inconsolata mt-4" htmlFor="re-email">Bekräfta mailadress</label>
            <input className="py-2 px-4 rounded" type="text" />
            <label className="font-inconsolata mt-4" htmlFor="email">Mobiltelefon</label>
            <input className="py-2 px-4 rounded mb-10" type="text" />
        </form>
    </div>
  )
}
