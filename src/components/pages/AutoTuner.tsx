import { useEffect, useState } from "react";
import "../../index.scss";
import "../../styles/variables.scss";
import TonePitchDetector from "../audio/TonePitchDetector";
import {
  TOLERANCE,
  noteFrequencies,
} from "../audio/tuner/constants/note-frequencies";
import { tuningOptions } from "../audio/tuner/constants/tuningOptions";
import {
  calculateAverageFrequency,
  getTuningFrequenciesFor,
  isStablePitch,
  isWithinNoteRange,
} from "../audio/tuner/tunerHelpers";
import { useMicAccess } from "../context/MicAccessContext";
import { useTheme } from "../context/ThemeContext";
import AudioVisualizer from "../patterns/AudioVisualizer";
import ModalTuning from "../patterns/ModalTuning";

const AutoTuner = () => {
  const [isTuningModalOpen, setIsTuningModalOpen] = useState(false);
  const [selectedTuning, setSelectedTuning] = useState("standard");
  const currentNotes =
    tuningOptions.find((option) => option.id === selectedTuning)?.notes || [];

  const tuningFrequencies = getTuningFrequenciesFor(currentNotes);

  const [lastDetectionTime, setLastDetectionTime] = useState<number | null>(
    null
  );
  const [isTuned, setIsTuned] = useState(false);
  const [tunedTimestamp, setTunedTimestamp] = useState<number | null>(null);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);

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
  const [lockedPitch, setLockedPitch] = useState<string | null>(null);
  const [lockedFrequency, setLockedFrequency] = useState<number | null>(null);

  const recentFrequencies: number[] = [];
  const SMOOTHING_THRESHOLD = 5;

  const handlePitchDetected = (pitchData: {
    note: string | null;
    frequency: number | null;
  }) => {
    const MIN_VALID_FREQUENCY = 100;
    let avgFrequency = 0;

    // New
    if (
      pitchData.note &&
      pitchData.frequency &&
      pitchData.frequency > 100 &&
      isWithinNoteRange(pitchData.note, pitchData.frequency)
    ) {
      // 🎯 Proceed with smoothing and tuning logic
    } else {
      // ❌ Invalid input — wipe state to prevent false positives
      setTunedTimestamp(null);
      setIsTuned(false);
    }

    if (
      pitchData.note &&
      pitchData.frequency &&
      pitchData.frequency > MIN_VALID_FREQUENCY &&
      Object.keys(tuningFrequencies).includes(pitchData.note)
    ) {
      recentFrequencies.push(pitchData.frequency);
      if (recentFrequencies.length > SMOOTHING_THRESHOLD) {
        recentFrequencies.shift();
      }

      avgFrequency = calculateAverageFrequency(recentFrequencies);

      const isStable = isStablePitch(recentFrequencies, SMOOTHING_THRESHOLD, 2);

      if (isStable) {
        setStabilizedPitch(pitchData.note);
        setStabilizedFrequency(avgFrequency);
        setLastDetectionTime(Date.now());

        const targetFreq = noteFrequencies[pitchData.note];
        const deviation = Math.abs(avgFrequency - targetFreq);
        const now = Date.now();

        if (deviation <= TOLERANCE && (!cooldownUntil || now > cooldownUntil)) {
          if (!tunedTimestamp) {
            setTunedTimestamp(now);
          } else if (now - tunedTimestamp >= 500) {
            setIsTuned(true);
            setLockedPitch(pitchData.note);
            setLockedFrequency(avgFrequency);
            setCooldownUntil(now + 2500);
          }
        } else {
          setTunedTimestamp(null);
          setIsTuned(false);
        }
      }
    }
  };

  useEffect(() => {
    if (isTuned) {
      const timeout = setTimeout(() => {
        setIsTuned(false);
        setLockedPitch(null);
        setLockedFrequency(null);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isTuned]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastDetectionTime && Date.now() - lastDetectionTime > 1500) {
        setStabilizedPitch(null);
        setStabilizedFrequency(null);
        setIsTuned(false);
        setLockedPitch(null);
        setLockedFrequency(null);
        recentFrequencies.length = 0;
      }
    }, 500);

    return () => clearInterval(interval);
  }, [lastDetectionTime]);

  useEffect(() => {
    const checkMicPermissions = async () => {
      try {
        const status = await navigator.permissions.query({
          name: "microphone" as PermissionName,
        });

        if (status.state === "granted") {
          setHasMicAccess(true);
        } else if (status.state === "denied") {
          setHasMicAccess(false);
        } else {
          try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            setHasMicAccess(true);
          } catch {
            setHasMicAccess(false);
          }
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
        detectedPitch={isTuned ? lockedPitch : stabilizedPitch}
        detectedPitchFrequency={isTuned ? lockedFrequency : stabilizedFrequency}
        hasMicAccess={hasMicAccess}
        onRequestMicAccess={requestMicAccess}
        isTuned={isTuned}
      />

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
