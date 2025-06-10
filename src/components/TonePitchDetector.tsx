import { useEffect } from "react";
import * as Tone from "tone";

/* ------------------------------------------------------------------
  - this TS interface defines the props that the component expects to receive.
  - onPitchDetected is a function that takes an object with note and frequency,
  and returns nothing.
------------------------------------------------------------------ */

interface TonePitchDetectorProps {
  onPitchDetected: (pitch: {
    note: string | null;
    frequency: number | null;
  }) => void;
  tuningFrequencies: Record<string, number>;
}

/* ------------------------------------------------------------------
  - defining a React functional component with TypeScript
    - creating a constant variable named TonePitchDetector (this variable is the component)
    - This constant variable is a React Functional Component (React.FC)
      that expects props described by the TonePitchDetectorProps interface.
------------------------------------------------------------------ */

const TonePitchDetector: React.FC<TonePitchDetectorProps> = ({
  onPitchDetected,
  tuningFrequencies,
}) => {
  useEffect(() => {
    let mic: Tone.UserMedia | null = null;
    let analyser: Tone.Analyser | null = null;
    let animationFrameId: number;

    const startPitchDetection = async () => {
      try {
        await Tone.start();
        mic = new Tone.UserMedia();
        await mic.open();

        analyser = new Tone.Analyser("fft", 1024);
        mic.connect(analyser);

        const detectPitch = () => {
          if (analyser) {
            const frequencyData = analyser.getValue() as Float32Array;
            const pitch = getDominantFrequency(
              frequencyData,
              Tone.getContext().sampleRate
            );

            if (pitch > 0) {
              const closestNote = getClosestNote(pitch);
              if (closestNote) {
                onPitchDetected({ note: closestNote, frequency: pitch });
              } else {
                onPitchDetected({ note: null, frequency: null });
              }
            } else {
              onPitchDetected({ note: null, frequency: null });
            }
          }
          animationFrameId = requestAnimationFrame(detectPitch);
        };

        detectPitch();
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    };

    startPitchDetection();

    return () => {
      if (mic) {
        mic.disconnect();
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [onPitchDetected, tuningFrequencies]);

  // Find the dominant frequency by analyzing the FFT spectrum
  const getDominantFrequency = (
    frequencyData: Float32Array,
    sampleRate: number
  ): number => {
    //  Root Mean Square (RMS) threshold
    let rms = 0;

    for (let i = 0; i < frequencyData.length; i++) {
      rms += frequencyData[i] * frequencyData[i];
    }
    rms = Math.sqrt(rms / frequencyData.length);

    // treat this as silence
    if (rms < 0.06) return -1;
    console.log("RMS:", rms);

    let maxIndex = 0;
    let maxValue = -Infinity;

    const minIndex = Math.floor(50 / (sampleRate / frequencyData.length));
    const maxIndexLimit = Math.floor(
      1000 / (sampleRate / frequencyData.length)
    );

    for (let i = minIndex; i < maxIndexLimit; i++) {
      if (frequencyData[i] > maxValue) {
        maxValue = frequencyData[i];
        maxIndex = i;
      }
    }

    return (sampleRate / 2) * (maxIndex / frequencyData.length);
  };

  // Map detected frequency to closest ukulele note
  const getClosestNote = (pitch: number): string | null => {
    if (pitch < 50 || pitch > 1000) return null;

    let closestNote: string | null = null;
    let closestDiff = Infinity;

    Object.entries(tuningFrequencies).forEach(([note, freq]) => {
      const diff = Math.abs(pitch - freq);
      if (diff < closestDiff) {
        closestNote = note;
        closestDiff = diff;
      }
    });

    return closestDiff < 10 ? closestNote : null;
  };

  return null;
};

export default TonePitchDetector;
