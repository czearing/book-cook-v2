# New Recipe Navigate-Immediately Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the NewRecipeDialog with a navigate-immediately flow — clicking "New recipe" creates a blank recipe and goes straight to the editor.

**Architecture:** Remove `NewRecipeDialog` entirely. `SidebarContent` calls `useCreateRecipe("Untitled recipe")` directly on click and calls `onNavigate("/recipes/${id}")` on success. `RecipeHeader` autofocuses the title when it detects the recipe has the default "Untitled recipe" title so the user can rename inline.

**Tech Stack:** React 19, Next.js 16 App Router, TanStack Query (`useMutation`), Testing Library + userEvent

---

## Pre-flight

The worktree is at `C:\Code\Personal\book-cook2\.worktrees\improve-new-recipe-dialogs`.

Run tests from the worktree root using:
```bash
node node_modules/jest/bin/jest.js <test-file> --no-coverage
```

There are 4 pre-existing failing test suites (TagEditor, RecipeCard, RecipeCardGallery, MultiSelectMenu) — **do not touch these and do not worry about them**.

---

### Task 1: SidebarContent — failing tests first

**Files:**
- Create: `src/components/Sidebar/SidebarContent.test.tsx`

**Step 1: Write the failing tests**

```tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SidebarContent } from "./SidebarContent";

const mockMutate = jest.fn();
const mockMutation = {
  mutate: mockMutate,
  isPending: false,
};

jest.mock("@/clientToServer/hooks/useCreateRecipe", () => ({
  useCreateRecipe: () => mockMutation,
}));

jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
}));

beforeEach(() => {
  mockMutate.mockReset();
});

describe("SidebarContent — new recipe", () => {
  it("calls useCreateRecipe with 'Untitled recipe' when New recipe is clicked", async () => {
    const user = userEvent.setup();
    render(<SidebarContent />);

    await user.click(screen.getByRole("button", { name: "New recipe" }));

    expect(mockMutate).toHaveBeenCalledWith(
      "Untitled recipe",
      expect.objectContaining({ onSuccess: expect.any(Function) })
    );
  });

  it("calls onNavigate with /recipes/<id> on success", async () => {
    const user = userEvent.setup();
    const onNavigate = jest.fn();
    mockMutate.mockImplementation((_title: string, options: { onSuccess: (data: { id: string }) => void }) => {
      options.onSuccess({ id: "abc-123" });
    });

    render(<SidebarContent onNavigate={onNavigate} />);
    await user.click(screen.getByRole("button", { name: "New recipe" }));

    expect(onNavigate).toHaveBeenCalledWith("/recipes/abc-123");
  });

  it("disables the New recipe button while pending", () => {
    mockMutation.isPending = true;
    render(<SidebarContent />);

    expect(screen.getByRole("button", { name: "New recipe" })).toBeDisabled();
    mockMutation.isPending = false;
  });

  it("does not open a dialog when New recipe is clicked", async () => {
    const user = userEvent.setup();
    render(<SidebarContent />);

    await user.click(screen.getByRole("button", { name: "New recipe" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
```

**Step 2: Run to confirm failure**

```bash
node node_modules/jest/bin/jest.js src/components/Sidebar/SidebarContent.test.tsx --no-coverage
```

Expected: FAIL — "useCreateRecipe is not used in SidebarContent" or similar import errors.

**Step 3: Commit the failing tests**

```bash
git add src/components/Sidebar/SidebarContent.test.tsx
git commit -m "test: add failing SidebarContent new-recipe tests"
```

---

### Task 2: Update SidebarContent to navigate-immediately

**Files:**
- Modify: `src/components/Sidebar/SidebarContent.tsx`

**Step 1: Read the current file first, then replace it**

Current file: `src/components/Sidebar/SidebarContent.tsx` (100 lines)

New content — replace the entire file:

