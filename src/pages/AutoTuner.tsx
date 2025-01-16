import { useEffect, useState } from "react";
import { useMicAccess } from "../components/MicAccessContext";
import ModalMicAccess from "../components/ModalMicAccess";
import ModalTuning from "../components/ModalTuning";
import "../index.scss";
import "../styles/variables.scss";

const AutoTuner = () => {
  const [isTuningModalOpen, setIsTuningModalOpen] = useState(false);
  const { hasMicAccess, setHasMicAccess } = useMicAccess();
  const [showToast, setShowToast] = useState(false);
  const [isMicAccessModalOpen, setIsMicAccessModalOpen] = useState(false);

  useEffect(() => {
    const checkMicPermissions = async () => {
      try {
        const permissionStatus = await navigator.permissions.query({
          name: "microphone" as PermissionName,
        });
        if (permissionStatus.state === "granted") {
          setHasMicAccess(true);
          setIsMicAccessModalOpen(false);
        } else if (permissionStatus.state === "denied") {
          setHasMicAccess(false);
          setIsMicAccessModalOpen(false);
        } else {
          setHasMicAccess(null);
          setIsMicAccessModalOpen(true);
        }
      } catch (err) {
        console.error("Error checking microphone permissions:", err);
      }
    };

    checkMicPermissions();
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

  const handleDenyAccess = () => {
    console.log("User denied microphone access.");
    setHasMicAccess(false);
    setIsMicAccessModalOpen(false);
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
