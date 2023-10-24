import { close } from "../assets"
import {useState} from "react"
import { performRequest } from "../service/fetchService";
import { parseJwt } from "../service/jwtService";

 //eslint-disable-next-line
export default function Login({setToggleLogin}) {
  const [inputValues, setInputValues ] = useState({
    email: "",
    password: "",
  })
  
  function handleChange(event) {
      const { name, value } = event.target;
      setInputValues((prev) => {
          return {
              ...prev,
              [name]: value,
          }
      })
  }

  async function handleLogin() {
    const resp = await performRequest("/api/login", "PUT", inputValues)
    if(resp.message == "Succesful login") {
      sessionStorage.setItem("AuthToken", resp.jwt)
      const decoded = parseJwt(resp.jwt)
      console.log(decoded)
    } else {
      console.log("oh no")
    }
  }

  return (
    <div className="absolute right-0 top-20 z-10
    mx-4 my-2 min-w-[140px] rounded-xl bg-gradient-to-r from-footerGrey to-primary p-6 flex flex-col gap-3 text-white max-w-[400px]">
      <img src={close} alt="close" className="w-7 h-7 self-end cursor-pointer "
        onClick={() => setToggleLogin(false)}      
      />
      <h4 className="text-xl">Logga in</h4>
      <p>Välkommen till Filmvisarna, fyll i dina uppgifter för att logga in. </p>

      <input className=" bg-white-500 shadow appearance-none border rounded-lg  py-2 px-3 m-2
       text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email"
        name="email" value={inputValues.email} placeholder="Epostadress.." onChange={handleChange} />

      <input className=" bg-white-500 shadow appearance-none border rounded-lg  py-2 px-3 m-2
       text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password"
        name="password" value={inputValues.password} placeholder="Lösenord.." onChange={handleChange} />

      <button onClick={handleLogin} className="bg-gold text-black-100 rounded-md px-4 p-1 self-center">Logga in</button>
      <p>Har du inte ett konto? Bli medlem</p>
    </div>
  )
}
