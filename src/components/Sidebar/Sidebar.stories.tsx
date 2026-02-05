import type { Meta, StoryObj } from "@storybook/react";

import {
  BookOpenIcon,
  CalendarBlankIcon,
  CheckSquareIcon,
  GearIcon,
  HouseIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@phosphor-icons/react";

import { Sidebar, SidebarItem } from "./Sidebar";
import { MetaLabel, SectionHeading } from "../Typography";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: () => (
    <Sidebar>
      <div data-sidebar-collapsible="true">
        <SectionHeading>Nosh Kitchen</SectionHeading>
        <MetaLabel>Workspace</MetaLabel>
      </div>
      <SidebarItem icon={<MagnifyingGlassIcon size={18} />} label="Search" />
      <SidebarItem icon={<HouseIcon size={18} />} label="Home" active />
      <SidebarItem icon={<BookOpenIcon size={18} />} label="Recipes" />
      <SidebarItem icon={<PlusCircleIcon size={18} />} label="New Recipe" />
      <SidebarItem icon={<CalendarBlankIcon size={18} />} label="Meal Plan" />
      <SidebarItem icon={<CheckSquareIcon size={18} />} label="Grocery List" />
      <SidebarItem icon={<GearIcon size={18} />} label="Settings" />
    </Sidebar>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <Sidebar defaultCollapsed>
      <div data-sidebar-collapsible="true">
        <SectionHeading>Nosh Kitchen</SectionHeading>
        <MetaLabel>Workspace</MetaLabel>
      </div>
      <SidebarItem icon={<MagnifyingGlassIcon size={18} />} label="Search" />
      <SidebarItem icon={<HouseIcon size={18} />} label="Home" active />
      <SidebarItem icon={<BookOpenIcon size={18} />} label="Recipes" />
      <SidebarItem icon={<PlusCircleIcon size={18} />} label="New Recipe" />
      <SidebarItem icon={<CalendarBlankIcon size={18} />} label="Meal Plan" />
      <SidebarItem icon={<CheckSquareIcon size={18} />} label="Grocery List" />
      <SidebarItem icon={<GearIcon size={18} />} label="Settings" />
    </Sidebar>
  ),
};
