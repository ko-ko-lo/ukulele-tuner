import { NavLink } from "react-router-dom";
import "./ModeToggle.scss";

function ModeToggle() {
  return (
    <nav className="mode-toggle">
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Auto
      </NavLink>
      <NavLink
        to="/manual"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Manual
      </NavLink>
    </nav>
  );
}

export default ModeToggle;
