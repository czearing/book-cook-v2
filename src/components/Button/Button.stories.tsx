import {
  CameraIcon,
  LinkIcon,
  PencilSimpleIcon,
  ShareNetworkIcon,
  DotsThreeIcon,
  MagicWandIcon,
  CookingPotIcon,
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
export const ActionChips: Story = {
  render: () => (
    <Stack direction="row" gap="sm">
      <Button
        variant="secondary"
        shape="pill"
        size="sm"
        startIcon={<CameraIcon size={18} weight="duotone" />}
      >
        Scan
      </Button>
      <Button
        variant="secondary"
        shape="pill"
        size="sm"
        startIcon={<LinkIcon size={18} weight="duotone" />}
      >
        Paste
      </Button>
      <Button
        variant="secondary"
        shape="pill"
        size="sm"
        startIcon={<PencilSimpleIcon size={18} weight="duotone" />}
      >
        Draft
      </Button>
    </Stack>
  ),
};

// 2. Recipe Header
export const HeaderActions: Story = {
  render: () => (
    <Stack direction="row" gap="xs">
      <Button
        variant="ghost"
        size="sm"
        startIcon={<ShareNetworkIcon size={18} />}
      >
        Share
      </Button>
      <Button
        variant="ghost"
        size="sm"
        startIcon={<PencilSimpleIcon size={18} />}
      >
        Edit
      </Button>
      <Button variant="ghost" size="sm" shape="square">
        <DotsThreeIcon size={24} weight="bold" />
      </Button>
    </Stack>
  ),
};

// 3. Focus Cook Mode
export const StartCooking: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Stack gap="md">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          startIcon={<CookingPotIcon size={20} weight="fill" />}
        >
          Start Cooking
        </Button>
        <Button
          variant="secondary"
          fullWidth
          startIcon={<MagicWandIcon size={20} weight="duotone" />}
        >
          Adjust with AI
        </Button>
      </Stack>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Stack direction="row" gap="sm">
      <Button variant="primary" disabled>
        Primary
      </Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="ghost" disabled>
        Ghost
      </Button>
      <Button variant="destructive" disabled>
        Destructive
      </Button>
    </Stack>
  ),
};
