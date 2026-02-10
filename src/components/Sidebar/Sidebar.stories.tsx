import type { Meta, StoryObj } from "@storybook/react";

import { Sidebar } from "./Sidebar";
import { SidebarContent } from "./SidebarContent";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: () => {
    return (
      <Sidebar profile={{ name: "Mia", meta: "Free" }}>
        <SidebarContent />
      </Sidebar>
    );
  },
};

export const Collapsed: Story = {
  render: () => {
    return (
      <Sidebar defaultCollapsed profile={{ name: "Mia", meta: "Free" }}>
        <SidebarContent />
      </Sidebar>
    );
  },
};
