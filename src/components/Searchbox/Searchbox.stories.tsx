import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";

import { Searchbox } from "./Searchbox";
import { Stack } from "../Stack";

const meta: Meta<typeof Searchbox> = {
  title: "Components/Searchbox",
  component: Searchbox,
};

export default meta;

type Story = StoryObj<typeof Searchbox>;

export const Default: Story = {
  args: {
    label: "Search",
    placeholder: "Search recipes",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Search",
    placeholder: "Search recipes",
    description: "Search by recipe name, ingredient, or notes.",
  },
};

export const WithIcons: Story = {
  args: {
    label: "Search",
    placeholder: "Search recipes",
    startIcon: <MagnifyingGlassIcon size={16} />,
  },
};

export const ErrorState: Story = {
  args: {
    label: "Search",
    placeholder: "Search recipes",
    error: "Please enter at least 2 characters.",
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack gap="sm">
      <Searchbox size="sm" label="Small" placeholder="Small search" />
      <Searchbox size="md" label="Medium" placeholder="Medium search" />
      <Searchbox size="lg" label="Large" placeholder="Large search" />
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
      <Searchbox
        variant="ghost"
        size="lg"
        placeholder="Search recipes..."
        aria-label="Search recipes"
        fullWidth
      />
    </div>
  ),
};

export const WithClear: Story = {
  args: {
    label: "Search",
    placeholder: "Search recipes",
    defaultValue: "pasta",
  },
};
