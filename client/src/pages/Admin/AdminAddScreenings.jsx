/* eslint-disable */
import AddScreeningForm from "../../components/adminPage/AddScreeningForm";
import { performRequest } from "../../service/fetchService";
import { useState } from "react";

export default function AdminAddScreenings(){
    const [loader, setLoader] = useState(false)
    const [inputValues, setInputValues]= useState({
        date: "",
        time:"",
        theater: 0,
        title: "",
    })
    async function handleSubmit(e) {
        e.preventDefault();
        setLoader(true)
        const response = await performRequest("/api/screenings", "post", inputValues);
      
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
        setLoader(false)
      }
      
    return(
        <div className="mt-12">
            <AddScreeningForm handleSubmit={handleSubmit} inputValues={inputValues} setInputValues={setInputValues} 
              loader={loader} />
           
        </div>
    )

}