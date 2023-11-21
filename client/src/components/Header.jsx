import { useEffect, useState } from "react";
import { styles } from "../styles";
import { useNavigate, useLocation } from "react-router-dom";
import Login from "./Login";
import { parseJwt } from "../service/jwtService";
import { useStates } from "react-easier";
import MainNav from "./navbars/MainNav";
import MobileNav from "./navbars/MobileNav";
export default function Header() {
  const [active, setActive] = useState("");
  const t = useStates("globalToggle", { toggle: false });
  const [toggle, setToggle] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    parseJwt(sessionStorage.getItem("AuthToken")),
  );
  const navigate = useNavigate();
  let location = useLocation();
  function logout() {
    sessionStorage.removeItem("AuthToken");
    setCurrentUser(undefined);
    navigate("/");
  }

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    setActive(pathParts[1]);
  }, [location]);

  useEffect(() => {
    const hamburgerCloser = (event) => {
      if (
        !event.target.closest(".hamburger-menu") &&
        !event.target.closest(".hamburger-menu-icon")
      ) {
        setToggle(false);
      }
    };
    document.body.addEventListener("click", hamburgerCloser);
    return () => {
      document.body.removeEventListener("click", hamburgerCloser);
    };
  }, []);

  return (
    <nav className={`sticky top-0 z-[2000] border-b-2 border-gold bg-primary`}>
      <div className={`${styles.navWrapper} flex justify-between`}>
        <MainNav active={active} currentUser={currentUser} />

        <MobileNav
          currentUser={currentUser}
          navigate={navigate}
          toggle={toggle}
          logout={logout}
          setToggle={setToggle}
          active={active}
        />
        {t.toggle && <Login setCurrentUser={setCurrentUser} />}
      </div>
    </nav>
  );
}
