import {
  Camera,
  Link,
  PencilSimple, // Phosphor uses "Simple" for that clean Notion pencil look
  ShareNetwork, // More detailed share icon
  DotsThree, // Classier than the "More" circle
  Play,
  MagicWand, // "Sparkles" equivalent, looks more magical
  CookingPot, // Bonus: A specific cooking icon
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";
import { Stack } from "../Stack";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

// 1. Home Page "Input Hub"
// USAGE: weight="duotone" adds a subtle 20% opacity fill.
// It feels much more tactile, like a real object.
export const ActionChips: Story = {
  render: () => (
    <Stack direction="row" gap="sm">
      <Button
        variant="secondary"
        shape="pill"
        size="sm"
        startIcon={<Camera size={18} weight="duotone" />}
      >
        Scan
      </Button>
      <Button
        variant="secondary"
        shape="pill"
        size="sm"
        startIcon={<Link size={18} weight="duotone" />}
      >
        Paste
      </Button>
      <Button
        variant="secondary"
        shape="pill"
        size="sm"
        startIcon={<PencilSimple size={18} weight="duotone" />}
      >
        Draft
      </Button>
    </Stack>
  ),
};

// 2. Recipe Header
// USAGE: weight="regular" or "light" keeps these unobtrusive.
export const HeaderActions: Story = {
  render: () => (
    <Stack direction="row" gap="xs">
      <Button variant="ghost" size="sm" startIcon={<ShareNetwork size={18} />}>
        Share
      </Button>
      <Button variant="ghost" size="sm" startIcon={<PencilSimple size={18} />}>
        Edit
      </Button>
      <Button variant="ghost" size="sm" shape="square">
        <DotsThree size={24} weight="bold" />
      </Button>
    </Stack>
  ),
};

// 3. Focus Cook Mode (The "Step Up")
// The Fill weight on the Play button makes it feel much heavier and clickable.
export const StartCooking: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Stack gap="md">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          startIcon={<CookingPot size={20} weight="fill" />}
        >
          Start Cooking
        </Button>
        <Button
          variant="secondary"
          fullWidth
          startIcon={<MagicWand size={20} weight="duotone" />}
        >
          Adjust with AI
        </Button>
      </Stack>
    </div>
  ),
};
