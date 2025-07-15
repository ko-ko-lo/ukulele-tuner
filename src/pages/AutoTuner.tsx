import { useEffect, useState } from "react";
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
} from "../audio/tuner/tunerHelpers";
import { useMicAccess } from "../context/MicAccessContext";
import { MicPermissionManager } from "../context/MicPermissionManager";
import { TuningSelectorButton } from "../elements/button/tuning-selector-button/TuningSelectorButton";
import { Toast } from "../elements/toast/Toast";
import AudioVisualizer from "../patterns/audio-visualizer/AudioVisualizer";
import Modal from "../patterns/modal-tuning/ModalTuning";
import "../styles/index.scss";

const AutoTuner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showToast]);

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

  const requestMicAccess = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasMicAccess(true);
      setShowToast(true);
    } catch (err) {
      setHasMicAccess(false);
      setShowToast(true);
    }
  };

  return (
    <div className="centered-container">
      <MicPermissionManager />
      <h1>Let's Get Your Ukulele in Tune!</h1>

      <TuningSelectorButton
        selectedTuning={selectedTuning}
        tuningOptions={tuningOptions}
        onClick={() => setIsModalOpen(true)}
      />
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectTuning={(id) => {
          setSelectedTuning(id);
          setIsModalOpen(false);
        }}
        selectedTuning={selectedTuning}
      />

      {showToast && (
        <Toast
          message={
            hasMicAccess
              ? "Mic's on! Let's find your Ukulele's perfect pitch."
              : "Microphone access denied. Access is needed for Auto Tuning."
          }
          type={hasMicAccess ? "success" : "error"}
        />
      )}
    </div>
  );
};

export default AutoTuner;
