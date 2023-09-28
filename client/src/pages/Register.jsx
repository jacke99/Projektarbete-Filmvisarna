import { styles } from "../styles";



export default function Register() {
  return <div className= "bg-[url('./assets/chairs.jpg')] bg-cover bg-center " >
    
    <div className="" >
      <h2 className={`${styles.headerText} text-white text-center  pt-40 pb-10  text-4xl`}>
        Bli en del av familjen!
      </h2>
      <p className=" text-white text-center w-[41%] m-auto lg:text-lg">Välkommen till oss på Filmvisarna. Vi älskar film! Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia
         e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo 
        tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. quando.</p>
    </div>
    
    <header>
      <h1 className={`${styles.headerText} text-white text-center  pt-20 pb-10  text-4xl`}>Bli medlem</h1>
      
    </header>
    <form className="flex flex-col items-center  w-screen md:w-2/3 m-auto lg:w-2/4 lg:text-lg"  >
      <div className=" flex justify-center lg:w-[100%] md:w-[100%] sm:w-[100%] ">
        <input className={`${styles.regInputs} w-[41%] `} type="text" id="fname" name="fname" placeholder="Förnamn..."/>
        <input className={`${styles.regInputs} w-[41%] `} type="text" id="fname" name="fname" placeholder="Efternamn..."/>
      </div>
      
      <input className={`${styles.regInputs} w-[85%]  `} type="email" id="email" name="email" placeholder="Epost..."/>
      <input className={`${styles.regInputs} w-[85%] `} type="password" id="password" name="password" placeholder="Lösenord..."/>
      <input className={`${styles.regInputs} w-[85%]  `} type="password" id="confirm_password" name="confirm_password" placeholder="Bekräfta lösenord..."/>
      <button className="bg-gold w-40 px-4 rounded-lg py-4 my-5 lg:text-lg " >Registrera</button>

    </form >

  </div>;
}
