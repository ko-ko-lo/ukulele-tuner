import { useState } from "react";
import * as Tone from "tone";
import "../../../index.scss";
import { tuningOptions } from "../../audio/tuner/constants/tuningOptions";
import Modal from "../../patterns/modal-tuning/ModalTuning";
import { ToneButton } from "../../ui/button/tone-button/ToneButton";
import { TuningSelectorButton } from "../../ui/button/tuning-selector-button/TuningSelectorButton";
import { ToneLines } from "../../ui/tone-lines/ToneLines";
import "./ManualTuner.scss";

const ManualTuner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeNote, setActiveNote] = useState<string | null>(null);

  // Tracks the id of the currently active tuning
  const [selectedTuning, setSelectedTuning] = useState("standard");

  const currentTuning = tuningOptions.find(
    (option) => option.id === selectedTuning
  )?.notes;

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

      <TuningSelectorButton
        selectedTuning={selectedTuning}
        tuningOptions={tuningOptions}
        onClick={() => setIsModalOpen(true)}
      />

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
              <ToneLines key={frequency} isActive={activeNote === frequency}>
                <ToneButton
                  label={frequency.slice(0, 1)}
                  isActive={activeNote === frequency}
                  onClick={() => playNote(frequency)}
                />
              </ToneLines>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManualTuner;
