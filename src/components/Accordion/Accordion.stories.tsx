import type { Meta, StoryObj } from "@storybook/react";

import { Accordion } from "./Accordion";
import type { AccordionItem } from "./Accordion.types";
import { BodyText } from "../Typography";

const items: AccordionItem[] = [
  {
    value: "ingredients",
    title: "Ingredients",
    content: (
      <>
        <BodyText as="p">2 cups all-purpose flour</BodyText>
        <BodyText as="p">1 tbsp sugar</BodyText>
        <BodyText as="p">1 tsp sea salt</BodyText>
      </>
    ),
  },
  {
    value: "steps",
    title: "Steps",
    content: (
      <>
        <BodyText as="p">Whisk dry ingredients together.</BodyText>
        <BodyText as="p">Add wet ingredients and mix until smooth.</BodyText>
        <BodyText as="p">Cook on a hot skillet until golden.</BodyText>
      </>
    ),
  },
  {
    value: "notes",
    title: "Notes",
    content: (
      <BodyText as="p">
        Batter keeps in the fridge for up to two days.
      </BodyText>
    ),
  },
];

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    items,
    defaultValue: "ingredients",
  },
};

export const Multiple: Story = {
  args: {
    items,
    type: "multiple",
    defaultValue: ["ingredients", "notes"],
  },
};

export const WithDisabledItem: Story = {
  args: {
    items: items.map((item) =>
      item.value === "steps" ? { ...item, disabled: true } : item
    ),
  },
};

const sidebarStyleItems: AccordionItem[] = [
  {
    value: "library",
    title: "Library",
    content: (
      <div style={{ display: "grid", gap: 6 }}>
        <BodyText as="span">Your recipes</BodyText>
        <BodyText as="span">Recent collections</BodyText>
        <BodyText as="span">Saved drafts</BodyText>
      </div>
    ),
  },
  {
    value: "favorites",
    title: "Favorites",
    content: (
      <div style={{ display: "grid", gap: 6 }}>
        <BodyText as="span">Quick dinners</BodyText>
        <BodyText as="span">Weekend bakes</BodyText>
        <BodyText as="span">Seasonal drinks</BodyText>
      </div>
    ),
  },
  {
    value: "planning",
    title: "Planning",
    content: (
      <div style={{ display: "grid", gap: 6 }}>
        <BodyText as="span">Weekly menu</BodyText>
        <BodyText as="span">Grocery checklist</BodyText>
      </div>
    ),
  },
];

export const SidebarList: Story = {
  args: {
    items: sidebarStyleItems,
    defaultValue: "library",
  },
};
