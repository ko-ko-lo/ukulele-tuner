import { Logo } from "../../ui/logo/Logo";
import ModeToggle from "../../ui/mode-toggle/ModeToggle";
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
