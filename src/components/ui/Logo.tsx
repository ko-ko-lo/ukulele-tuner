import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export function Logo() {
  const { theme } = useTheme();
  const logoSrc =
    theme === "dark" ? "/logo-aloha.svg" : "/logo-aloha-light.svg";

  return (
    <NavLink to="/" aria-label="Homepage">
      <img src={logoSrc} alt="Aloha Tune logo" />
    </NavLink>
  );
}
