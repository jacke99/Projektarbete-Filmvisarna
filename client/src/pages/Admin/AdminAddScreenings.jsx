/* eslint-disable */
import AdminNavigation from "../../components/adminPage/AdminNavigation";
import { Link } from "react-router-dom";
import AddScreeningForm from "../../components/adminPage/AddScreeningForm";
import { performRequest } from "../../service/fetchService";
import { useState } from "react";

export default function AdminAddScreenings(){

    
    const [date, setDate] = useState("");
    const [time, setTime] = useState("")
    const [theater, setTheater] = useState(0)
    const [title, setTitle] = useState("")

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = {date,time,theater: parseInt(theater),title}
        console.log(formData)

        try {
            const response = await performRequest("/api/screenings", "post", formData);
            console.log(response)
            if(response.insertedId){
            alert("Filmvisningen är nu tillagd i systemet!")
            setDate("")
            setTime("")
            setTheater(0)
            setTitle("")}
        else if(response.error){
            alert("Du har angivit felaktig filmtitel, prova igen!")
        }
            
        } catch (error) {   
            alert("något gick fel, prova igen")
        }
      }
      

    return(
        <div className="mt-20">
        <AdminNavigation />
            <AddScreeningForm handleSubmit= {handleSubmit} setTime= {setTime} setDate={setDate} date= {date} setTitle = {setTitle}
            setTheater={setTheater}/>
           
        </div>
    )

}