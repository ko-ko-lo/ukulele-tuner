import "../../index.scss";
import "../../styles/variables.scss";
import ModeToggle from "../ui/ModeToggle";
import { Logo } from "../ui/logo";

const Header: React.FC = () => {
  return (
    <header>
      <Logo />
      <ModeToggle />
    </header>
  );
};

export default Header;