```tsx
"use client";

import { useEffect, useState } from "react";
import {
  BookOpenIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@phosphor-icons/react";
import { useSearchParams } from "next/navigation";

import { useCreateRecipe } from "@/clientToServer/hooks/useCreateRecipe";
import type {
  SidebarContentProps,
  SidebarLeafItem,
} from "./SidebarContent.types";
import { SidebarItem } from "./SidebarItem";
import { SidebarSearchDialog } from "./SidebarSearchDialog";

const TOP_ITEMS: SidebarLeafItem[] = [
  { id: "search", label: "Search", icon: MagnifyingGlassIcon },
  { id: "new-recipe", label: "New recipe", icon: PlusCircleIcon },
  { id: "recipes", label: "Recipes", icon: BookOpenIcon, path: "/recipes" },
];

const DEFAULT_ACTIVE_ID = "recipes";

export const SidebarContent = ({
  defaultActiveId = DEFAULT_ACTIVE_ID,
  onNavigate,
}: SidebarContentProps) => {
  const [activeId, setActiveId] = useState(defaultActiveId);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const mutation = useCreateRecipe();

  useEffect(() => {
    if (!isSearchOpen) {
      return;
    }
    const nextQuery = searchParams?.get("q") ?? "";
    setSearchQuery(nextQuery);
  }, [isSearchOpen, searchParams]);

  const handleSearchSubmit = () => {
    const trimmed = searchQuery.trim();
    const params = new URLSearchParams();
    if (trimmed) {
      params.set("q", trimmed);
    }
    const queryString = params.toString();
    onNavigate?.(queryString ? `/recipes?${queryString}` : "/recipes");
    setIsSearchOpen(false);
  };

  const renderLeaf = (item: SidebarLeafItem, depth = 0) => {
    const Icon = item.icon;
    const size = depth > 0 ? 16 : 18;
    const isNewRecipe = item.id === "new-recipe";
    return (
      <SidebarItem
        key={item.id}
        depth={depth}
        icon={<Icon size={size} />}
        label={item.label}
        active={activeId === item.id}
        disabled={isNewRecipe && mutation.isPending}
        onClick={() => {
          setActiveId(item.id);
          if (item.id === "search") {
            setIsSearchOpen(true);
            return;
          }
          if (item.id === "new-recipe") {
            mutation.mutate("Untitled recipe", {
              onSuccess: ({ id }) => {
                onNavigate?.(`/recipes/${id}`);
              },
            });
            return;
          }
          if (item.path) {
            onNavigate?.(item.path);
          }
        }}
      />
    );
  };

  return (
    <>
      {TOP_ITEMS.map((item) => renderLeaf(item, 0))}
      {isSearchOpen && (
        <SidebarSearchDialog
          open={isSearchOpen}
          onOpenChange={setIsSearchOpen}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onSubmit={handleSearchSubmit}
        />
      )}
    </>
  );
};
```

**Step 2: Run the tests**

```bash
node node_modules/jest/bin/jest.js src/components/Sidebar/SidebarContent.test.tsx --no-coverage
```

Expected: All 4 SidebarContent tests pass.

**Step 3: Commit**

```bash
git add src/components/Sidebar/SidebarContent.tsx
git commit -m "feat: replace NewRecipeDialog with navigate-immediately in SidebarContent"
```

---

### Task 3: RecipeHeader — autofocus "Untitled recipe" title

**Files:**
- Modify: `src/components/RecipeView/RecipeHeader/RecipeHeader.tsx`

The title field is a `contentEditable h1` (line 56-64). Add a `useEffect` after the existing effects that focuses and selects all text when the recipe title is `"Untitled recipe"` and the view is in editor mode. This lets users immediately type a new name.

**Step 1: Add the autofocus effect**

In `RecipeHeader.tsx`, after the existing `useEffect` (line 32), add:

```tsx
useEffect(() => {
  if (!isEditable || !titleRef.current) {
    return;
  }
  if (recipe.title !== "Untitled recipe") {
    return;
  }
  titleRef.current.focus();
  const range = document.createRange();
  range.selectNodeContents(titleRef.current);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []); // intentionally runs once on mount only
```

**Step 2: Run existing RecipeViewSaveStateContext tests to confirm no regression**

```bash
node node_modules/jest/bin/jest.js src/components/RecipeView/ --no-coverage
```

Expected: All pass (1 test suite, no failures added).

**Step 3: Commit**

```bash
git add src/components/RecipeView/RecipeHeader/RecipeHeader.tsx
git commit -m "feat: autofocus title when recipe is Untitled recipe in editor mode"
```

---

### Task 4: Delete NewRecipeDialog

**Files:**
- Delete: `src/components/NewRecipeDialog/` (entire directory)

**Step 1: Delete the directory**

```bash
rm -rf src/components/NewRecipeDialog
```

**Step 2: Run all tests to confirm nothing else imports it**

```bash
node node_modules/jest/bin/jest.js --no-coverage 2>&1 | tail -10
```

Expected: Same 4 pre-existing failures, no new failures.

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: delete NewRecipeDialog component"
```

---

### Task 5: Lint and type check

**Step 1: Run ESLint**

```bash
node node_modules/.bin/next lint --no-cache 2>&1 | tail -20
```

Expected: No errors, no warnings (max-warnings=0).

If there are lint errors fix them, stage the changes, and commit:
```bash
git add -A
git commit -m "fix: address lint issues after NewRecipeDialog removal"
```

**Step 2: Run TypeScript check**

```bash
node node_modules/.bin/tsc --noEmit 2>&1 | head -30
```

Expected: No errors.

---

### Task 6: Final test run

```bash
node node_modules/jest/bin/jest.js --no-coverage 2>&1 | tail -10
```

Expected output shape:
```
Test Suites: 4 failed, 10 passed, 14 total
Tests:       6 failed, N passed, N total
```
(4 pre-existing failures only; new SidebarContent suite passes)

---

### Task 7: Commit summary and push

```bash
git log --oneline -6
git push -u origin users/calebzearing/improve-new-recipe-dialogs
```
