import { close } from "../assets";
import { useState } from "react";
import { performRequest } from "../service/fetchService";
import { parseJwt } from "../service/jwtService";
import { useStates } from "react-easier";
import Loader from "./Loader";
import { useEffect } from "react";

//eslint-disable-next-line
export default function Login({ setCurrentUser }) {
  const t = useStates("globalToggle");
  const [toggleError, setToggleError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setInputValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleLogin() {
    setLoader(true);
    setToggleError(false);
    if (inputValues.email !== "" || inputValues.password !== "") {
      const resp = await performRequest("/api/login", "PUT", inputValues);
      if (resp.message == "Succesful login") {
        sessionStorage.setItem("AuthToken", resp.jwt);
        const decoded = parseJwt(resp.jwt);
        setCurrentUser(decoded);
        t.toggle = false;
        window.location.reload();
      } else {
        setToggleError(true);
        setLoader(false);
      }
    } else {
      alert("Please enter email and password");
      setLoader(false);
    }
  }

  useEffect(() => {
    const loginMenuCloser = (event) => {
      if (
        !event.target.closest(".login-box") &&
        !event.target.closest(".login-btn") &&
        !event.target.closest(".account-circle")
      ) {
        t.toggle = false;
      }
    };
    document.body.addEventListener("click", loginMenuCloser);
    return () => {
      document.body.removeEventListener("click", loginMenuCloser);
    }; //eslint-disable-next-line
  }, []);

  return (
    <div
      className="login-box absolute right-0 top-20
    z-10 mx-4 my-2 flex min-w-[140px] max-w-[400px] flex-col gap-3 rounded-xl bg-gradient-to-r from-footerGrey to-primary p-6 text-white"
    >
      <img
        src={close}
        alt="close"
        className="h-7 w-7 cursor-pointer self-end "
        onClick={() => (t.toggle = false)}
      />
      <h4 className="text-xl">Logga in</h4>
      <p>
        Välkommen till Filmvisarna, fyll i dina uppgifter för att logga in.{" "}
      </p>

      <input
        className=" bg-white-500 focus:shadow-outline m-2 appearance-none rounded-lg  border px-3 py-2
       leading-tight text-gray-700 shadow focus:outline-none"
        type="email"
        name="email"
        value={inputValues.email}
        placeholder="Epostadress.."
        onChange={handleChange}
      />

      <input
        className=" bg-white-500 focus:shadow-outline m-2 appearance-none rounded-lg  border px-3 py-2
       leading-tight text-gray-700 shadow focus:outline-none"
        type="password"
        name="password"
        value={inputValues.password}
        placeholder="Lösenord.."
        onChange={handleChange}
      />
      {toggleError && (
        <p className="text-red-500">Email eller lösenord var inkorrekt</p>
      )}
      {!loader ? (
        <button
          onClick={handleLogin}
          className="login-btn self-center rounded-md bg-gold p-1 px-4 text-black-100"
        >
          Logga in
        </button>
      ) : (
        <Loader />
      )}
      <p>Har du inte ett konto? Bli medlem</p>
    </div>
  );
}
