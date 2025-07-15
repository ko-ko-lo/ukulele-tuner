import { Meta, StoryObj } from "@storybook/react";
import { TuningSelectorButton } from "./TuningSelectorButton";

const meta = {
  title: "Elements/Buttons/Tuning Selector",
  component: TuningSelectorButton,
} satisfies Meta<typeof TuningSelectorButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TuningSelector: Story = {
  args: {
    selectedTuning: "Standard Tuning",
    tuningOptions: [
      { id: "standard", name: "Standard Tuning" },
      { id: "low-g", name: "Low G Tuning" },
      { id: "baritone", name: "Baritone Tuning" },
      { id: "d-tuning", name: "D Tuning" },
    ],
    onClick: () => console.log("Tuning selector button clicked"),
  },
};
