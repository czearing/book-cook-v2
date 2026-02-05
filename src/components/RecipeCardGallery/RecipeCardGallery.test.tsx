import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RecipeCardGallery } from "./RecipeCardGallery";
import type { Recipe } from "../RecipeView/RecipeView.types";

const baseRecipe: Recipe = {
  _id: "recipe_01",
  imageURL:
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=900&q=80",
  title: "Citrus Herb Salmon",
  createdAt: "2024-07-08T18:20:00Z",
  data: "## Ingredients\n- Salmon\n- Lemon\n- Herbs",
  tags: ["Weeknight", "Seafood", "High Protein", "Bright"],
  emoji: "\ud83d\udc1f",
  owner: "user_123",
  creatorName: "Avery Park",
  isPublic: true,
  savedCount: 1860,
  viewCount: 12043,
  publishedAt: "2024-07-12T10:00:00Z",
};

const recipes: Recipe[] = [
  baseRecipe,
  {
    ...baseRecipe,
    _id: "recipe_02",
    title: "Lemon Pepper Orzo",
    imageURL: "",
    emoji: "\ud83c\udf4b",
  },
];

describe("RecipeCardGallery", () => {
  it("returns null when there are no recipes", () => {
    const { container } = render(<RecipeCardGallery recipes={[]} />);

    expect(container.firstChild).toBeNull();
  });

  it("renders a title and list of cards", () => {
    render(<RecipeCardGallery title="Featured" recipes={recipes} />);

    expect(screen.getByText("Featured")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(recipes.length);
  });

  it("calls onRecipeClick when a card is clicked", async () => {
    const user = userEvent.setup();
    const onRecipeClick = jest.fn();

    render(
      <RecipeCardGallery recipes={recipes} onRecipeClick={onRecipeClick} />
    );

    await user.click(screen.getByRole("button", { name: recipes[0].title }));

    expect(onRecipeClick).toHaveBeenCalledWith(recipes[0]);
  });
});
