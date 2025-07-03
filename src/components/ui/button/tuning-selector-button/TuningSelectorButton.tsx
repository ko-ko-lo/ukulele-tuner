import React from "react";
import { useTheme } from "../../../context/ThemeContext";
import "./TuningSelectorButton.scss";

type TuningOption = {
  id: string;
  name: string;
};

type Props = {
  selectedTuning: string;
  tuningOptions: TuningOption[];
  onClick: () => void;
};

export const TuningSelectorButton: React.FC<Props> = ({
  selectedTuning,
  tuningOptions,
  onClick,
}) => {
  const { theme } = useTheme();

  const selectedName =
    tuningOptions.find((option) => option.id === selectedTuning)?.name ||
    "Standard Tuning";

  return (
    <button id="tuning-selector" onClick={onClick}>
      {selectedName}
      <img
        src={theme === "dark" ? "/arrow-down.svg" : "/arrow-down-light.svg"}
        alt=""
        className="arrow-icon"
      />
    </button>
  );
};
