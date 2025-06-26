import { useEffect, useState } from "react";
import AudioVisualizer from "../components/AudioVisualizer";
import { useMicAccess } from "../components/MicAccessContext";
import ModalTuning from "../components/ModalTuning";
import { useTheme } from "../components/ThemeContext";
import TonePitchDetector from "../components/TonePitchDetector";
import { noteFrequencies } from "../constants/note-frequencies";
import { tuningOptions } from "../constants/tuningOptions";
import "../index.scss";
import "../styles/variables.scss";

const AutoTuner = () => {
  const [isTuningModalOpen, setIsTuningModalOpen] = useState(false);
  const [selectedTuning, setSelectedTuning] = useState("standard");
  const currentNotes =
    tuningOptions.find((option) => option.id === selectedTuning)?.notes || [];

  const tuningFrequencies: Record<string, number> = {};

  const [lastDetectionTime, setLastDetectionTime] = useState<number | null>(
    null
  );

  const [isTuned, setIsTuned] = useState(false);
  const [tunedTimestamp, setTunedTimestamp] = useState<number | null>(null);

  const TOLERANCE = 7;

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
  // Number of consecutive stable detections required before trusting a note
  const SMOOTHING_THRESHOLD = 5;

  const isWithinNoteRange = (note: string, frequency: number) => {
    const target = noteFrequencies[note];
    if (!target) return false;

    const RANGE_BUFFER = 10; // You can tweak this
    return (
      frequency >= target - RANGE_BUFFER && frequency <= target + RANGE_BUFFER
    );
  };

  const handlePitchDetected = (pitchData: {
    note: string | null;
    frequency: number | null;
  }) => {
    const MIN_VALID_FREQUENCY = 100;

    let avgFrequency = 0;

    if (
      pitchData.note &&
      pitchData.frequency &&
      pitchData.frequency > MIN_VALID_FREQUENCY &&
      isWithinNoteRange(pitchData.note, pitchData.frequency)
    ) {
      recentFrequencies.push(pitchData.frequency);
      if (recentFrequencies.length > SMOOTHING_THRESHOLD) {
        recentFrequencies.shift();
      }

      avgFrequency =
        recentFrequencies.reduce((sum, freq) => sum + freq, 0) /
        recentFrequencies.length;

      const isStable =
        recentFrequencies.length >= SMOOTHING_THRESHOLD &&
        recentFrequencies.every((freq) => Math.abs(freq - avgFrequency) < 2);

      if (
        isStable &&
        pitchData.note &&
        Object.keys(tuningFrequencies).includes(pitchData.note)
      ) {
        const targetFreq = tuningFrequencies[pitchData.note];
        const deviation = Math.abs(avgFrequency - targetFreq);

        if (deviation <= TOLERANCE) {
          const now = Date.now();

          if (!tunedTimestamp) {
            setTunedTimestamp(now);
          } else if (now - tunedTimestamp >= 2000) {
            setIsTuned(true);
          }
        } else {
          setTunedTimestamp(null);
          setIsTuned(false);
        }

        setStabilizedPitch(pitchData.note);
        setStabilizedFrequency(avgFrequency);
        setLastDetectionTime(Date.now());
      }
    }
  };

  useEffect(() => {
    if (isTuned) {
      const timeout = setTimeout(() => {
        setIsTuned(false);
      }, 3000); // ⏱ hide after 3s

      return () => clearTimeout(timeout);
    }
  }, [isTuned]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastDetectionTime && Date.now() - lastDetectionTime > 1500) {
        setStabilizedPitch(null);
        setStabilizedFrequency(null);
        setIsTuned(false);
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
          // Firefox fallback: Try once to trigger permission prompt
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
        detectedPitch={stabilizedPitch}
        detectedPitchFrequency={stabilizedFrequency}
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
