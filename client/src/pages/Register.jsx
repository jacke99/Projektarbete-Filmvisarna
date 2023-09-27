import { styles } from "../styles";
import chairs from "../assets/chairs.jpg"


export default function Register() {
  return <div className="bg-black"  >
    <header>
      <h1 className={`${styles.headerText} text-white text-center  p-10  text-4xl`}>Bli medlem</h1>
      
    </header>
    
    <form className="flex flex-col items-center">
      <div>
        <input className={`${styles.regInputs}`} type="text" id="fname" name="fname" placeholder="Förnamn..."/>
        <input className={`${styles.regInputs} `} type="text" id="fname" name="fname" placeholder="Efternamn..."/>
      </div>
      
      <input className={`${styles.regInputs} w-80 `}  type="email" id="email" name="email" placeholder="Epost..."/>
      <input className={`${styles.regInputs} w-80`} type="password" id="password" name="password" placeholder="Lösenord..."/>
      <input className={`${styles.regInputs} w-80`} type="password" id="confirm_password" name="confirm_password" placeholder="Bekräfta lösenord..."/>
      <button className="bg-gold w-40 px-4 rounded py-4 my-5 " >Registrera</button>

    </form >

  </div>;
}
