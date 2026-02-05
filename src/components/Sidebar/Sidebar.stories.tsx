import {
  BookOpenIcon,
  CaretDownIcon,
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
  render: () => (
    <Sidebar profile={{ name: "Mia", meta: "Guest" }}>
      <SidebarItem icon={<PlusCircleIcon size={18} />} label="New recipe" />
      <SidebarItem icon={<MagnifyingGlassIcon size={18} />} label="Search" />
      <SidebarItem icon={<CompassIcon size={18} />} label="Discover" />
      <SidebarSection label="Library" />
      <SidebarItem
        icon={<BookOpenIcon size={18} />}
        label="Your recipes"
        endAdornment={<CaretDownIcon size={14} />}
      />
      <SidebarItem
        depth={1}
        icon={<FileTextIcon size={16} />}
        label="Spicy Miso Ramen"
        active
      />
      <SidebarItem
        depth={1}
        icon={<FileTextIcon size={16} />}
        label="Avocado Toast"
      />
      <SidebarItem
        depth={1}
        icon={<FileTextIcon size={16} />}
        label="Sheet Pan Salmon"
      />
      <SidebarItem
        icon={<HeartIcon size={18} />}
        label="Your favorites"
        endAdornment={<CaretDownIcon size={14} />}
      />
      <SidebarItem
        depth={1}
        icon={<FileTextIcon size={16} />}
        label="Green Power Smoothie"
      />
      <SidebarItem
        depth={1}
        icon={<FileTextIcon size={16} />}
        label="Classic Carbonara"
      />
    </Sidebar>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <Sidebar defaultCollapsed profile={{ name: "Mia", meta: "Guest" }}>
      <SidebarItem icon={<PlusCircleIcon size={18} />} label="New recipe" />
      <SidebarItem icon={<MagnifyingGlassIcon size={18} />} label="Search" />
      <SidebarItem icon={<CompassIcon size={18} />} label="Discover" />
      <SidebarSection label="Library" />
      <SidebarItem
        icon={<BookOpenIcon size={18} />}
        label="Your recipes"
        endAdornment={<CaretDownIcon size={14} />}
      />
      <SidebarItem
        depth={1}
        icon={<FileTextIcon size={16} />}
        label="Spicy Miso Ramen"
        active
      />
      <SidebarItem
        depth={1}
        icon={<FileTextIcon size={16} />}
        label="Avocado Toast"
      />
      <SidebarItem
        icon={<HeartIcon size={18} />}
        label="Your favorites"
        endAdornment={<CaretDownIcon size={14} />}
      />
      <SidebarItem
        depth={1}
        icon={<FileTextIcon size={16} />}
        label="Green Power Smoothie"
      />
    </Sidebar>
  ),
};
