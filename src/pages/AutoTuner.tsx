import { useEffect, useState } from "react";
import ModalMicAccess from "../components/ModalMicAccess";
import ModalTuning from "../components/ModalTuning";
import "../index.scss";
import "../styles/variables.scss";

const AutoTuner = () => {
  const [isTuningModalOpen, setIsTuningModalOpen] = useState(false);
  const [isMicAccessModalOpen, setIsMicAccessModalOpen] = useState(false);
  const [hasMicAccess, setHasMicAccess] = useState<boolean | null>(null);

  useEffect(() => {
    // Check localStorage for mic access status
    const micAccessGranted = localStorage.getItem("micAccess") === "granted";
    setIsMicAccessModalOpen(!micAccessGranted);
  }, []);

  const requestMicAccess = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Microphone access granted!");
      setHasMicAccess(true);
      setIsMicAccessModalOpen(false);
      localStorage.setItem("micAccess", "granted"); // Save status in localStorage
    } catch (err) {
      console.error("Microphone access denied:", err);
      setHasMicAccess(false);
    }
  };

  const handleDenyAccess = () => {
    console.log("User denied microphone access.");
    setIsMicAccessModalOpen(false);
    setHasMicAccess(false);
    localStorage.setItem("micAccess", "denied"); // Save denial status in localStorage
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

      {hasMicAccess === true && (
        <p>Microphone access granted! Starting tuner...</p>
      )}
      {hasMicAccess === false && (
        <p>Microphone access denied. Please enable it to use the auto tuner.</p>
      )}
    </div>
  );
};

export default AutoTuner;
