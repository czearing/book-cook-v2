import type { Meta, StoryObj } from "@storybook/react";

import {
  RecipeTitle,
  FocusStep,
  BodyText,
  SectionLabel,
  MetaLabel,
} from "./Typography";

const meta: Meta = {
  title: "Components/Typography",
};

export default meta;

export const Showcase: StoryObj = {
  render: () => (
    <div style={{ display: "grid", gap: "20px", maxWidth: "600px" }}>
      {/* 1. Header & Meta */}
      <header>
        <RecipeTitle>Grandma’s Lasagna</RecipeTitle>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <MetaLabel>⏱ 45 min</MetaLabel>
          <MetaLabel>•</MetaLabel>
          <MetaLabel>Serves 4</MetaLabel>
        </div>
      </header>

      {/* 2. Inventory (Sans-Serif) */}
      <section>
        <SectionLabel>Ingredients</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <BodyText>1½ cups whole milk</BodyText>
          <BodyText>2 cloves garlic, minced</BodyText>
        </div>
      </section>

      {/* 3. Story (Serif) */}
      <section>
        <SectionLabel>Instructions</SectionLabel>
        <BodyText>
          Bring the sauce to a gentle simmer, then reduce the heat and cook for
          20 minutes, stirring occasionally.
        </BodyText>
      </section>

      {/* 4. Active Mode (Large Serif) */}
      {/* <section>
        <SectionLabel>Focus Mode</SectionLabel>
        <FocusStep>
          Add the tomatoes and let simmer gently for 10 minutes.
        </FocusStep>
      </section> */}
    </div>
  ),
};
