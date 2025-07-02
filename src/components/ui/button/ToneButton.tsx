import React from "react";

type ToneButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

export const ToneButton: React.FC<ToneButtonProps> = ({
  label,
  isActive,
  onClick,
}) => {
  return (
    <button
      className={`tone-button ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
