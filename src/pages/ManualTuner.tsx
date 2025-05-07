import { useState } from "react";
import * as Tone from "tone";
import Modal from "../components/ModalTuning";
import { useTheme } from "../components/ThemeContext";
import { tuningOptions } from "../constants/tuningOptions";
import "../index.scss";
import "../styles/variables.scss";

const ManualTuner = () => {
  const { theme } = useTheme();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeNote, setActiveNote] = useState<string | null>(null);

  // Tracks the id of the currently active tuning
  const [selectedTuning, setSelectedTuning] = useState("standard");

  // Reflects the currently selected tuning
  const currentTuning = tuningOptions.find(
    (option) => option.id === selectedTuning
  )?.notes;

  const selectedTuningName = tuningOptions.find(
    (option) => option.id === selectedTuning
  )?.name;

  const playNote = async (frequency: string) => {
    setActiveNote(frequency);
    const synth = new Tone.Synth().toDestination();

    await Tone.start();

    // Each button plays a note using Tone.js
    synth.triggerAttackRelease(frequency, "1s");

    setTimeout(() => setActiveNote(null), 1000);
  };

  return (
    <div>
      <h1>Press a button to guide your tuning.</h1>

      <button id="secondary" onClick={() => setIsModalOpen(true)}>
        {selectedTuningName}
        <img
          src={theme === "dark" ? "/arrow-down.svg" : "/arrow-down-light.svg"}
          alt=""
          className="arrow-icon"
        />
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectTuning={(id) => {
          setSelectedTuning(id);
          setIsModalOpen(false);
        }}
        selectedTuning={selectedTuning}
      />
      <div className="manual-tuner">
        <div className="tone-lines">
          {currentTuning &&
            currentTuning.map((frequency) => (
              <div
                className={`tone-line ${
                  activeNote === frequency ? "active" : ""
                }`}
                key={frequency}
              >
                <button
                  className={`tone-button ${
                    activeNote === frequency ? "active" : ""
                  }`}
                  onClick={() => playNote(frequency)}
                >
                  {frequency.slice(0, 1)}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManualTuner;
