import { useState } from "react";
import Modal from "../components/Modal";
import { tuningOptions } from "../constants/tuningOptions";
import "../index.scss";
import "../styles/variables.scss";

const AutoTuner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="centered-container">
      <h1>Let's Get Your Ukulele in Tune!</h1>
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
    </div>
  );
};

export default AutoTuner;
