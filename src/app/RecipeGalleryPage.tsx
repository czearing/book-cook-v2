"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useRecipes } from "@/clientToServer/hooks/useRecipes";
import { Button, RecipeCardGallery } from "@/components";
import type { Recipe } from "@/components/RecipeView/RecipeView.types";
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

  const {
    recipes,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useRecipes({
    filters: { query: searchValue, tags },
  });

  const onRecipeClick = useCallback(
    (recipe: Recipe) =>
      router.push(`/recipes/${encodeURIComponent(recipe._id)}`),
    [router],
  );

  return (
    <section
      className={styles.page}
      aria-busy={isLoading || isFetchingNextPage}
    >
      <RecipeGalleryControls
        searchValue={searchValue}
        tagsValue={tagsValue}
        onSearchChange={setSearchValue}
        onTagsChange={setTagsValue}
      />
      {recipes.length > 0 ? (
        <>
          <RecipeCardGallery
            title="Featured recipes"
            recipes={recipes}
            onRecipeClick={onRecipeClick}
          />
          {hasNextPage ? (
            <div className={styles.pager}>
              <Button
                variant="secondary"
                isLoading={isFetchingNextPage}
                onClick={() => fetchNextPage()}
              >
                Load more
              </Button>
            </div>
          ) : null}
        </>
      ) : isLoading ? null : (
        <p className={styles.empty}>No recipes found.</p>
      )}
    </section>
  );
};
