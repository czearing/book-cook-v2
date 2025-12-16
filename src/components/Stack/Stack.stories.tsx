import type { Meta, StoryObj } from "@storybook/react";

import { Stack } from "./Stack";
import { RecipeTitle, BodyText, SectionLabel, MetaLabel } from "../Typography";

const meta: Meta<typeof Stack> = {
  title: "Components/Stack",
  component: Stack,
  argTypes: {
    direction: {
      control: "radio",
      options: ["row", "column"],
    },
    gap: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch", "baseline"],
    },
    wrap: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Stack>;

// 1. Interactive Playground
export const Default: Story = {
  args: {
    gap: "md",
    direction: "column",
    align: "start",
  },
  render: (args) => (
    <Stack {...args}>
      <SectionLabel>Category</SectionLabel>
      <RecipeTitle>Classic Tiramisu</RecipeTitle>
      <BodyText>
        Coffee-flavoured Italian dessert. It is made of ladyfingers dipped in
        coffee, layered with a whipped mixture of eggs, sugar, and mascarpone.
      </BodyText>
      <MetaLabel>Italian • 45 mins</MetaLabel>
    </Stack>
  ),
};

// 2. Real-world Composition (Nested Stacks)
export const RecipeHeader: Story = {
  render: () => (
    <Stack gap="md" align="start">
      {/* Header Group */}
      <Stack gap="sm">
        <RecipeTitle>Spaghetti Carbonara</RecipeTitle>

        {/* Horizontal Meta Data */}
        <Stack direction="row" gap="sm" align="center">
          <MetaLabel>Pasta</MetaLabel>
          <MetaLabel>•</MetaLabel>
          <MetaLabel>20 min cook</MetaLabel>
        </Stack>
      </Stack>

      {/* Description */}
      <Stack gap="xs">
        <SectionLabel>Description</SectionLabel>
        <BodyText>
          An authentic Roman dish made with eggs, hard cheese, cured pork, and
          black pepper.
        </BodyText>
      </Stack>
    </Stack>
  ),
};
