import { Meta, StoryObj } from "@storybook/react-vite";
import AudioVisualizer from "./AudioVisualizer";

const meta = {
  title: "Patterns/Audio Visualizer",
  component: AudioVisualizer,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AudioVisualizer>;

export default meta;

type Story = StoryObj<typeof AudioVisualizer>;

export const BaseExample: Story = {
  args: {
    detectedPitch: "A4",
    detectedPitchFrequency: 440,
    hasMicAccess: true,
    isTuned: false,
    onRequestMicAccess: () => console.log("Mic access requested"),
  },
};

export const StartTuning: Story = {
  args: {
    detectedPitch: null,
    detectedPitchFrequency: null,
    hasMicAccess: true,
    isTuned: false,
    onRequestMicAccess: () => console.log("Mic access requested"),
  },
};

export const Tuned: Story = {
  args: {
    detectedPitch: "E4",
    detectedPitchFrequency: 330,
    hasMicAccess: true,
    isTuned: true,
    onRequestMicAccess: () => console.log("Mic access requested"),
  },
};

export const FeedbackTooHigh: Story = {
  args: {
    detectedPitch: "G4",
    detectedPitchFrequency: 398, // A little sharp (vs G4 ≈ 392 Hz)
    hasMicAccess: true,
    isTuned: false,
    onRequestMicAccess: () => console.log("Mic access requested"),
  },
};

export const NoMicAccess: Story = {
  args: {
    detectedPitch: null,
    detectedPitchFrequency: null,
    hasMicAccess: false,
    isTuned: false,
    onRequestMicAccess: () => console.log("Mic access requested"),
  },
};
