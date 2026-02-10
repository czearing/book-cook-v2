import { useState } from "react";
import {
  CookingPotIcon,
  FireIcon,
  LeafIcon,
  TimerIcon,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";

import {
  Dropdown,
  DropdownCaret,
  DropdownContent,
  DropdownGroup,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownTrigger,
  DropdownValue,
} from "./Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("newest");

    return (
      <Dropdown value={value} onValueChange={setValue}>
        <DropdownTrigger aria-label="Sort recipes">
          <DropdownValue placeholder="Sort recipes" />
          <DropdownCaret />
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem value="newest">Newest</DropdownItem>
          <DropdownItem value="oldest">Oldest</DropdownItem>
          <DropdownItem value="quickest">Quickest</DropdownItem>
        </DropdownContent>
      </Dropdown>
    );
  },
};

export const WithGroupsAndDescriptions: Story = {
  render: () => {
    const [value, setValue] = useState("comfort");

    return (
      <div style={{ width: 280 }}>
        <Dropdown value={value} onValueChange={setValue}>
          <DropdownTrigger fullWidth aria-label="Choose a cooking mode">
            <DropdownValue placeholder="Choose a cooking mode" />
            <DropdownCaret />
          </DropdownTrigger>
          <DropdownContent>
            <DropdownGroup>
              <DropdownLabel>Modes</DropdownLabel>
              <DropdownItem
                value="comfort"
                startIcon={<CookingPotIcon size={16} />}
                description="Balanced guidance"
              >
                Comfort
              </DropdownItem>
              <DropdownItem
                value="quick"
                startIcon={<TimerIcon size={16} />}
                description="Fast and simple"
              >
                Quick
              </DropdownItem>
            </DropdownGroup>
            <DropdownSeparator />
            <DropdownGroup>
              <DropdownLabel>Focus</DropdownLabel>
              <DropdownItem
                value="spicy"
                startIcon={<FireIcon size={16} />}
                description="High heat steps"
              >
                Spicy focus
              </DropdownItem>
              <DropdownItem
                value="fresh"
                startIcon={<LeafIcon size={16} />}
                description="Seasonal ingredients"
              >
                Fresh focus
              </DropdownItem>
            </DropdownGroup>
          </DropdownContent>
        </Dropdown>
      </div>
    );
  },
};
