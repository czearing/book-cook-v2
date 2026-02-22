# Recipes Page Layout Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix the /recipes page layout so content has consistent inset padding and a clear page title anchors the visual hierarchy.

**Architecture:** Add `padding` to `AppShell.module.css` so all pages get consistent insets globally. Then update `RecipeGalleryPage` to render a `<PageTitle>` heading and increase the gap between sections.

**Tech Stack:** Next.js App Router, React 19, CSS Modules, flexbox + gap only (no CSS Grid).

---

## Background

### File map

| File | Role |
|---|---|
| `src/components/AppShell/AppShell.module.css` | Global shell — `.main` currently has `padding: 0` |
| `src/app/RecipeGalleryPage.tsx` | The recipes list page component |
| `src/app/RecipeGalleryPage.module.css` | Styles for the recipes list page |

### Key constraints

- **Flexbox + gap only** — no CSS Grid, no absolute/fixed positioning for layout.
- **200-line limit** on non-test source files.
- **`PageTitle`** is the correct component for page-level `<h1>`. It is exported from `@/components` (re-exported via `src/components/Typography/Typography.tsx`).
- Run `yarn lint` after each task. Max-warnings=0, must pass clean.
- Run `yarn build` at the end to confirm no type errors.

---

## Task 1: Add global padding to AppShell main

**Files:**
- Modify: `src/components/AppShell/AppShell.module.css`

### Step 1: Read the current file

Open `src/components/AppShell/AppShell.module.css`. Confirm `.main` currently reads:

```css
.main {
  flex: 1;
  min-width: 0;
  padding: 0;
  overflow-y: auto;
}
```

### Step 2: Apply the change

Replace `.main` with:

```css
.main {
  flex: 1;
  min-width: 0;
  padding: 32px 40px;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .main {
    padding: 24px 20px;
  }
}
```

### Step 3: Run lint

```bash
yarn lint
```

Expected: no warnings, no errors.

### Step 4: Commit

```bash
git add src/components/AppShell/AppShell.module.css
git commit -m "fix: add consistent padding to AppShell main content area"
```

---

## Task 2: Add page title and increase gap on RecipeGalleryPage

**Files:**
- Modify: `src/app/RecipeGalleryPage.tsx`
- Modify: `src/app/RecipeGalleryPage.module.css`

### Step 1: Read both files

Open both files and confirm their current content before editing.

Current `RecipeGalleryPage.tsx`:
```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useRecipes } from "@/clientToServer/hooks/useRecipes";
import { Button, RecipeCardGallery } from "@/components";
import type { Recipe } from "@/components/RecipeView/RecipeView.types";
import { RecipeGalleryControls } from "./RecipeGalleryControls";
import styles from "./RecipeGalleryPage.module.css";

export const RecipeGalleryPage = () => {
  // ...
  return (
    <section ...>
      <RecipeGalleryControls ... />
      {recipes.length > 0 ? (
        <>
          <RecipeCardGallery
            title="Featured recipes"
            recipes={recipes}
            onRecipeClick={onRecipeClick}
          />
          ...
        </>
      ) : isLoading ? null : (
        <p className={styles.empty}>No recipes found.</p>
      )}
    </section>
  );
};
```

### Step 2: Update `RecipeGalleryPage.tsx`

Make two changes:

1. Add `PageTitle` to the import from `@/components`:
   ```tsx
   import { Button, PageTitle, RecipeCardGallery } from "@/components";
   ```

2. Add `<PageTitle>` as the first child of `<section>` and remove the `title` prop from `<RecipeCardGallery>`:

   Replace:
   ```tsx
   return (
     <section
       className={styles.page}
       aria-busy={isLoading || isFetchingNextPage}
     >
       <RecipeGalleryControls
   ```
   With:
   ```tsx
   return (
     <section
       className={styles.page}
       aria-busy={isLoading || isFetchingNextPage}
     >
       <PageTitle>Recipes</PageTitle>
       <RecipeGalleryControls
   ```

   Replace:
   ```tsx
           <RecipeCardGallery
             title="Featured recipes"
             recipes={recipes}
   ```
   With:
   ```tsx
           <RecipeCardGallery
             recipes={recipes}
   ```

### Step 3: Update `RecipeGalleryPage.module.css`

Replace the `.page` gap value from `24px` to `32px`:

```css
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
```

The rest of the file (`.pager`, `.empty`) stays unchanged.

### Step 4: Run lint

```bash
yarn lint
```

Expected: no warnings, no errors.

### Step 5: Commit

```bash
git add src/app/RecipeGalleryPage.tsx src/app/RecipeGalleryPage.module.css
git commit -m "feat: add page title and improve spacing on /recipes page"
```

---

## Task 3: Final verification

### Step 1: Production build

```bash
yarn build
```

Expected: builds successfully with no TypeScript errors.

### Step 2: Dev server smoke test

```bash
yarn dev
```

Navigate to `/recipes`. Verify:
- Content no longer touches the top/sides of the viewport
- "Recipes" `<h1>` heading appears above the search controls
- "Featured recipes" subtitle is gone from the card gallery
- Layout looks balanced with consistent inset padding

### Step 3: Lint one final time

```bash
yarn lint
```

Expected: clean pass.
