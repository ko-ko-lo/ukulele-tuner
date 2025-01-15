import { useState } from "react";
import Modal from "../components/ModalTuning";
import "../index.scss";
import "../styles/variables.scss";

const AutoTuner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="centered-container">
      <h1>Let's Get Your Ukulele in Tune!</h1>
      <button id="secondary" onClick={() => setIsModalOpen(true)}>
        Standard Tuning
        <img src="/arrow-down.svg" alt="Arrow Down" className="arrow-icon" />
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default AutoTuner;
