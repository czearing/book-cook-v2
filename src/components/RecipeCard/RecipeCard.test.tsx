import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RecipeCard } from "./RecipeCard";
import type { Recipe } from "../RecipeView/RecipeView.types";

const recipe: Recipe = {
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

describe("RecipeCard", () => {
  it("renders as an article when not interactive", () => {
    const { container } = render(<RecipeCard recipe={recipe} />);

    expect(container.querySelector("article")).toBeInTheDocument();
  });

  it("renders as a button and calls onClick with the recipe", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<RecipeCard recipe={recipe} onClick={onClick} />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(onClick).toHaveBeenCalledWith(recipe);
  });

  it("shows creator and view count in the meta row", () => {
    render(<RecipeCard recipe={recipe} />);

    expect(screen.getByText("Avery Park")).toBeInTheDocument();
    expect(screen.getByText(/views/)).toBeInTheDocument();
  });

  it("renders emoji fallback when image is missing", () => {
    render(<RecipeCard recipe={{ ...recipe, imageURL: "" }} />);

    expect(screen.getByText("\ud83d\udc1f")).toBeInTheDocument();
  });
});
