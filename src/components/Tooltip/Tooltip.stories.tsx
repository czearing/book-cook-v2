import type { Meta, StoryObj } from "@storybook/react";

import { Tooltip } from "./Tooltip";
import { Button } from "../Button";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: "Saved to your Cookbook",
  },
  render: (args) => (
    <div style={{ padding: 80 }}>
      <Tooltip {...args}>
        <Button variant="secondary">Hover me</Button>
      </Tooltip>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div
      style={{
        padding: 80,
        display: "grid",
        gap: 24,
        gridTemplateColumns: "repeat(2, minmax(160px, 1fr))",
        maxWidth: 420,
      }}
    >
      <Tooltip content="Top" side="top">
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <Tooltip content="Right" side="right">
        <Button variant="secondary">Right</Button>
      </Tooltip>
      <Tooltip content="Bottom" side="bottom">
        <Button variant="secondary">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left" side="left">
        <Button variant="secondary">Left</Button>
      </Tooltip>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <div style={{ padding: 80, maxWidth: 360 }}>
      <Tooltip
        content="Use keyboard shortcuts to jump between steps and keep your hands clean while cooking."
      >
        <Button variant="secondary">Hover for details</Button>
      </Tooltip>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ padding: 80 }}>
      <Tooltip content="This will not show" disabled>
        <Button variant="secondary">Disabled tooltip</Button>
      </Tooltip>
    </div>
  ),
};
