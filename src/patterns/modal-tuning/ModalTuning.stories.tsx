import { Meta, StoryObj } from "@storybook/react-vite";
import ModalTuning from "./ModalTuning";

const meta = {
  title: "Patterns/Modal Tuning Options",
  component: ModalTuning,
} satisfies Meta<typeof ModalTuning>;

export default meta;

type Story = StoryObj<typeof ModalTuning>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log("Modal closed"),
    onSelectTuning: (id: string) => console.log("Selected tuning:", id),
    selectedTuning: "Standard",
  },
};
