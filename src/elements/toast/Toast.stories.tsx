import { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast";

const meta = {
  title: "Elements/Toast Message",
  component: Toast,
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    message: "Mic's on! Let's find your Ukulele's perfect pitch.",
    type: "success",
  },
};

export const Error: Story = {
  args: {
    message: "Microphone access denied. Access is needed for Auto Tuning.",
    type: "error",
  },
};
