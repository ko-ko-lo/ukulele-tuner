import { useState } from "react";
import * as Tone from "tone";
import Modal from "../components/Modal";
import { tuningOptions } from "../constants/tuningOptions";
import "../index.scss";
import "../styles/variables.scss";

const notes = [
  { name: "G", frequency: "G4" },
  { name: "C", frequency: "C4" },
  { name: "E", frequency: "E4" },
  { name: "A", frequency: "A4" },
];

const ManualTuner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeNote, setActiveNote] = useState<string | null>(null);

  const playNote = async (frequency: string) => {
    setActiveNote(frequency);
    const synth = new Tone.Synth().toDestination();

    // Ensure the audio context is started
    await Tone.start();

    // Trigger the note for 1 second
    synth.triggerAttackRelease(frequency, "1s");

    // Reset active note after the sound finishes
    setTimeout(() => setActiveNote(null), 1000);
  };

  return (
    <div>
      <h1>Press a button to guide your tuning.</h1>
      <button id="secondary" onClick={() => setIsModalOpen(true)}>
        Standard Tuning{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="arrow-icon"
        >
          <path
            fillRule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ul>
          {tuningOptions.map((option) => (
            <li key={option.id}>
              <h3>{option.name}</h3>
              <p>{option.notes.join("-")}</p>
            </li>
          ))}
        </ul>
      </Modal>

      <div className="manual-tuner">
        <div className="tone-lines">
          {notes.map(({ name, frequency }) => (
            <div
              className={`tone-line ${
                activeNote === frequency ? "active" : ""
              }`}
              key={name}
            >
              <button
                className={`tone-button ${
                  activeNote === frequency ? "active" : ""
                }`}
                onClick={() => playNote(frequency)}
              >
                {name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManualTuner;
