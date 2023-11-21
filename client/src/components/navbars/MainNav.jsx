import { Link } from "react-router-dom";
import { styles } from "../../styles";
import { logo } from "../../assets";
//eslint-disable-next-line
export default function MainNav({ active, currentUser }) {
  return (
    <div className={`flex flex-row items-center gap-10`}>
      <Link
        className={`${styles.navText}`}
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
        <Link
          className={`${styles.navText}  block`}
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
          className={`${styles.navText}`}
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
          className={`${styles.navText}`}
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
            className={`${styles.navText}`}
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
            className={`${styles.navText}`}
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
        {/* eslint-disable-next-line */}
        {currentUser && currentUser.role === "ADMIN" && (
          <Link
            className={`${styles.navText}`}
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
      </ul>
    </div>
  );
}
