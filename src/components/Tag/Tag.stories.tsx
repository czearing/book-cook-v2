import type { Meta, StoryObj } from "@storybook/react";

import { Tag } from "./Tag";

const meta: Meta = {
  title: "Components/Tag",
  component: Tag,
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Tag>Spicy</Tag>
      <Tag>Comfort Food</Tag>
      <Tag>Vegetarian</Tag>
    </div>
  ),
};

export const Clickable: StoryObj = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Tag onClick={() => undefined}>Dinner</Tag>
      <Tag onClick={() => undefined}>Japanese</Tag>
      <Tag onClick={() => undefined}>Weeknight</Tag>
    </div>
  ),
};
