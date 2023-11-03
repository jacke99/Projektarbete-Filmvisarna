import { styles } from "../styles";
import { useFormDefaults } from '../hooks/useFormDefaults'
import { performRequest } from "../service/fetchService";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { projektor } from "../assets/index.js";




export default function Register() {

  const [showMsgToUser, setShowMsgToUser] = useState(" Text till användaren ") // state för att visa upp ett meddelande till användaren
  const [showSuccessPopupMsg, setShowSuccessPopup] = useState(false); // state för att göra en popup OM status:msg=Account was created - alltså om allt gick bra 
  const [showUnsuccessfulPopupMsg, setShowUnsuccessfulPopupMsg] = useState(false) // state för att visa meddelande om något gått fel vi skapande av medlemskap


  // använder useNavigate när man trycker på "stäng" 
  // så att man kommer till startsidan efter man blivit medlem
  const navigate = useNavigate();


  // Alla inputs man skriver i formen för att bli medlem 
  // sparas i formData som kom från formValidation.js
  let { defaults, formData } = useFormDefaults();


  // Hela informationen som stoppas in i form sparas i formData ovan. 
  // Tyvärr så sparas även confirm password i formData, detta vill vi INTE skicka till databasen. 
  // Därför måste vi bryta ut formData i en ny variabel där INTE confirmPassword ligger med i bodyn

  // Function to reset the form fields.
  function resetForm() {
    formData.name = '';
    formData.lastname = '';
    formData.email = '';
    formData.phone = '';
    formData.password = '';
    formData.confirm_password = '';
  }


  const formRequestBody = {
    name: formData.name,
    lastname: formData.lastname,
    email: formData.email,
    phone: formData.phone,
    password: formData.password
  }

  // /  I console log så följer all information som jag skriver med.
  // Jag vill att varje text i varje input ska sparas i en body.
  // Alla uppgifter sparas i formData. Jag vill att den informationen ska gå till bodyn
  // loggen ska stämma överens med samtliga namnen i bodyn
  // När jag trycker på submit  så vill jag att en function en post method ska skicka med dessa uppgifter till databasen

  async function SignUp(e) {
    try {
      e.preventDefault();
      const result = await performRequest("/api/register", "POST", formRequestBody);
      console.log(result);

      if (result.msg === "Account was created") {
        setShowMsgToUser("GRATTIS! Du är nu medlem hos oss");
        setShowSuccessPopup(true);
        const resp = await performRequest("/api/login", "PUT", { email: formData.email, password: formData.password })

        if (resp.message == "Succesful login") {
          sessionStorage.setItem("AuthToken", resp.jwt)
        }
        resetForm();
        window.scrollTo(0, 0);
        console.log("Form data after successful submission:", formData); // Log the formData
      } else if (result.msg === "User already exists") {
        setShowMsgToUser("Ett konto med denna epost finns redan");
        setShowUnsuccessfulPopupMsg(true);
      }

    } catch (err) {
      console.error(err);
      setShowMsgToUser("Något oväntat fel har inträffat när kontot försökte att skapas");
    }
  }



  // Funktion för att stänga poppup rutan när medlemskap är skapat. När man trycker på "stäng" slussas man till startsidan
  const closeSuccessPopup = () => {
    setShowSuccessPopup(false); // Hide the success popup

    navigate("/");
    window.location.reload();
  };


  return <div className="bg-[url('./assets/chairs.jpg')] bg-cover bg-center min-h-screen" >
    <div className="" >
      <h2 className={`${styles.headerText} text-white text-center  pt-40 pb-10  text-4xl`}>
        Bli en del av familjen!
      </h2>
      <p className=" text-white text-center sm:w-[70%] px-6 md:-[60%] m-auto lg:text-lg max-w-[60rem]">
        Välkommen till oss på Filmvisarna. Vi älskar film och det verkar du också göra!
        Som medlem hos oss får du unika erbjudanden och chans till förhandsvisningar på spännande premiärer.
        Det kostar självklart inget att bli medlem så vad väntar du på, fyll i dina uppgifter nedan och bli en del av familjen redan idag..
      </p>
    </div>

    <header>
      <h1 className={`${styles.headerText} text-white text-center  pt-20 pb-10  text-4xl`}>Bli medlem</h1>
    </header>

    {/* form starts here  */}
    <form onSubmit={(e) => SignUp(e)} className="flex flex-col items-center w-screen md:w-2/3 m-auto lg:w-2/4 lg:text-lg max-w-[50rem] relative"  >
      {showSuccessPopupMsg &&
        <>
          <div className="firework"></div>
          <div className="firework"></div>
          <div className="firework"></div>
        </>}
      {/* Firstname and lastname */}
      <div className=" flex items-center flex-col sm:w-[100%] w-screen md:flex-row md:justify-center ">
        <input
          className={`${styles.regInputs} w-[85%] md:w-[41%] `}
          disabled={showSuccessPopupMsg}
          type="text"

          {...defaults('name', 'Förnamn. . .')} />

        <input
          className={`${styles.regInputs} w-[85%] md:w-[41%] `}
          disabled={showSuccessPopupMsg}
          type="text"

          {...defaults('lastname', 'Efternamn. . .')} />
      </div>

      {/* Phone number */}
      <input
        className={`${styles.regInputs} w-[85%]  `}
        type="phone"
        disabled={showSuccessPopupMsg}
        {...defaults('phone', 'Telefon. . . ',
          { minLength: 8, type: 'tel' },
          val => /^\d*$/.test(val), 'OBS - Endast nummer är tillåten på denna rad!')} />

      {/* Email address */}
      <input
        className={`${styles.regInputs} w-[85%]  `} disabled={showSuccessPopupMsg} {...defaults('email', 'Epost. . .')} />

      {/* Password */}
      <input
        className={`${styles.regInputs} w-[85%] `} disabled={showSuccessPopupMsg} {...defaults('password', 'Lösenord. . .',
          {
            minLength: 8,
            type: 'password'
          }
          ,
          val => /\d/.test(val) && /[A-Z]/.test(val) && /[a-z]/.test(val),
          'OBS - Lösenordet måste innehålla : 1 stor bokstav, en liten bokstav samt minst 1 siffra')} />

      {/* Password Confirm */}
      <input
        className={`${styles.regInputs} w-[85%]  `} disabled={showSuccessPopupMsg} {...defaults('confirm_password', 'Bekräfta lösenord. . .',
          {
            minLength: 8,
            type: 'password'
          },
          val => val === formData.password, 'OBS - lösenorden måste matcha varandra!'
        )} />


      {/* Text to user if there is something wrong on submit */}
      {showUnsuccessfulPopupMsg && (
        <div className="text-rose-400 font-extrabold bg-black  p-0.5 rounded-md bg-opacity-80">
          <p>{showMsgToUser}</p>
        </div>
      )}

      {/* Button Submit */}
      <button
        className="bg-gold w-40 px-4 rounded-lg py-4 my-5 lg:text-lg mb-10"
        disabled={showSuccessPopupMsg}
        type="submit" >Registrera</button>


      {/* Popup to user if account is created */}
      {showSuccessPopupMsg && (
        <div className="popup absolute w-[15rem] h-[12rem] md:w-[17rem] md:h-[14rem] lg:w-[22rem] lg:h-[18rem] right-0 left-0 m-auto z-10 top-[-8rem]" >
          <img src={projektor} alt="projektor" className="w-full h-2/3 rounded-t-md" />
          <div className="flex-col bg-primary flex items-center justify-evenly
            text-white p-8 h-full text-center rounded-b-md">
            <p className="md:text-[1.2rem] lg:text-[1.5rem]">{showMsgToUser}</p>
            <button onClick={closeSuccessPopup} className={`${styles.buttonStyle} mt-6 p-2 lg:p-2 lg:px-8 lg:text-[1.5rem]`}>Stäng</button>
          </div>
        </div>
      )}


    </form >

  </div>;
}
