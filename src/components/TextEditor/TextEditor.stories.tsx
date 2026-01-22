import type { Meta, StoryObj } from "@storybook/react";

import { TextEditor } from "./TextEditor";

const startingText = `
# Brown Butter Chocolate Chip Cookies

The ultimate chocolate chip cookie recipe featuring rich brown butter for a deep, nutty flavor and chewy texture.

## Ingredients

- 1 cup (225 g) unsalted butter
- 2 1/4 cups (280 g) all-purpose flour
- 3/4 teaspoon (3 g) baking soda
- 1 teaspoon baking powder
- 1/2 teaspoon salt
- 1 cup (200 g) packed brown sugar
- 1/2 cup (100 g) granulated sugar
- 1 large egg plus 1 egg yolk
- 2 teaspoons vanilla extract
- 1 cup (175 g) chocolate chips

## Instructions

1. **Melt Butter:** Melt butter in a saucepan over medium-high heat. Cook, swirling, until golden brown and nutty (takes around 5 minutes). Cool with an ice cube, then chill in the fridge for at least 20 minutes.
2. **Dry Ingredients:** Whisk together flour, baking soda, baking powder, and salt in a separate bowl.
3. **Mix Wet Ingredients:** In a stand mixer, whisk together on medium high speed granulated sugar, eggs, and vanilla until pale brownish-yellow and thick ribbons fall off the whisk when lifted (about 5 minutes).
4. **Combine Butter & Sugar:** Switch to the paddle attachment on your mixer. Add the cooled brown butter and brown sugar to the egg mixture. Mix on medium speed until combined, (about 15 seconds).
5. **Add Flour:** Add the flour mixture to the stand mixer. Mix on low speed just until you still see some dry flour, about 15 seconds.
6. **Add Chocolate:** Add the chocolate chips and mix on low speed until the dough just comes together, about 15 seconds.
7. **Chill the Dough:** Transfer the dough to an airtight container and refrigerate at least overnight, and up to 3 days. This allows the flavors to meld and the dough to hydrate for optimal texture.
8. **Prep Oven:** Preheat your oven to 325°F. Line baking sheets with parchment paper. Roll the dough into balls and place them 2 inches apart on the baking sheets.
9. **Bake:** Bake for 13-16 minutes, or until the edges are golden but the center is still soft.
10. **Cool:** Let them cool on the baking sheet for a few minutes before transferring to a wire rack to cool completely.
`;

const meta: Meta = {
  title: "Components/Text Editor",
};

export default meta;

export const Editable: StoryObj = {
  render: () => (
    <div style={{ height: "90vh" }}>
      <TextEditor text={startingText} />
    </div>
  ),
};

export const Viewer: StoryObj = {
  render: () => (
    <div style={{ height: "90vh" }}>
      <TextEditor text={startingText} viewingMode="viewer" />
    </div>
  ),
};
