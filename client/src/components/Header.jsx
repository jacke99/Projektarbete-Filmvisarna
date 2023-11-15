import { useEffect, useState } from "react";
import { styles } from "../styles";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logo, close, menu_new, account_circle_new} from "../assets";
import Login from "./Login";
import { parseJwt } from "../service/jwtService";
import { useStates } from 'react-easier';
export default function Header() {
  const [active, setActive] = useState("");
  const t = useStates("globalToggle", {toggle: false})
  const [toggle, setToggle] = useState(false);
  const [currentUser, setCurrentUser] = useState(parseJwt(sessionStorage.getItem("AuthToken")))
  const navigate = useNavigate()
  let location = useLocation()
  function logout() {
    sessionStorage.removeItem("AuthToken")
    setCurrentUser(undefined)
    navigate("/")
  }

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    setActive(pathParts[1])
  },[location])
  return (
    <nav className={`sticky top-0 z-20 border-gold bg-primary  shadow-black shadow-2xl`}>
    <div className={`${styles.navWrapper} flex justify-between`}>
      <div className={`flex items-center flex-row gap-10`}>
      <Link className={`${styles.navText}`}
          to="/"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={logo}
            alt="logo"
            className={`${styles.icons} cursor-pointer object-contain`}
          />
        </Link>
      
        <ul className={`hidden list-none flex-row gap-10 xl:flex`}>
        

          <Link className={`${styles.navText}  block`}
            to="/"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <li
              className={`${
                active === "" ? "text-white" : "text-gold"
              } cursor-pointer hover:text-white`}
            >
              Hem
            </li>
          </Link>
          <Link className={`${styles.navText}`}
            to="/movies"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <li
              className={`${
                active === "movies" ? "text-white" : "text-gold"
              } cursor-pointer hover:text-white`}
            >
              Filmer
            </li>
          </Link>
          <Link className={`${styles.navText}`}
            to="/booking"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <li
              className={`${
                active === "booking" ? "text-white" : "text-gold"
              } cursor-pointer hover:text-white`}
            >
              Biljetter
            </li>
          </Link>
          {!currentUser && <Link className={`${styles.navText}`}
            to="/register"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <li
              className={`${
                active === "register" ? "text-white" : "text-gold"
              } cursor-pointer hover:text-white`}
            >
              Bli medlem
            </li>
          </Link>}
          {currentUser && <Link className={`${styles.navText}`}
            to="/mypages"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <li
              className={`${
                active === "mypages" ? "text-white" : "text-gold"
              } cursor-pointer hover:text-white`}
            >
              Mina Sidor
            </li>
          </Link>}
          {currentUser && currentUser.role === "ADMIN" && <Link className={`${styles.navText}`}
            to="/admin"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <li
              className={`${
                active === "admin" ? "text-white" : "text-gold"
              } cursor-pointer hover:text-white`}
            >
              Admin
            </li>
          </Link>}
        </ul>
      </div>
      
      
      <div className="flex gap-1 items-center">
        <p onClick={() => navigate("/mypages")}  className={`${styles.subHeaderText} mr-2 hidden cursor-pointer hover:text-white xl:flex`}>
        {currentUser ? currentUser.name : ""}
        </p>
        <img
          src={account_circle_new}
          alt="login"
          className={`${styles.icons} cursor-pointer`}
          onClick={() => currentUser ? navigate("/mypages"): t.toggle = true }
        />
        <p
          className={`${styles.navText} ${t.toggle ? "text-white" : "text-gold"} hidden cursor-pointer hover:text-white xl:flex`}
          onClick={() => currentUser ? logout()  : t.toggle = true }
        >
          {currentUser ? "Logga ut" : "Logga in"}
        </p>
        <img
          src={toggle ? close : menu_new}
          alt="menu"
          className={`${styles.icons} cursor-pointer xl:hidden`}
          onClick={() => setToggle(!toggle)}
        />
        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } absolute right-0 top-20 z-10
            mx-4 my-2 min-w-[140px] rounded-xl bg-gradient-to-r from-footerGrey to-primary p-6 `}
        >
          <ul className="flex list-none flex-col items-start justify-end gap-4 text-gold">
            <Link
              to="/"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <li
                className={`${
                  active === "" ? "text-white" : "text-gold"
                } cursor-pointer hover:text-white`}
              >
                Hem
              </li>
            </Link>
            <Link
              to="/movies"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <li
                className={`${
                  active === "movies" ? "text-white" : "text-gold"
                } cursor-pointer hover:text-white`}
              >
                Filmer
              </li>
            </Link>
            <Link
              to="/booking"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <li
                className={`${
                  active === "booking" ? "text-white" : "text-gold"
                } cursor-pointer hover:text-white`}
              >
                Biljetter
              </li>
            </Link>
            {!currentUser && <Link
              to="/register"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <li
                className={`${
                  active === "register" ? "text-white" : "text-gold"
                } cursor-pointer hover:text-white`}
              >
                Bli medlem
              </li>
            </Link>}
            {currentUser && <Link
            to="/mypages"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <li
              className={`${
                active === "mypages" ? "text-white" : "text-gold"
              } cursor-pointer hover:text-white`}
            >
              Mina Sidor
            </li>
          </Link>}
          {currentUser && currentUser.role === "ADMIN" && <Link
            to="/admin"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <li
              className={`${
                active === "admin" ? "text-white" : "text-gold"
              } cursor-pointer hover:text-white`}
            >
              Admin
            </li>
          </Link>}
          {currentUser && <li className="text-red-500" onClick={logout}>
            Logga ut
          </li>}
          </ul>
        </div>
      </div>
      {t.toggle && <Login setCurrentUser={setCurrentUser}/>}
    </div>
    </nav>
    
  );
}
