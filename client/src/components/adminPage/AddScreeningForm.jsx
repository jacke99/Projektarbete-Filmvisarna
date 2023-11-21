// import { useState } from "react";
/* eslint-disable */
import { styles } from "../../styles";
import Loader from "../Loader";


export default function AddScreeningForm( { handleSubmit, inputValues, setInputValues, loader } ){
   

    return(
        <div className="mx-auto w-60 " >
        <h3 className="text-lg font-medium text-white mb-2">Lägg till ny filmvisning</h3>    
        <form onSubmit= {handleSubmit} className=" text-black" method="POST">
            <label className="text-white-100" htmlFor="date">Datum:</label>
            <input onChange={(e) => setInputValues({ ...inputValues, date: e.target.value })}
             value={inputValues.date} 
            className={`${styles.inputStyle}`} type="date" name="date" placeholder="Datum" />
            <label className="text-white-100" htmlFor="time">Tid:</label>
            <input onChange={(e) => setInputValues({...inputValues, time: e.target.value})} value={inputValues.time}
            className={`${styles.inputStyle}`} type="time" name="time" placeholder="Tid" />
            <select
             name="theater"
             value={inputValues.theater}
             onChange={(e) => setInputValues({...inputValues, theater: parseInt(e.target.value) })}
            className={`${styles.inputStyle}`}
            >
            <option>Välj salong</option>    
            <option value="1">1</option>
            <option value="2">2</option>
            </select>
            <input onChange={(e) => setInputValues({...inputValues, title: e.target.value})} value={inputValues.title}
            className={`${styles.inputStyle}`} name="title" placeholder="Filmens titel" />
            {!loader ? <button className={`${styles.buttonStyle} mt-4`} type="submit">Skicka in</button> : <Loader />}
        </form>
        </div>
    )
}