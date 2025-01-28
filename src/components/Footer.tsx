import "../styles/variables.scss";
import { useTheme } from "./ThemeContext";

const Footer: React.FC = () => {
  const { toggleTheme, theme } = useTheme();

  // Choose the icon based on the theme
  const icon = theme === "dark" ? "/sun-dark.svg" : "/moon-light.svg";
  const altText =
    theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";

  return (
    <footer>
      <div onClick={toggleTheme}>
        <img src={icon} alt={altText} />
      </div>
    </footer>
  );
};

export default Footer;
