import { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import ModeToggle from "./ModeToggle";

const meta = {
  title: "Elements/Mode Toggle",
  component: ModeToggle,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof ModeToggle>;

export default meta;

type Story = StoryObj<typeof ModeToggle>;

export const AutoManualToggle: Story = {};
