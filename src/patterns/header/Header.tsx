import { Logo } from "../../elements/logo/Logo";
import ModeToggle from "../../elements/mode-toggle/ModeToggle";
import "./Header.scss";

const Header: React.FC = () => {
  return (
    <header>
      <Logo />
      <ModeToggle />
    </header>
  );
};

export default Header;
