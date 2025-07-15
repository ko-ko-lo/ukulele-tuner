import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "../../context/ThemeContext";
import { Logo } from "./Logo";

const meta = {
  title: "Elements/Logo",
  component: Logo,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AlohaTune: Story = {};
