import React from "react";
import { tuningOptions } from "../constants/tuningOptions";
import "../index.scss";
import "../styles/variables.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
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
              <h3>{option.name}</h3>
              <p>{option.notes.join("-")}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
