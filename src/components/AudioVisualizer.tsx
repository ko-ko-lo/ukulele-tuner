import React from "react";
import "../index.scss";
import "../styles/variables.scss";

interface AudioVisualizerProps {
  detectedPitch: string | null;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ detectedPitch }) => {
  return (
    <div>
      <h3 className={detectedPitch ? "hidden" : ""}>
        Pluck a string to start tuning.
      </h3>

      <div className="visualizer-container">
        <div className="audio-visualizer">
          {[...Array(5)].map((_, index) => (
            <div key={`left-${index}`} className="audio-bar"></div>
          ))}

          <div className={`audio-center ${detectedPitch ? "active" : ""}`}>
            {detectedPitch ? (
              <span>{detectedPitch}</span>
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
