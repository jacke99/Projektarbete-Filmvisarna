/* eslint-disable */
import AddScreeningForm from "../../components/adminPage/AddScreeningForm";
import { performRequest } from "../../service/fetchService";
import { useState } from "react";

export default function AdminAddScreenings(){

    const [inputValues, setInputValues]= useState({
        date: "",
        time:"",
        theater: 0,
        title: "",
    })
    async function handleSubmit(e) {
        e.preventDefault();
        const response = await performRequest("/api/screenings", "post", inputValues);
        console.log(response);
      
        if (response.insertedId) {
          alert("Filmvisningen är nu tillagd i systemet!");
          setInputValues({
            date: "",
            time: "",
            theater: 0,
            title: ""
          });
        } else if (response.error) {
          alert("Du har angivit felaktig information, prova igen!");
        } else {
          alert("Något gick fel, prova igen.");
        }
      }
      
    return(
        <div className="mt-12">
            <AddScreeningForm handleSubmit= {handleSubmit} inputValues={inputValues} setInputValues={setInputValues}/>
           
        </div>
    )

}