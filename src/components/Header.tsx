import { NavLink } from "react-router-dom";
import "../index.scss";
import "../styles/variables.scss";

const Header: React.FC = () => {
  // React.FC means "React Functional Component"
  return (
    <header>
      <NavLink to="/">
        <img src="./logo-aloha.svg" alt="" />
      </NavLink>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Auto
        </NavLink>
        <NavLink
          to="/manual"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Manual
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
