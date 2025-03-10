import { useEffect } from "react";
import * as Tone from "tone";

interface TonePitchDetectorProps {
  onPitchDetected: (pitch: string | null) => void;
}

const TonePitchDetector: React.FC<TonePitchDetectorProps> = ({
  onPitchDetected,
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
              onPitchDetected(closestNote);
            } else {
              onPitchDetected(null);
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
  }, [onPitchDetected]);

  // Find the dominant frequency by analyzing the FFT spectrum
  const getDominantFrequency = (
    frequencyData: Float32Array,
    sampleRate: number
  ): number => {
    let rms = 0;

    // Calculate RMS (Root Mean Square) to measure signal strength
    for (let i = 0; i < frequencyData.length; i++) {
      rms += frequencyData[i] * frequencyData[i];
    }
    rms = Math.sqrt(rms / frequencyData.length);

    // If RMS is too low, ignore the input (likely noise or silence)
    if (rms < 0.02) return -1;

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
  const noteFrequencies: Record<string, number> = {
    G: 392.0,
    C: 261.63,
    E: 329.63,
    A: 440.0,
  };

  const getClosestNote = (pitch: number): string | null => {
    if (pitch < 50) return null; // Ignore very low frequencies

    let closestNote: string | null = null;
    let closestDiff = Infinity;

    Object.entries(noteFrequencies).forEach(([note, freq]) => {
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
