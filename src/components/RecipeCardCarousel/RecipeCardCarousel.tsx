"use client";

import type { KeyboardEvent } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { clsx } from "clsx";
import useEmblaCarousel from "embla-carousel-react";

import styles from "./RecipeCardCarousel.module.css";
import type { RecipeCardCarouselProps } from "./RecipeCardCarousel.types";
import { Button } from "../Button";
import { RecipeCard } from "../RecipeCard";
import { SubsectionHeading } from "../Typography";

export const RecipeCardCarousel = ({
  title,
  recipes,
  onRecipeClick,
  className,
  cardClassName,
  showMeta = true,
  ariaLabel,
  emblaOptions,
}: RecipeCardCarouselProps) => {
  const hasRecipes = recipes.length > 0;

  const options = useMemo(
    () => ({
      align: "start",
      containScroll: "trimSnaps",
      ...emblaOptions,
    }),
    [emblaOptions]
  );

  const [viewportRef, emblaApi] = useEmblaCarousel(options);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    if (!emblaApi) {
      return;
    }
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }
    updateScrollState();
    emblaApi.on("select", updateScrollState);
    emblaApi.on("reInit", updateScrollState);
    return () => {
      emblaApi.off("select", updateScrollState);
      emblaApi.off("reInit", updateScrollState);
    };
  }, [emblaApi, updateScrollState]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!emblaApi) {
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        emblaApi.scrollPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        emblaApi.scrollNext();
      }
      if (event.key === "Home") {
        event.preventDefault();
        emblaApi.scrollTo(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        const lastIndex = emblaApi.scrollSnapList().length - 1;
        if (lastIndex >= 0) {
          emblaApi.scrollTo(lastIndex);
        }
      }
    },
    [emblaApi]
  );

  const controlsVisible = recipes.length > 1 && (canScrollPrev || canScrollNext);
  const resolvedAriaLabel = ariaLabel ?? title ?? "Recipe carousel";
  const showHeader = Boolean(title) || controlsVisible;

  if (!hasRecipes) {
    return null;
  }

  return (
    <div
      className={clsx(styles.carousel, className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={resolvedAriaLabel}
    >
      {showHeader && (
        <div className={styles.header}>
          {title ? (
            <SubsectionHeading className={styles.title}>
              {title}
            </SubsectionHeading>
          ) : (
            <span />
          )}
          {controlsVisible && (
            <div className={styles.controls} aria-label="Carousel controls">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                shape="square"
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                aria-label="Scroll left"
              >
                <span aria-hidden="true">←</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                shape="square"
                onClick={scrollNext}
                disabled={!canScrollNext}
                aria-label="Scroll right"
              >
                <span aria-hidden="true">→</span>
              </Button>
            </div>
          )}
        </div>
      )}
      <div
        className={styles.viewport}
        ref={viewportRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <ul className={styles.track} role="list">
          {recipes.map((recipe) => (
            <li key={recipe._id} className={styles.item}>
              <RecipeCard
                recipe={recipe}
                onClick={onRecipeClick}
                showMeta={showMeta}
                className={cardClassName}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
