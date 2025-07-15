import type { Meta, StoryObj } from "@storybook/react";
import { ThemeToggleButton } from "./ThemeToggleButton";

const meta = {
  title: "Elements/Buttons/Theme Toggle",
  component: ThemeToggleButton,
} satisfies Meta<typeof ThemeToggleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ThemeToggle: Story = {
  args: {
    theme: "dark",
    onToggle: () => console.log("Theme toggled"),
  },
};
