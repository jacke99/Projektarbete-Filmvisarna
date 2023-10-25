import { styles } from "../styles";
import { useFormDefaults } from '../hooks/formValidation'
import { performRequest } from "../service/fetchService";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'; 



export default function Register() {

  const [showMsgToUser, setShowMsgToUser]= useState(" Text till användaren ") // state för att visa upp ett meddelande till användaren
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
        setShowSuccessPopup(true) // sätter denna till true då konto skapats
      } else if (result.msg === "User allready exists") {
        setShowMsgToUser("Ett konto med denna epost finns redan");
        setShowUnsuccessfulPopupMsg(true)
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
  };
    
  
  return <div className= "bg-[url('./assets/chairs.jpg')] bg-cover bg-center min-h-screen" >
    
  
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
    <form onSubmit={(e)=>SignUp(e)} className="flex flex-col items-center w-screen md:w-2/3 m-auto lg:w-2/4 lg:text-lg max-w-[50rem] static"  >

    {/* Firstname and lastname */}
      <div className=" flex items-center flex-col lg:w-[100%] md:w-[100%] sm:w-[100%] w-screen md:flex-row md:justify-center ">
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
        className={`${styles.regInputs} w-[85%]  `}  disabled={showSuccessPopupMsg} {...defaults('email', 'Epost. . .')}/>
      
      {/* Password */}
      <input 
        className={`${styles.regInputs} w-[85%] `}  disabled={showSuccessPopupMsg} {...defaults('password', 'Lösenord. . .',
        { minLength: 8, 
        type: 'password' }
        , 
        val => /\d/.test(val) && /[A-Z]/.test(val) && /[a-z]/.test(val),
        'OBS - Lösenordet måste innehålla : 1 stor bokstav, en liten bokstav samt minst 1 siffra' )} /> 
      
      {/* Password Confirm */}
      <input 
        className={`${styles.regInputs} w-[85%]  `}  disabled={showSuccessPopupMsg} {...defaults('confirm_password', 'Bekräfta lösenord. . .',  
        { minLength: 8, 
        type: 'password' }, 
        val => val === formData.password, 'OBS - lösenorden måste matcha varandra!'
      )} />

        
        {/* Text to user if there is something wrong on submit */} 
        {showUnsuccessfulPopupMsg &&(
          <div className="text-rose-400 font-extrabold bg-black  p-0.5 rounded-md bg-opacity-80">
            <p>{showMsgToUser}</p>
          </div>
        ) }

      {/* Button Submit */}
      <button 
        className="bg-gold w-40 px-4 rounded-lg py-4 my-5 lg:text-lg " 
        disabled={showSuccessPopupMsg}
        type="submit" >Registrera</button>
        
        
        {/* Popup to user if account is created */}
        {showSuccessPopupMsg && (
              <div className="popup rounded-md  bg-primary  " >
                <div className=" flex items-center justify-center rounded-md flex-col
                 lg:left-73 lg:top-[30rem] lg:h-[70rem] lg:w-[50rem]
                 bg-primary  text-white  md:w-[30rem] md:h-[30rem] z-50 absolute md:left-[21%] md:top-[50%] md:mt-8 
                  sm:absolute left-9 top-[50rem] h-[30rem] w-[20rem] "  >
                  <p className="md:text-[25px] lg:text-[30px]">{showMsgToUser}</p>
                  <button onClick={closeSuccessPopup} className={`${styles.buttonStyle}mt-7 px-10 p-2 lg:p-7 lg:px-16 lg:text-[30px]`}>Stäng</button>
                </div>
              </div>
            )}
    </form >

  </div>;
}
