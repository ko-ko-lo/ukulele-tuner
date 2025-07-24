import { Meta, StoryObj } from "@storybook/react-vite";
import { ToneLines } from "./ToneLines";

const meta = {
  title: "Elements/Strings",
  component: ToneLines,
  argTypes: {
    children: { control: false }, // Hide from Controls panel
  },
} satisfies Meta<typeof ToneLines>;

export default meta;

type Story = StoryObj<typeof ToneLines>;

export const Default: Story = {
  args: {
    isActive: false,
  },
};

export const Active: Story = {
  args: {
    isActive: true,
  },
};
