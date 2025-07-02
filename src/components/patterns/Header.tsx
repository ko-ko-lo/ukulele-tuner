import { NavLink } from "react-router-dom";
import "../../index.scss";
import "../../styles/variables.scss";
import { useTheme } from "../context/ThemeContext";

const Header: React.FC = () => {
  const { theme } = useTheme();
  return (
    <header>
      <NavLink to="/">
        <img
          src={theme === "dark" ? "/logo-aloha.svg" : "/logo-aloha-light.svg"}
          alt=""
        />
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
