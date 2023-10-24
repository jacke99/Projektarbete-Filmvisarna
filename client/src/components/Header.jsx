import { useState } from "react";
import { styles } from "../styles";
import { Link } from "react-router-dom";
import { logo, account_circle_new, close, menu_new } from "../assets";
import Login from "./Login";
import { parseJwt } from "../service/jwtService";
export default function Header() {
  const [active, setActive] = useState("");
  const [toggleLogin, setToggleLogin] = useState(false)
  const [toggle, setToggle] = useState(false);
  const [currentUser, setCurrentUser] = useState(parseJwt(sessionStorage.getItem("AuthToken")))
  return (
    <nav
      className={`${styles.paddingX} fixed top-0 z-20 flex w-full justify-between items-center border-b-2 border-gold bg-primary lg:py-2`}
    >
      <div className="flex w-full items-center">
        <Link
          to="/"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={logo}
            alt="logo"
            className="mr-2 h-12 w-12 md:w-[80px] md:h-[80px] lg:h-12 lg:-w12 object-contain"
          />
        </Link>
        <ul
          className={`${styles.subHeaderText} hidden list-none flex-row gap-10 lg:flex `}
        >
          <Link
            to="/"
            onClick={() => {
              setActive("");
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
              setActive("movies");
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
              setActive("booking");
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
          <Link
            to="/register"
            onClick={() => {
              setActive("register");
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
          </Link>
          {currentUser && <Link
            to="/mypages"
            onClick={() => {
              setActive("mypages");
              window.scrollTo(0, 0);
            }}
          >
            <li
              className={`${
                active === "register" ? "text-white" : "text-gold"
              } cursor-pointer hover:text-white`}
            >
              Mina Sidor
            </li>
          </Link>}
        </ul>
      </div>
      <div className="flex w-[300px] justify-end gap-1 items-center">
        <img
          src={account_circle_new}
          alt="login"
          className="w-8 sm:w-12 object-contain cursor-pointer mr-2"
          onClick={() => setToggleLogin(!toggleLogin) }
        />
        <p
          className={`${styles.subHeaderText} ${toggleLogin ? "text-white" : "text-gold"} hidden cursor-pointer hover:text-white lg:flex`}
          onClick={() => setToggleLogin(!toggleLogin) }
        >
          {currentUser ? currentUser.name : "Logga in"}
        </p>
        <img
          src={toggle ? close : menu_new}
          alt="menu"
          className="h-9 w-9 md:h-12 md:w-12 object-contain lg:hidden"
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
                setActive("");
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
                setActive("movies");
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
                setActive("booking");
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
            <Link
              to="/register"
              onClick={() => {
                setActive("register");
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
            </Link>
          </ul>
        </div>
      </div>
      {toggleLogin && <Login setToggleLogin={setToggleLogin} setCurrentUser={setCurrentUser}/>}
    </nav>
  );
}
