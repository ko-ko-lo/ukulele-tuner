import React from "react";
import * as Tone from "tone";

interface MicAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGrantAccess: () => Promise<void>;
}

const MicAccessModal: React.FC<MicAccessModalProps> = ({
  isOpen,
  onClose,
  onGrantAccess,
}) => {
  if (!isOpen) return null;

  const handleGrantAccess = async () => {
    try {
      if (Tone.getContext().state === "suspended") {
        await Tone.start(); // Ensure AudioContext is resumed
      }
      await onGrantAccess(); // Request mic permissions
    } catch (error) {
      console.error("Error enabling microphone:", error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Microphone Access Needed</h2>
        <p>
          To help you tune your Ukulele, access to your microphone is needed.
        </p>
        <br />
        <p>
          It is used to detect the sound of your Ukulele Strings and provide
          real-time feedback.
        </p>
        <div className="button-group">
          <button className="btn-primary" onClick={handleGrantAccess}>
            Enable Microphone
          </button>
          <button className="btn-secondary" onClick={onClose}>
            Deny Access
          </button>
        </div>
      </div>
    </div>
  );
};

export default MicAccessModal;
