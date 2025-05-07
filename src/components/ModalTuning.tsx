import React from "react";
import { tuningOptions } from "../constants/tuningOptions";
import "../index.scss";
import "../styles/variables.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTuning: (id: string) => void;
  selectedTuning: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSelectTuning,
  selectedTuning,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <ul>
          {tuningOptions.map((option) => (
            <li key={option.id}>
              <button
                onClick={() => onSelectTuning(option.id)}
                className={`tuning-option${
                  option.id === selectedTuning ? " selected" : ""
                }`}
              >
                <h3>{option.name}</h3>
                <p>{option.notes.join(" - ")}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
