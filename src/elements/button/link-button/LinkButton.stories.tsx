import { Meta, StoryObj } from "@storybook/react";
import { LinkButton } from "./LinkButton";

const meta = {
  title: "Elements/Buttons/Link",
  component: LinkButton,
  //tags: ["autodocs"],
} satisfies Meta<typeof LinkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Link: Story = {
  args: {
    children: "enable microphone access",
    onClick: () => console.log("LinkButton clicked"),
  },
};
