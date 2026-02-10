import {
  EnvelopeSimpleIcon,
  MagnifyingGlassIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./Input";
import { Stack } from "../Stack";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "Recipe name",
    placeholder: "Best lasagna ever",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Author",
    placeholder: "Avery Park",
    description: "This shows up in the recipe header.",
  },
};

export const WithIcons: Story = {
  args: {
    label: "Search",
    placeholder: "Search recipes",
    startIcon: <MagnifyingGlassIcon size={16} />,
    endIcon: <EnvelopeSimpleIcon size={16} />,
  },
};

export const ErrorState: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    error: "Please enter a valid email address.",
    endIcon: <WarningCircleIcon size={16} />,
  },
};

export const Disabled: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack gap="sm">
      <Input size="sm" label="Small" placeholder="Small input" />
      <Input size="md" label="Medium" placeholder="Medium input" />
      <Input size="lg" label="Large" placeholder="Large input" />
    </Stack>
  ),
};

export const Ghost: Story = {
  render: () => (
    <div
      style={{
        padding: 16,
        borderBottom: "1px solid var(--ui-ControlBorder)",
        background: "var(--ui-Canvas)",
      }}
    >
      <Input
        variant="ghost"
        size="lg"
        placeholder="Search recipes..."
        aria-label="Search recipes"
        fullWidth
      />
    </div>
  ),
};
