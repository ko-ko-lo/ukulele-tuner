import type { Meta, StoryObj } from "@storybook/react";
import { TuningOptionButton } from "./TuningOptionButton";

const meta = {
  title: "Elements/Buttons/Tuning Option",
  component: TuningOptionButton,
} satisfies Meta<typeof TuningOptionButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TuningOption: Story = {
  args: {
    name: "Standard",
    notes: ["G", "C", "E", "A"],
    isSelected: false,
    onClick: () => console.log("Tuning option clicked"),
  },
};
