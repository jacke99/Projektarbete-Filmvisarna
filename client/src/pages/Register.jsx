import { styles } from "../styles";
import { useFormDefaults } from '../hooks/formValidation'
import { performRequest } from "../service/fetchService";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate



export default function Register() {

  const navigate = useNavigate();
 
  let { defaults, formData } = useFormDefaults();
  const [showMsgToUser, setShowMsgToUser]= useState(" Text till användaren ")
  const [showSuccessPopupMsg, setShowSuccessPopup] = useState(false); // state för att göra en popup OM status:msg = 
  const [showUnsuccessfulPopupMsg, setShowUnsuccessfulPopupMsg] = useState(false)


  async function SignUp(e) {
    try {
      e.preventDefault();
      const result = await performRequest("/api/register", "POST", formData);
      console.log(result);
  
      if (result.msg === "Account was created") {
        setShowMsgToUser("Ett nytt konto har skapats");
        setShowSuccessPopup(true) // sätter denna till true då konto skapats
      } else if (result.msg === "User allready exists") {
        setShowMsgToUser("Ett konto med dessa uppgifter finns redan");
        setShowUnsuccessfulPopupMsg(true)
      }
    } catch (err) {
      console.error(err);
      setShowMsgToUser("Något oväntat fel har inträffat när kontot försökte att skapas");
    }
  }

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false); // Hide the success popup

    navigate("/");
  };
    
  //  I console log så följer all information som jag skriver med.
  // Jag vill att varje text i varje input ska sparas i en body.
  // Alla uppgifter sparas i formData. Jag vill att den informationen ska gå till bodyn
  // loggen ska stämma överens med samtliga namnen i bodyn
  // När jag trycker på submit  så vill jag att en function en post method ska skicka med dessa uppgifter till databasen

    // async function signUp() {
  //   const resp = await performRequest("/api/register", "POST", )


  return <div className= "bg-[url('./assets/chairs.jpg')] bg-cover bg-center min-h-screen" >
    
    <div className="" >
      <h2 className={`${styles.headerText} text-white text-center  pt-40 pb-10  text-4xl`}>
        Bli en del av familjen!
      </h2>
      <p className=" text-white text-center sm:w-[70%] px-6 md:-[60%] m-auto lg:text-lg max-w-[60rem]">Välkommen till oss på Filmvisarna. Vi älskar film! Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia
         e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo 
        tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. quando.</p>
    </div>
    
    <header>
      <h1 className={`${styles.headerText} text-white text-center  pt-20 pb-10  text-4xl`}>Bli medlem</h1>
    </header>

    <form onSubmit={(e)=>SignUp(e)} className="flex flex-col items-center w-screen md:w-2/3 m-auto lg:w-2/4 lg:text-lg max-w-[50rem] static"  >

    {/* Firstname and lastname */}
      <div className=" flex items-center flex-col lg:w-[100%] md:w-[100%] sm:w-[100%] w-screen md:flex-row md:justify-center ">
        <input 
           className={`${styles.regInputs} w-[85%] md:w-[41%] `} 
           type="text" 
           {...defaults('name', 'Förnamn. . .')} />
        
        <input 
          className={`${styles.regInputs} w-[85%] md:w-[41%] `} 
          type="text" 
          {...defaults('lastname', 'Efternamn. . .')} />
      </div>
      
      {/* Phone number */}
      <input 
        className={`${styles.regInputs} w-[85%]  `}  
        type="phone" 
        {...defaults('phone', 'Telefon. . . ',
        { minLength: 8, type: 'tel' },  
        val => /^\d*$/.test(val), 'OBS - Endast nummer är tillåten på denna rad!')} />
      
      {/* Email address */}
      <input 
        className={`${styles.regInputs} w-[85%]  `} {...defaults('email', 'Epost. . .')}/>
      
      {/* Password */}
      <input 
        className={`${styles.regInputs} w-[85%] `} {...defaults('password', 'Lösenord. . .',
        { minLength: 8, 
        type: 'password' }, 
        val => /\d/.test(val) && /[A-Z]/.test(val) && /[a-z]/.test(val),
        'OBS - Lösenordet måste innehålla : 1 stor bokstav, en liten bokstav samt minst 1 siffra' )} /> 
      
      {/* Password Confirm */}
      <input 
        className={`${styles.regInputs} w-[85%]  `} {...defaults('confirm_password', 'Bekräfta lösenord. . .',  
        { minLength: 8, 
        type: 'password' }, 
        val => val === formData.password, 'OBS - lösenorden måste matcha varandra!'
      )} />

      {/* Button Submit */}
      <button 
        className="bg-gold w-40 px-4 rounded-lg py-4 my-5 lg:text-lg " 
        type="submit" >Registrera</button>

        {showSuccessPopupMsg && (
              <div className="popup">
                <div className=" flex items-center justify-center flex-col  text-white bg-gray-600 text-xl p-40 z-50 absolute bottom-40  left-40  " >
                  <p>{showMsgToUser}</p>
                  <button onClick={closeSuccessPopup} className="bg-blue-700 w-40 px-4 rounded-lg py-4 my-5 lg:text-lg   ">Stäng</button>
                </div>
              </div>
            )}
        {showUnsuccessfulPopupMsg &&(
          <div className="text-white">
            <p>{showMsgToUser}</p>
          </div>
        ) }

    </form >

  </div>;
}
