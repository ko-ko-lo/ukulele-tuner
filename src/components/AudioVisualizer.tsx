import React from "react";
import { noteFrequencies } from "../constants/constants";
import "../index.scss";
import "../styles/variables.scss";

interface AudioVisualizerProps {
  detectedPitch: string | null;
  detectedPitchFrequency: number | null;
}

const TOLERANCE = 3; // Allowable Hz difference for "In Tune"

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  detectedPitch,
  detectedPitchFrequency,
}) => {
  let isTooLow = false;
  let isTooHigh = false;

  if (detectedPitch && detectedPitchFrequency) {
    const targetFrequency = noteFrequencies[detectedPitch];
    if (targetFrequency) {
      const difference = detectedPitchFrequency - targetFrequency;

      if (Math.abs(difference) > TOLERANCE) {
        if (difference > 0) {
          isTooHigh = true;
        } else {
          isTooLow = true;
        }
      }
    }
  }

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
              <img src="./notes.svg" alt="Musical Notes" />
            )}
          </div>

          {[...Array(5)].map((_, index) => (
            <div key={`right-${index}`} className="audio-bar"></div>
          ))}
        </div>

        <div className="audio-labels">
          <span className={`too-low ${isTooLow ? "highlight" : ""}`}>
            Too Low
          </span>
          <span className={`too-high ${isTooHigh ? "highlight" : ""}`}>
            Too High
          </span>
        </div>
      </div>
    </div>
  );
};

export default AudioVisualizer;
