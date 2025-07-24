import { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import { PageLayout } from "../../layout/PageLayout";
import ManualTuner from "./ManualTuner";

const meta = {
  title: "Pages/Manual Tuner",
  component: ManualTuner,
} satisfies Meta<typeof ManualTuner>;

export default meta;

type Story = StoryObj<typeof ManualTuner>;

export const Default: Story = {
  render: () => (
    <MemoryRouter initialEntries={["/manual"]}>
      <PageLayout>
        <ManualTuner />
      </PageLayout>
    </MemoryRouter>
  ),
};
