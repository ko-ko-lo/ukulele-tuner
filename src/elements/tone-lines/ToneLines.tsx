import React from "react";
import "./ToneLines.scss";

type ToneLinesProps = {
  isActive: boolean;
  children: React.ReactNode;
};

export const ToneLines: React.FC<ToneLinesProps> = ({ isActive, children }) => {
  return (
    <div className={`tone-line ${isActive ? "active" : ""}`}>{children}</div>
  );
};
