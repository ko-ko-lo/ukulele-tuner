import { useEffect } from "react";

interface PitchDetectorProps {
  onPitchDetected: (pitch: string | null) => void;
}

const PitchDetector: React.FC<PitchDetectorProps> = ({ onPitchDetected }) => {
  useEffect(() => {
    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let source: MediaStreamAudioSourceNode | null = null;
    let animationFrameId: number;

    const startPitchDetection = async () => {
      try {
        audioContext = new (window.AudioContext || window.AudioContext)();
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        source = audioContext.createMediaStreamSource(stream);

        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        source.connect(analyser);

        const bufferLength = analyser.fftSize;
        const dataArray = new Float32Array(bufferLength);

        const detectPitch = () => {
          analyser?.getFloatTimeDomainData(dataArray);
          const pitch = autoCorrelate(dataArray, audioContext!.sampleRate);

          if (pitch !== -1) {
            const closestNote = getClosestNote(pitch);
            onPitchDetected(closestNote);
          } else {
            onPitchDetected(null);
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
      if (audioContext) {
        audioContext.close();
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (source) {
        source.disconnect();
      }
    };
  }, [onPitchDetected]);

  // Autocorrelation algorithm to detect pitch
  const autoCorrelate = (buffer: Float32Array, sampleRate: number): number => {
    let size = buffer.length;
    let maxSamples = Math.floor(size / 2);
    let bestOffset = -1;
    let bestCorrelation = 0;
    let rms = 0;

    for (let i = 0; i < size; i++) {
      let val = buffer[i];
      rms += val * val;
    }
    rms = Math.sqrt(rms / size);
    if (rms < 0.01) return -1;

    for (let offset = 0; offset < maxSamples; offset++) {
      let correlation = 0;
      for (let i = 0; i < maxSamples; i++) {
        correlation += buffer[i] * buffer[i + offset];
      }

      if (correlation > bestCorrelation) {
        bestCorrelation = correlation;
        bestOffset = offset;
      }
    }

    if (bestCorrelation > 0.9) {
      let frequency = sampleRate / bestOffset;
      return frequency;
    }

    return -1;
  };

  // Map detected frequency to closest ukulele note
  const noteFrequencies: Record<string, number> = {
    G4: 392.0,
    C4: 261.63,
    E4: 329.63,
    A4: 440.0,
  };

  const getClosestNote = (pitch: number): string => {
    let closestNote = "";
    let closestDiff = Infinity;

    Object.entries(noteFrequencies).forEach(([note, freq]) => {
      const diff = Math.abs(pitch - freq);
      if (diff < closestDiff) {
        closestNote = note;
        closestDiff = diff;
      }
    });

    return closestNote;
  };

  return null; // The component doesn't render any UI
};

export default PitchDetector;
