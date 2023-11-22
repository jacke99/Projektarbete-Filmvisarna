/* eslint-disable */
import { useNavigate } from "react-router-dom";
import { useStates } from 'react-easier';
import { useEffect } from 'react';

export default function BookingTicketsForm({ inputValues, setInputValues }) {
    const t = useStates("globalToggle")
    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    function handleChange(e) {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value })
        
    }
    return (
        <div className="text-white flex flex-col w-4/5 items-center m-auto">
            <div className="flex flex-col">
                <h4 className="text-2xl">Är du medlem? (valfritt)</h4>
                <ul className="list-disc mb-10">
                    <li className="ml-6">Förhandsvisningar & medlemskvällar.</li>
                    <li className="ml-6">Rabatt på dryck och snacks</li>
                </ul>

                <button className="bg-gold w-36 text-black px-6 py-2 rounded m-auto" onClick={() => navigate("/registrera")}>Bli medlem</button>
                <p className="text-center mb-8 mt-1">eller <span className="underline cursor-pointer" onClick={() => t.toggle = true}>logga in!</span></p>
            </div>
            <div className="flex flex-col">
                <label className="font-inconsolata" htmlFor="email">Fyll i mailadress</label>
                <input onChange={handleChange} name="email" value={inputValues.email} className="py-2 px-4 rounded w-[16em] text-black" type="text" />
                <label className="font-inconsolata mt-4" htmlFor="re-email">Bekräfta mailadress</label>
                <input onChange={handleChange} name="reEmail" value={inputValues.reEmail} className="py-2 px-4 rounded text-black" type="text" />
                <label className="font-inconsolata mt-4" htmlFor="email">Mobiltelefon</label>
                <input onChange={handleChange} name="phone" value={inputValues.phone} className="py-2 px-4 rounded mb-10 text-black" type="text" />
            </div>
        </div>
    )
}
