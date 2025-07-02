type Props = {
  theme: "light" | "dark";
  onToggle: () => void;
};

export const ThemeToggleButton = ({ theme, onToggle }: Props) => {
  const icon = theme === "dark" ? "/sun-dark.svg" : "/moon-light.svg";
  const altText =
    theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";

  return (
    <button
      onClick={onToggle}
      aria-label={altText}
      className="theme-toggle-button"
    >
      <img src={icon} alt={altText} />
    </button>
  );
};
