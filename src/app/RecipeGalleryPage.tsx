"use client";

import { useRouter } from "next/navigation";

import { RecipeCardGallery } from "@/components";
import { useRecipes } from "@/clientToServer/hooks/useRecipes";
import styles from "./RecipeGalleryPage.module.css";

export const RecipeGalleryPage = () => {
  const router = useRouter();
  const { data: recipes = [], isLoading } = useRecipes();

  return (
    <section className={styles.page} aria-busy={isLoading}>
      <RecipeCardGallery
        title="Featured recipes"
        recipes={recipes}
        onRecipeClick={(recipe) => router.push(`/recipes/${recipe._id}`)}
      />
    </section>
  );
};
