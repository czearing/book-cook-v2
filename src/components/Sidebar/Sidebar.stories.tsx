import { useState } from "react";
import {
  BookOpenIcon,
  CompassIcon,
  FileTextIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";

import { Sidebar } from "./Sidebar";
import { SidebarItem } from "./SidebarItem";
import { SidebarSection } from "./SidebarSection";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: () => {
    const [activeItem, setActiveItem] = useState("Spicy Miso Ramen");

    return (
      <Sidebar profile={{ name: "Mia", meta: "Free" }}>
        <SidebarItem
          icon={<PlusCircleIcon size={18} />}
          label="New recipe"
          active={activeItem === "New recipe"}
          onClick={() => setActiveItem("New recipe")}
        />
        <SidebarItem
          icon={<MagnifyingGlassIcon size={18} />}
          label="Search"
          active={activeItem === "Search"}
          onClick={() => setActiveItem("Search")}
        />
        <SidebarItem
          icon={<CompassIcon size={18} />}
          label="Discover"
          active={activeItem === "Discover"}
          onClick={() => setActiveItem("Discover")}
        />
        <SidebarSection label="Library">
          <SidebarSection
            label="Your recipes"
            variant="item"
            icon={<BookOpenIcon size={18} />}
          >
            <SidebarItem
              depth={1}
              icon={<FileTextIcon size={16} />}
              label="Spicy Miso Ramen"
              active={activeItem === "Spicy Miso Ramen"}
              onClick={() => setActiveItem("Spicy Miso Ramen")}
            />
            <SidebarItem
              depth={1}
              icon={<FileTextIcon size={16} />}
              label="Avocado Toast"
              active={activeItem === "Avocado Toast"}
              onClick={() => setActiveItem("Avocado Toast")}
            />
            <SidebarItem
              depth={1}
              icon={<FileTextIcon size={16} />}
              label="Sheet Pan Salmon"
              active={activeItem === "Sheet Pan Salmon"}
              onClick={() => setActiveItem("Sheet Pan Salmon")}
            />
          </SidebarSection>
          <SidebarSection
            label="Your favorites"
            variant="item"
            icon={<HeartIcon size={18} />}
          >
            <SidebarItem
              depth={1}
              icon={<FileTextIcon size={16} />}
              label="Green Power Smoothie"
              active={activeItem === "Green Power Smoothie"}
              onClick={() => setActiveItem("Green Power Smoothie")}
            />
            <SidebarItem
              depth={1}
              icon={<FileTextIcon size={16} />}
              label="Classic Carbonara"
              active={activeItem === "Classic Carbonara"}
              onClick={() => setActiveItem("Classic Carbonara")}
            />
          </SidebarSection>
        </SidebarSection>
      </Sidebar>
    );
  },
};

export const Collapsed: Story = {
  render: () => {
    const [activeItem, setActiveItem] = useState("Spicy Miso Ramen");

    return (
      <Sidebar defaultCollapsed profile={{ name: "Mia", meta: "Free" }}>
        <SidebarItem
          icon={<PlusCircleIcon size={18} />}
          label="New recipe"
          active={activeItem === "New recipe"}
          onClick={() => setActiveItem("New recipe")}
        />
        <SidebarItem
          icon={<MagnifyingGlassIcon size={18} />}
          label="Search"
          active={activeItem === "Search"}
          onClick={() => setActiveItem("Search")}
        />
        <SidebarItem
          icon={<CompassIcon size={18} />}
          label="Discover"
          active={activeItem === "Discover"}
          onClick={() => setActiveItem("Discover")}
        />
        <SidebarSection label="Library">
          <SidebarSection
            label="Your recipes"
            variant="item"
            icon={<BookOpenIcon size={18} />}
          >
            <SidebarItem
              depth={1}
              icon={<FileTextIcon size={16} />}
              label="Spicy Miso Ramen"
              active={activeItem === "Spicy Miso Ramen"}
              onClick={() => setActiveItem("Spicy Miso Ramen")}
            />
            <SidebarItem
              depth={1}
              icon={<FileTextIcon size={16} />}
              label="Avocado Toast"
              active={activeItem === "Avocado Toast"}
              onClick={() => setActiveItem("Avocado Toast")}
            />
          </SidebarSection>
          <SidebarSection
            label="Your favorites"
            variant="item"
            icon={<HeartIcon size={18} />}
          >
            <SidebarItem
              depth={1}
              icon={<FileTextIcon size={16} />}
              label="Green Power Smoothie"
              active={activeItem === "Green Power Smoothie"}
              onClick={() => setActiveItem("Green Power Smoothie")}
            />
          </SidebarSection>
        </SidebarSection>
      </Sidebar>
    );
  },
};
