"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useRecipes } from "@/clientToServer/hooks/useRecipes";
import { RecipeCardGallery } from "@/components";
import { RecipeGalleryControls } from "./RecipeGalleryControls";
import styles from "./RecipeGalleryPage.module.css";

export const RecipeGalleryPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [tagsValue, setTagsValue] = useState("");

  useEffect(() => {
    const queryParam = searchParams?.get("q") ?? "";
    const tagsParam = searchParams?.get("tags") ?? "";

    setSearchValue((prev) => (prev === queryParam ? prev : queryParam));
    setTagsValue((prev) => (prev === tagsParam ? prev : tagsParam));
  }, [searchParams]);

  const tags = useMemo(
    () =>
      tagsValue
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    [tagsValue],
  );

  const { data: recipes = [], isLoading } = useRecipes({
    filters: { query: searchValue, tags },
  });

  return (
    <section className={styles.page} aria-busy={isLoading}>
      <RecipeGalleryControls
        searchValue={searchValue}
        tagsValue={tagsValue}
        onSearchChange={setSearchValue}
        onTagsChange={setTagsValue}
      />
      <RecipeCardGallery
        title="Featured recipes"
        recipes={recipes}
        onRecipeClick={(recipe) => router.push(`/recipes/${recipe._id}`)}
      />
    </section>
  );
};
