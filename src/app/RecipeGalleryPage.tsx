"use client";

import { useRouter } from "next/navigation";

import { RecipeCardGallery } from "@/components";
import { recipeGalleryRecipes } from "./recipes/recipeData";
import styles from "./RecipeGalleryPage.module.css";

export const RecipeGalleryPage = () => {
  const router = useRouter();

  return (
    <section className={styles.page}>
      <RecipeCardGallery
        title="Featured recipes"
        recipes={recipeGalleryRecipes}
        onRecipeClick={(recipe) => router.push(`/recipes/${recipe._id}`)}
      />
    </section>
  );
};
