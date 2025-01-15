import { useState } from "react";
import * as Tone from "tone";
import Modal from "../components/ModalTuning";
import { tuningOptions } from "../constants/tuningOptions";
import "../index.scss";
import "../styles/variables.scss";

const ManualTuner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeNote, setActiveNote] = useState<string | null>(null);

  const standardTuning = tuningOptions.find(
    (option) => option.id === "standard"
  )?.notes;

  const playNote = async (frequency: string) => {
    setActiveNote(frequency);
    const synth = new Tone.Synth().toDestination();

    await Tone.start();

    synth.triggerAttackRelease(frequency, "1s");

    setTimeout(() => setActiveNote(null), 1000);
  };

  return (
    <div>
      <h1>Press a button to guide your tuning.</h1>

      <button id="secondary" onClick={() => setIsModalOpen(true)}>
        Standard Tuning
        <img src="/arrow-down.svg" alt="Arrow Down" className="arrow-icon" />
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="manual-tuner">
        <div className="tone-lines">
          {standardTuning &&
            standardTuning.map((frequency) => (
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
