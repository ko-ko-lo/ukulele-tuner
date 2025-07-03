import React from "react";
import "../../index.scss";
import "../../styles/variables.scss";
import { tuningOptions } from "../audio/tuner/constants/tuningOptions";
import { ModalCloseButton } from "../ui/button/ModalCloseButton";
import { TuningOptionButton } from "../ui/button/TuningOptionButton";

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
        <ModalCloseButton onClick={onClose} />

        <ul>
          {tuningOptions.map((option) => (
            <li key={option.id}>
              <TuningOptionButton
                name={option.name}
                notes={option.notes}
                isSelected={option.id === selectedTuning}
                onClick={() => onSelectTuning(option.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
