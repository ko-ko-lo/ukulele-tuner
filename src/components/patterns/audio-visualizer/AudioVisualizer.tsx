/* ------------------------------------------------------------------
  AudioVisualizer.tsx

  This component visually displays pitch detection feedback during automatic tuning.
  It receives the detected note and frequency, compares it to the target frequency,
  and highlights whether the note is "Too Low", "Too High", or "In Tune".
  It also renders a visual bar layout with the detected note at the center.

  Functions:
  - Inline conditional logic that compares
    the detected frequency with the correct frequency from noteFrequencies.

  UI Behavior:
  - Displays a default "Pluck a string" message when no pitch is detected.
  - Displays a note name when one is detected.
  - Highlights “Too Low” or “Too High” based on the pitch analysis.

------------------------------------------------------------------ */

import React from "react";
import "../../../styles/index.scss";
import {
  TOLERANCE,
  noteFrequencies,
} from "../../audio/tuner/constants/note-frequencies";
import { LinkButton } from "../../ui/button/link-button/LinkButton";
import "./AudioVisualizer.scss";

interface AudioVisualizerProps {
  // The musical note detected (e.g., "C4", "A4"). If null, no pitch is shown.
  detectedPitch: string | null;
  // The frequency in Hz of the detected pitch. Used to determine pitch accuracy.
  detectedPitchFrequency: number | null;
  hasMicAccess: boolean | null;
  isTuned: boolean;
  onRequestMicAccess: () => void;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  detectedPitch,
  detectedPitchFrequency,
  hasMicAccess,
  onRequestMicAccess,
  isTuned,
}) => {
  let deviation = 0;
  let offsetBars = 0;
  let isTooLow = false;
  let isTooHigh = false;

  // compares the detected pitch frequency to the expected frequency of the target note,
  // and decides if the note is too low, too high or in tune.

  // Make sure both values exist, null means no tone was detected yet.
  if (detectedPitch && detectedPitchFrequency) {
    // Look up the correct (target) frequency
    const targetFrequency = noteFrequencies[detectedPitch];
    if (targetFrequency) {
      // Compare detected frequency to target (difference > 0 = too high, difference < 0 = too low,
      // if the difference is small, the note is in tune)
      deviation = detectedPitchFrequency - targetFrequency;
      // This prevents feedback from jumping too fast due to tiny differences.
      if (Math.abs(deviation) > TOLERANCE) {
        offsetBars = Math.min(5, Math.floor(Math.abs(deviation) / 2));
        if (deviation > 0) isTooHigh = true;
        else isTooLow = true;
      }
    }
  }

  return (
    <div id="audio-visualizer">
      <h3
        className={
          detectedPitch && !isTuned
            ? "hidden"
            : isTuned
            ? "success-message"
            : ""
        }
      >
        {hasMicAccess === false ? (
          <>
            To use the tuner, please{" "}
            <LinkButton onClick={onRequestMicAccess}>
              enable microphone access
            </LinkButton>
            .
          </>
        ) : isTuned ? (
          "String Tuned!"
        ) : (
          "Pluck a string to start tuning."
        )}
      </h3>

      <div className="visualizer-container">
        <div className="audio-visualizer">
          {[...Array(5)].map((_, index) => (
            <div
              key={`left-${index}`}
              className={`audio-bar ${
                isTooLow && offsetBars > index ? "highlight" : ""
              }`}
            ></div>
          ))}

          <div
            className={`audio-center ${detectedPitch ? "active" : ""} ${
              isTuned ? "tuned" : ""
            }`}
          >
            {detectedPitch ? (
              <span>{detectedPitch}</span>
            ) : (
              <img src="./notes.svg" alt="Musical Notes" />
            )}
          </div>

          {[...Array(5)].map((_, index) => (
            <div
              key={`right-${index}`}
              className={`audio-bar ${
                isTooHigh && offsetBars > index ? "highlight" : ""
              }`}
            ></div>
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
