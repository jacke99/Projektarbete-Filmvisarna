import { styles } from "../styles";
import { useFormDefaults } from '../hooks/formValidation'


export default function Register() {
 
  let { defaults, formData } = useFormDefaults();


  // I console log så följer all information som jag skriver med.
  // Jag vill att varje text i varje input ska sparas i en body.
  // Alla uppgifter sparas i formData. Jag vill att den informationen ska gå till bodyn
  // loggen ska stämmer överens med namnen i bodyn
  // När jag trycker på submit så vill jag att en post method ska skicka med dessa uppgifter till databasen


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

    <form className="flex flex-col items-center w-screen md:w-2/3 m-auto lg:w-2/4 lg:text-lg max-w-[50rem] "  >

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

    </form >

  </div>;
}
