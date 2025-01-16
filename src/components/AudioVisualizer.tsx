import React from "react";
import "../index.scss";
import "../styles/variables.scss";

const AudioVisualizer: React.FC = () => {
  return (
    <div className="audio-visualizer">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="audio-bar"></div>
      ))}
    </div>
  );
};

export default AudioVisualizer;
