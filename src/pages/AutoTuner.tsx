import { useEffect, useState } from "react";
import ModalMicAccess from "../components/ModalMicAccess";
import ModalTuning from "../components/ModalTuning";
import "../index.scss";
import "../styles/variables.scss";

const AutoTuner = () => {
  const [isTuningModalOpen, setIsTuningModalOpen] = useState(false);
  const [isMicAccessModalOpen, setIsMicAccessModalOpen] = useState(false);
  const [hasMicAccess, setHasMicAccess] = useState<boolean | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const micAccessGranted = localStorage.getItem("micAccess") === "granted";
    setIsMicAccessModalOpen(!micAccessGranted);
  }, []);

  const requestMicAccess = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Microphone access granted!");
      setHasMicAccess(true);
      setShowToast(true);
      setIsMicAccessModalOpen(false);
    } catch (err) {
      console.error("Microphone access denied:", err);
      setHasMicAccess(false);
      setShowToast(true);
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleDenyAccess = () => {
    console.log("User denied microphone access.");
    setIsMicAccessModalOpen(false);
    setHasMicAccess(false);
    setShowToast(true);
    localStorage.setItem("micAccess", "denied");
  };

  return (
    <div className="centered-container">
      <h1>Let's Get Your Ukulele in Tune!</h1>

      <button id="secondary" onClick={() => setIsTuningModalOpen(true)}>
        Standard Tuning
        <img src="/arrow-down.svg" alt="Arrow Down" className="arrow-icon" />
      </button>

      <ModalTuning
        isOpen={isTuningModalOpen}
        onClose={() => setIsTuningModalOpen(false)}
      />

      <ModalMicAccess
        isOpen={isMicAccessModalOpen}
        onClose={handleDenyAccess}
        onGrantAccess={requestMicAccess}
      />

      {showToast && (
        <div className={`toast ${hasMicAccess ? "success" : "error"}`}>
          {hasMicAccess
            ? "Mic's on! Let's find your Ukulele's perfect pitch."
            : "Microphone access denied. Access is needed for Auto Tuning."}
        </div>
      )}
    </div>
  );
};

export default AutoTuner;
