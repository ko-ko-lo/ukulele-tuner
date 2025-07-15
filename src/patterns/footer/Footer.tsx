import { useTheme } from "../../context/ThemeContext";
import { ThemeToggleButton } from "../../elements/button/theme-toggle-button/ThemeToggleButton";
import "./Footer.scss";

const Footer: React.FC = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <footer>
      <ThemeToggleButton theme={theme} onToggle={toggleTheme} />
    </footer>
  );
};

export default Footer;
