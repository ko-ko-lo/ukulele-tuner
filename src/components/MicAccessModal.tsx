import React from "react";

interface MicAccessModalProps {
  onGrantAccess: () => void;
  onDenyAccess: () => void;
}

const MicAccessModal: React.FC<MicAccessModalProps> = ({
  onGrantAccess,
  onDenyAccess,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Microphone Access Needed</h2>
        <p>
          To help you tune your Ukulele, access to your microphone is needed.
        </p>
        <p>
          It is used to detect the sound of your Ukulele Strings and provide
          real-time feedback.
        </p>

        <button className="btn-primary" onClick={onGrantAccess}>
          Enable Microphone
        </button>
        <button className="btn-secondary" onClick={onDenyAccess}>
          Deny Access
        </button>
      </div>
    </div>
  );
};

export default MicAccessModal;
