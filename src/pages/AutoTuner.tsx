import { useEffect, useState } from "react";
import AudioVisualizer from "../components/AudioVisualizer";
import { useMicAccess } from "../components/MicAccessContext";
import ModalTuning from "../components/ModalTuning";
import { useTheme } from "../components/ThemeContext";
import TonePitchDetector from "../components/TonePitchDetector";
import { noteFrequencies } from "../constants/constants";
import { tuningOptions } from "../constants/tuningOptions";
import "../index.scss";
import "../styles/variables.scss";

const AutoTuner = () => {
  const [isTuningModalOpen, setIsTuningModalOpen] = useState(false);
  const [selectedTuning, setSelectedTuning] = useState("standard");
  const currentNotes =
    tuningOptions.find((option) => option.id === selectedTuning)?.notes || [];

  const tuningFrequencies: Record<string, number> = {};

  currentNotes.forEach((note) => {
    if (noteFrequencies[note]) {
      tuningFrequencies[note] = noteFrequencies[note];
    }
  });

  const { hasMicAccess, setHasMicAccess } = useMicAccess();
  const [showToast, setShowToast] = useState(false);
  const { theme } = useTheme();
  const [stabilizedPitch, setStabilizedPitch] = useState<string | null>(null);
  const [stabilizedFrequency, setStabilizedFrequency] = useState<number | null>(
    null
  );

  const recentFrequencies: number[] = [];
  const SMOOTHING_THRESHOLD = 5; // Number of consecutive stable detections required

  const handlePitchDetected = (pitchData: {
    note: string | null;
    frequency: number | null;
  }) => {
    if (pitchData.note && pitchData.frequency) {
      recentFrequencies.push(pitchData.frequency);
      if (recentFrequencies.length > SMOOTHING_THRESHOLD) {
        recentFrequencies.shift();
      }

      // Calculate the average of the last few detected frequencies
      const avgFrequency =
        recentFrequencies.reduce((sum, freq) => sum + freq, 0) /
        recentFrequencies.length;

      // Only update if frequency is stable within ±2 Hz for consecutive readings
      if (
        recentFrequencies.length >= SMOOTHING_THRESHOLD &&
        recentFrequencies.every((freq) => Math.abs(freq - avgFrequency) < 2)
      ) {
        setStabilizedPitch(pitchData.note);
        setStabilizedFrequency(avgFrequency);
      }
    }
  };

  useEffect(() => {
    const checkMicPermissions = async () => {
      try {
        const status = await navigator.permissions.query({
          name: "microphone" as PermissionName,
        });
        if (status.state === "granted") {
          setHasMicAccess(true);
        } else {
          setHasMicAccess(false); // default to false (no access yet)
        }
      } catch (err) {
        console.error("Error checking microphone permissions:", err);
        setHasMicAccess(false);
      }
    };

    checkMicPermissions();
  }, [setHasMicAccess]);

  const requestMicAccess = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Microphone access granted!");
      setHasMicAccess(true);
      setShowToast(true);
    } catch (err) {
      console.error("Microphone access denied:", err);
      setHasMicAccess(false);
      setShowToast(true);
    }
  };

  return (
    <div className="centered-container">
      <h1>Let's Get Your Ukulele in Tune!</h1>

      <button id="secondary" onClick={() => setIsTuningModalOpen(true)}>
        {tuningOptions.find((option) => option.id === selectedTuning)?.name ||
          "Standard Tuning"}

        <img
          src={theme === "dark" ? "/arrow-down.svg" : "/arrow-down-light.svg"}
          alt=""
          className="arrow-icon"
        />
      </button>

      <TonePitchDetector
        onPitchDetected={handlePitchDetected}
        tuningFrequencies={tuningFrequencies}
      />

      <AudioVisualizer
        detectedPitch={stabilizedPitch}
        detectedPitchFrequency={stabilizedFrequency}
      />

      {hasMicAccess === false && (
        <div className="mic-access-inline-message">
          <p>To use the tuner, please allow microphone access.</p>
          <button className="btn-secondary" onClick={requestMicAccess}>
            Enable Microphone
          </button>
        </div>
      )}

      <ModalTuning
        isOpen={isTuningModalOpen}
        onClose={() => setIsTuningModalOpen(false)}
        onSelectTuning={(id) => {
          setSelectedTuning(id);
          setIsTuningModalOpen(false);
        }}
        selectedTuning={selectedTuning}
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
