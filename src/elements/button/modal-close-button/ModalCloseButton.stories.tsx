import type { Meta, StoryObj } from "@storybook/react";
import { ModalCloseButton } from "./ModalCloseButton";

const meta = {
  title: "Elements/Buttons/Modal Close",
  component: ModalCloseButton,
} satisfies Meta<typeof ModalCloseButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ModalClose: Story = {
  args: {
    onClick: () => console.log("Modal button clicked"),
  },
};
