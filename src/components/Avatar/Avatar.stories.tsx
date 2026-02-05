import type { Meta, StoryObj } from "@storybook/react";

import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    name: "Avery Park",
    imageURL:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80",
  },
};

export const Initials: Story = {
  args: {
    name: "Jordan Lee",
  },
};

export const Clickable: Story = {
  args: {
    name: "Riley Chen",
    onClick: () => undefined,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar name="Avery Park" size="sm" />
      <Avatar name="Avery Park" size="md" />
      <Avatar name="Avery Park" size="lg" />
    </div>
  ),
};
