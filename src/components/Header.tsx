import { NavLink } from "react-router-dom";
import "../index.scss";
import "../styles/variables.scss";
import { useTheme } from "./ThemeContext";

const Header: React.FC = () => {
  const { theme } = useTheme();
  // React.FC means "React Functional Component"
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
