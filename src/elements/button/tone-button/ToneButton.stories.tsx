import type { Meta, StoryObj } from "@storybook/react";
import { ToneButton } from "./ToneButton";

const meta = {
  title: "Elements/Buttons/ToneButton",
  component: ToneButton,
} satisfies Meta<typeof ToneButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "C",
    isActive: false,
    onClick: () => console.log("Tone button clicked"),
  },
};
