# Recipes Page Layout Design

**Date:** 2026-02-22
**Status:** Approved

## Problem

The `/recipes` page has no padding between the app shell edge and its content, causing the
search controls to visually "touch" the top of the viewport. There is also no page title
to anchor the content visually. Padding is inconsistent across pages because the `AppShell`
main area has `padding: 0`.

## Goals

- Add consistent inset padding globally via `AppShell` so all pages benefit automatically.
- Add a page `<h1>` title to `/recipes` for visual hierarchy.
- Remove the hardcoded "Featured recipes" subtitle since the page title replaces it.
- Use only flexbox and gap-based spacing — no CSS Grid, no absolute/fixed positioning.
- Avoid feature additions (no new filters, no new layout variants, no infinite scroll).

## Design

### 1. AppShell global padding (`src/components/AppShell/AppShell.module.css`)

Change `.main` padding from `0` to `32px 40px` on desktop and `24px 20px` on mobile
(≤768px breakpoint). This is the only change to AppShell.

### 2. RecipeGalleryPage title (`src/app/RecipeGalleryPage.tsx`)

Add a `<h1>Recipes</h1>` heading as the first element inside the `<section>`. Remove
the `title="Featured recipes"` prop from `<RecipeCardGallery>` since the page heading
replaces it.

### 3. RecipeGalleryPage spacing (`src/app/RecipeGalleryPage.module.css`)

- Increase `.page` gap from `24px` to `32px` to give more breathing room between heading,
  controls, and the card grid.
- Add a `.heading` style: `margin: 0`, appropriate font-size and weight matching the design
  system's heading scale.

## Files Changed

| File | Change |
|---|---|
| `src/components/AppShell/AppShell.module.css` | `padding: 32px 40px` on `.main`; `24px 20px` on mobile |
| `src/app/RecipeGalleryPage.tsx` | Add `<h1>`, remove `title` prop from `RecipeCardGallery` |
| `src/app/RecipeGalleryPage.module.css` | Increase gap to `32px`, add `.heading` styles |

## Out of Scope

- Tag picker / chip UI component
- Skeleton loading states
- Card layout changes
- Pagination changes
- Any other pages besides the global AppShell padding fix
