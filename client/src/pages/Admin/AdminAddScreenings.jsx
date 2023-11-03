/* eslint-disable */
import AdminNavigation from "../../components/adminPage/AdminNavigation";
import { Link } from "react-router-dom";
import AddScreeningForm from "../../components/adminPage/AddScreeningForm";
import { performRequest } from "../../service/fetchService";
import { useState } from "react";

export default function AdminAddScreenings(){

    const authToken = sessionStorage.getItem("AuthToken");
    console.log(authToken)
    
    const [date, setDate] = useState("");
    const [time, setTime] = useState("")
    const [theater, setTheater] = useState("")
    const [title, setTitle] = useState("")

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = {date,time,theater: parseInt(theater),title}
        console.log(formData)

        try {
            const response = await performRequest("/api/screenings", "post", formData);
            console.log(response)
            // Hantera responsen här
        } catch (error) {
            // Hantera fel här
        }
      }
      

    return(
        <div className="mt-20">
        <AdminNavigation />
            <AddScreeningForm handleSubmit= {handleSubmit} setTime= {setTime} setDate={setDate} setTitle = {setTitle}
            setTheater={setTheater}/>
            <Link to="/admin/movies" className={`text-4-xl underline`}>
            ADMIN screenings
            </Link>
        </div>
    )

}