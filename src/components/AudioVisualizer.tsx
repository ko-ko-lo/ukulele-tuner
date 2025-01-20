import React, { useState } from "react";
import "../index.scss";
import "../styles/variables.scss";

const AudioVisualizer: React.FC = () => {
  const [detectedTone, setDetectedTone] = useState<string | null>(null);

  const handleDetectTone = () => {
    // Simulating tone detection
    setDetectedTone("C4");
  };

  return (
    <div>
      <h3>Pluck a string to start tuning.</h3>

      <div className="visualizer-container">
        <div className="audio-visualizer">
          {[...Array(5)].map((_, index) => (
            <div key={`left-${index}`} className="audio-bar"></div>
          ))}

          <div className="audio-center" onClick={handleDetectTone}>
            {detectedTone ? (
              <span>{detectedTone}</span>
            ) : (
              <span>
                <img src="./notes.svg" alt="Musical Notes" />
              </span>
            )}
          </div>

          {[...Array(5)].map((_, index) => (
            <div key={`right-${index}`} className="audio-bar"></div>
          ))}
        </div>

        <div className="audio-labels">
          <span className="too-low">Too Low</span>
          <span className="too-high">Too High</span>
        </div>
      </div>
    </div>
  );
};

export default AudioVisualizer;
