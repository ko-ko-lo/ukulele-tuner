import "../../styles/variables.scss";
import { useTheme } from "../context/ThemeContext";
import { ThemeToggleButton } from "../ui/button/ThemeToggleButton";

const Footer: React.FC = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <footer>
      <ThemeToggleButton theme={theme} onToggle={toggleTheme} />
    </footer>
  );
};

export default Footer;
