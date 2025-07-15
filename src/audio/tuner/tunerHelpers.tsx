import { noteFrequencies } from "./constants/note-frequencies";

export const isWithinNoteRange = (note: string, frequency: number): boolean => {
  const target = noteFrequencies[note];
  if (!target) return false;

  const RANGE_BUFFER = 6; // Acceptable range ± Hz
  return (
    frequency >= target - RANGE_BUFFER && frequency <= target + RANGE_BUFFER
  );
};

export const calculateAverageFrequency = (frequencies: number[]): number => {
  if (frequencies.length === 0) return 0;
  const sum = frequencies.reduce((acc, val) => acc + val, 0);
  return sum / frequencies.length;
};

export const isStablePitch = (
  frequencies: number[],
  threshold: number,
  allowedVariance: number
): boolean => {
  if (frequencies.length < threshold) return false;

  const avg = calculateAverageFrequency(frequencies);
  return frequencies.every((f) => Math.abs(f - avg) < allowedVariance);
};

export const getTuningFrequenciesFor = (
  notes: string[]
): Record<string, number> => {
  const freqs: Record<string, number> = {};
  notes.forEach((note) => {
    if (noteFrequencies[note]) {
      freqs[note] = noteFrequencies[note];
    }
  });
  return freqs;
};
