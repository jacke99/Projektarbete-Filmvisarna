import { styles } from "../styles";
import { useFormDefaults } from "../hooks/useFormDefaults";
import { performRequest } from "../service/fetchService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { projektor } from "../assets/index.js";
import Loader from "../components/Loader.jsx";

export default function Register() {
  const [showMsgToUser, setShowMsgToUser] = useState(" Text till användaren "); // state för att visa upp ett meddelande till användaren
  const [showSuccessPopupMsg, setShowSuccessPopup] = useState(false); // state för att göra en popup OM status:msg=Account was created - alltså om allt gick bra
  const [showUnsuccessfulPopupMsg, setShowUnsuccessfulPopupMsg] =
    useState(false); // state för att visa meddelande om något gått fel vi skapande av medlemskap
  const [loader, setLoader] = useState(false);

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
    formData.name = "";
    formData.lastname = "";
    formData.email = "";
    formData.phone = "";
    formData.password = "";
    formData.confirm_password = "";
  }

  const formRequestBody = {
    name: formData.name,
    lastname: formData.lastname,
    email: formData.email,
    phone: formData.phone,
    password: formData.password,
  };

  // /  I console log så följer all information som jag skriver med.
  // Jag vill att varje text i varje input ska sparas i en body.
  // Alla uppgifter sparas i formData. Jag vill att den informationen ska gå till bodyn
  // loggen ska stämma överens med samtliga namnen i bodyn
  // När jag trycker på submit  så vill jag att en function en post method ska skicka med dessa uppgifter till databasen

  async function SignUp(e) {
    setLoader(true);
    try {
      e.preventDefault();
      const result = await performRequest(
        "/api/register",
        "POST",
        formRequestBody,
      );

      if (result.msg === "Account was created") {
        setShowMsgToUser("GRATTIS! Du är nu medlem hos oss");
        setShowSuccessPopup(true);
        const resp = await performRequest("/api/login", "PUT", {
          email: formData.email,
          password: formData.password,
        });

        if (resp.message == "Succesful login") {
          sessionStorage.setItem("AuthToken", resp.jwt);
        }
        resetForm();
        window.scrollTo(0, 0);
      } else if (result.msg === "User already exists") {
        setShowMsgToUser("Ett konto med denna epost finns redan");
        setShowUnsuccessfulPopupMsg(true);
      }
    } catch (err) {
      console.error(err);
      setShowMsgToUser(
        "Något oväntat fel har inträffat när kontot försökte att skapas",
      );
    }
    setLoader(false);
  }

  // Funktion för att stänga poppup rutan när medlemskap är skapat. När man trycker på "stäng" slussas man till startsidan
  const closeSuccessPopup = () => {
    setShowSuccessPopup(false); // Hide the success popup

    navigate("/");
    window.location.reload();
  };

  return (
    <div
      className={`min-h-screen bg-[url('./assets/chairs.jpg')] bg-cover bg-center`}
    >
      <div className={`${styles.paddingY}`}>
        <h2
          className={`${styles.headerText} ${styles.paddingBottom} text-center text-white`}
        >
          Bli en del av familjen!
        </h2>
        <p className=" m-auto max-w-[80%] text-center text-white md:max-w-[60%]">
          Välkommen till oss på Filmvisarna. Vi älskar film och det verkar du
          också göra! Som medlem hos oss får du unika erbjudanden och chans till
          förhandsvisningar på spännande premiärer. Det kostar självklart inget
          att bli medlem så vad väntar du på, fyll i dina uppgifter nedan och
          bli en del av familjen redan idag.
        </p>

        <header>
          <h1
            className={`${styles.headerText} ${styles.paddingTop} ${styles.paddingBottom} text-center text-white`}
          >
            Bli medlem
          </h1>
        </header>

        {/* form starts here  */}
        <form
          onSubmit={(e) => SignUp(e)}
          className="relative m-auto flex w-screen max-w-[50rem] flex-col items-center md:w-2/3 lg:w-2/4 lg:text-lg"
        >
          {showSuccessPopupMsg && (
            <>
              <div className="firework"></div>
              <div className="firework"></div>
              <div className="firework"></div>
            </>
          )}
          {/* Firstname and lastname */}
          <div className=" flex w-screen flex-col items-center sm:w-[100%] md:flex-row md:justify-center ">
            <input
              className={`${styles.regInputs} w-[85%] md:w-[41%] `}
              disabled={showSuccessPopupMsg}
              type="text"
              {...defaults("name", "Förnamn. . .")}
            />

            <input
              className={`${styles.regInputs} w-[85%] md:w-[41%] `}
              disabled={showSuccessPopupMsg}
              type="text"
              {...defaults("lastname", "Efternamn. . .")}
            />
          </div>

          {/* Phone number */}
          <input
            className={`${styles.regInputs} w-[85%]  `}
            type="phone"
            disabled={showSuccessPopupMsg}
            {...defaults(
              "phone",
              "Telefon. . . ",
              { minLength: 8, type: "tel" },
              (val) => /^\d*$/.test(val),
              "OBS - Endast nummer är tillåten på denna rad!",
            )}
          />

          {/* Email address */}
          <input
            className={`${styles.regInputs} w-[85%]  `}
            disabled={showSuccessPopupMsg}
            {...defaults("email", "Epost. . .")}
          />

          {/* Password */}
          <input
            className={`${styles.regInputs} w-[85%] `}
            disabled={showSuccessPopupMsg}
            {...defaults(
              "password",
              "Lösenord. . .",
              {
                minLength: 8,
                type: "password",
              },
              (val) => /\d/.test(val) && /[A-Z]/.test(val) && /[a-z]/.test(val),
              "OBS - Lösenordet måste innehålla : 1 stor bokstav, en liten bokstav samt minst 1 siffra",
            )}
          />

          {/* Password Confirm */}
          <input
            className={`${styles.regInputs} w-[85%]  `}
            disabled={showSuccessPopupMsg}
            {...defaults(
              "confirm_password",
              "Bekräfta lösenord. . .",
              {
                minLength: 8,
                type: "password",
              },
              (val) => val === formData.password,
              "OBS - lösenorden måste matcha varandra!",
            )}
          />

          {/* Text to user if there is something wrong on submit */}
          {showUnsuccessfulPopupMsg && (
            <div className="rounded-md bg-black bg-opacity-80  p-0.5 font-extrabold text-rose-400">
              <p>{showMsgToUser}</p>
            </div>
          )}

          {/* Button Submit */}
          {!loader ? (
            <button
              className={`${styles.buttonStyle} mb-10`}
              disabled={showSuccessPopupMsg}
              type="submit"
            >
              Registrera
            </button>
          ) : (
            <Loader />
          )}

          {/* Popup to user if account is created */}
          {showSuccessPopupMsg && (
            <div className="popup absolute left-0 right-0 top-[-8rem] z-10 m-auto h-[12rem] w-[15rem] md:h-[14rem] md:w-[17rem] lg:h-[18rem] lg:w-[22rem]">
              <img
                src={projektor}
                alt="projektor"
                className="h-2/3 w-full rounded-t-md"
              />
              <div
                className="flex h-full flex-col items-center justify-evenly
              rounded-b-md bg-primary p-8 text-center text-white"
              >
                <p className="md:text-[1.2rem] lg:text-[1.5rem]">
                  {showMsgToUser}
                </p>
                <button
                  onClick={closeSuccessPopup}
                  className={`${styles.buttonStyle} mt-6 p-2 lg:p-2 lg:px-8 lg:text-[1.5rem]`}
                >
                  Stäng
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
