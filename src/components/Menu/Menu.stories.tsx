import { useState } from "react";
import {
  DotsThreeIcon,
  MagicWandIcon,
  PencilSimpleIcon,
  ShareNetworkIcon,
  CookingPotIcon,
  UserCircleIcon,
  GearSixIcon,
  QuestionIcon,
  SignOutIcon,
  CrownIcon,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";

import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from "./Menu";
import { Avatar } from "../Avatar";
import { Button } from "../Button";

const meta: Meta<typeof Menu> = {
  title: "Components/Menu",
  component: Menu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: () => (
    <Menu>
      <MenuTrigger asChild>
        <Button variant="secondary" startIcon={<DotsThreeIcon size={18} />}>
          Actions
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuLabel>Recipe</MenuLabel>
        <MenuItem startIcon={<PencilSimpleIcon size={16} />} shortcut="Ctrl+E">
          Edit
        </MenuItem>
        <MenuItem startIcon={<ShareNetworkIcon size={16} />}>
          Share
        </MenuItem>
        <MenuItem startIcon={<MagicWandIcon size={16} />}>
          Improve with AI
        </MenuItem>
        <MenuSeparator />
        <MenuItem inset>Duplicate</MenuItem>
        <MenuItem disabled inset>
          Archive
        </MenuItem>
      </MenuContent>
    </Menu>
  ),
};

export const WithChecksAndRadios: Story = {
  render: () => {
    const MenuStory = () => {
      const [showNotes, setShowNotes] = useState(true);
      const [showTimers, setShowTimers] = useState(false);
      const [sortOrder, setSortOrder] = useState("newest");

      return (
        <Menu>
          <MenuTrigger asChild>
            <Button variant="secondary">View options</Button>
          </MenuTrigger>
          <MenuContent>
            <MenuLabel>Display</MenuLabel>
            <MenuCheckboxItem
              checked={showNotes}
              onCheckedChange={(checked) => setShowNotes(checked === true)}
            >
              Notes
            </MenuCheckboxItem>
            <MenuCheckboxItem
              checked={showTimers}
              onCheckedChange={(checked) => setShowTimers(checked === true)}
            >
              Timers
            </MenuCheckboxItem>
            <MenuSeparator />
            <MenuLabel>Sort by</MenuLabel>
            <MenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
              <MenuRadioItem value="newest">Newest</MenuRadioItem>
              <MenuRadioItem value="oldest">Oldest</MenuRadioItem>
              <MenuRadioItem value="shortest">Shortest</MenuRadioItem>
            </MenuRadioGroup>
          </MenuContent>
        </Menu>
      );
    };

    return <MenuStory />;
  },
};

export const WithSubmenu: Story = {
  render: () => (
    <Menu>
      <MenuTrigger asChild>
        <Button variant="secondary">Cook mode</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem startIcon={<CookingPotIcon size={16} />}>
          Start cooking
        </MenuItem>
        <MenuSub>
          <MenuSubTrigger startIcon={<CookingPotIcon size={16} />}>
            Focus options
          </MenuSubTrigger>
          <MenuSubContent>
            <MenuItem inset>Step-by-step</MenuItem>
            <MenuItem inset>Timer friendly</MenuItem>
            <MenuItem inset>Hands-free</MenuItem>
          </MenuSubContent>
        </MenuSub>
        <MenuSeparator />
        <MenuItem inset>Exit cook mode</MenuItem>
      </MenuContent>
    </Menu>
  ),
};

export const UserMenu: Story = {
  render: () => (
    <Menu>
      <MenuTrigger asChild>
        <button
          type="button"
          aria-label="Open account menu"
          style={{
            padding: 0,
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          <Avatar name="Avery Wallace" size="sm" />
        </button>
      </MenuTrigger>
      <MenuContent align="end">
        <MenuLabel>Account</MenuLabel>
        <MenuItem startIcon={<UserCircleIcon size={16} />}>
          Profile & settings
        </MenuItem>
        <MenuItem startIcon={<GearSixIcon size={16} />}>
          Preferences
        </MenuItem>
        <MenuSeparator />
        <MenuItem startIcon={<CrownIcon size={16} />}>Upgrade plan</MenuItem>
        <MenuItem startIcon={<QuestionIcon size={16} />}>
          Help center
        </MenuItem>
        <MenuSeparator />
        <MenuItem startIcon={<SignOutIcon size={16} />}>Sign out</MenuItem>
      </MenuContent>
    </Menu>
  ),
};
