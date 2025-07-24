import { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import { MicAccessProvider } from "../../context/MicAccessContext";
import PageLayout from "../../layout/PageLayout";
import AutoTuner from "./AutoTuner";

const meta = {
  title: "Pages/Auto Tuner",
  component: AutoTuner,
} satisfies Meta<typeof AutoTuner>;

export default meta;

type Story = StoryObj<typeof AutoTuner>;

export const Default: Story = {
  render: () => (
    <MemoryRouter initialEntries={["/manual"]}>
      <MicAccessProvider>
        <PageLayout>
          <AutoTuner />
        </PageLayout>
      </MicAccessProvider>
    </MemoryRouter>
  ),
};
