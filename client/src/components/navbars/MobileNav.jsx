/* eslint-disable */
import { Link } from "react-router-dom";
import { styles } from "../../styles";
import { account_circle_new, close, menu_new } from "../../assets";
import { useStates } from "react-easier";

export default function MobileNav({
  currentUser,
  navigate,
  toggle,
  logout,
  setToggle,
  active,
}) {
  const t = useStates("globalToggle");
  return (
    <div className="flex items-center gap-1">
      <p
        onClick={() => navigate("/minasidor")}
        className={`${styles.subHeaderText} mr-2 hidden cursor-pointer hover:text-white xl:flex`}
      >
        {currentUser ? currentUser.name : ""}
      </p>
      <img
        src={account_circle_new}
        alt="login"
        className={`${styles.icons} cursor-pointer account-circle`}
        onClick={() =>
          currentUser ? navigate("/minasidor") : (t.toggle = true)
        }
      />
      <p
        className={`${styles.navText} ${
          t.toggle ? "text-white" : "text-gold"
        } hidden cursor-pointer hover:text-white xl:flex login-btn`}
        onClick={() => (currentUser ? logout() : (t.toggle = true))}
      >
        {currentUser ? "Logga ut" : "Logga in"}
      </p>
      <img
        src={toggle ? close : menu_new}
        alt="menu"
        className={`${styles.icons} hamburger-menu-icon cursor-pointer xl:hidden`}
        onClick={() => setToggle(!toggle)}
      />
      <div
        className={`${
          !toggle ? "hidden" : "flex"
        } hamburger-menu absolute right-0 top-20
            z-10 mx-4 my-2 min-w-[140px] rounded-xl bg-gradient-to-r from-footerGrey to-primary p-6`}
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
            to="/filmer"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <li
              className={`${
                active === "filmer" ? "text-white" : "text-gold"
              } cursor-pointer hover:text-white`}
            >
              Filmer
            </li>
          </Link>
          <Link
            to="/bokning"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <li
              className={`${
                active === "bokning" ? "text-white" : "text-gold"
              } cursor-pointer hover:text-white`}
            >
              Biljetter
            </li>
          </Link>
          {!currentUser && (
            <Link
              to="/registrera"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <li
                className={`${
                  active === "registrera" ? "text-white" : "text-gold"
                } cursor-pointer hover:text-white`}
              >
                Bli medlem
              </li>
            </Link>
          )}
          {currentUser && (
            <Link
              to="/minasidor"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <li
                className={`${
                  active === "minasidor" ? "text-white" : "text-gold"
                } cursor-pointer hover:text-white`}
              >
                Mina Sidor
              </li>
            </Link>
          )}
          {currentUser && currentUser.role === "ADMIN" && (
            <Link
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
            </Link>
          )}
          {currentUser && (
            <li className="text-red-500" onClick={logout}>
              Logga ut
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
