# New Recipe: Navigate-Immediately Design

**Date:** 2026-02-24
**Status:** Approved

## Problem

The current `NewRecipeDialog` is heavier than it needs to be. For what is functionally "type a name, press Enter," it presents three cancel paths (X button, Cancel button, Escape/backdrop), an explicit "New recipe" header, a labeled form field, and a full dark overlay.

Research across Paprika, Mela, Crouton, Whisk, Notion, and other well-regarded apps shows the dominant pattern for recipe creation is **navigate-immediately**: press + → app creates a blank item and navigates to the editor. The title is the first field in the editor.

## Solution

Remove the dialog entirely. When the user clicks "New recipe" in the sidebar:

1. Call `useCreateRecipe` with the default title `"Untitled recipe"`.
2. Show a loading state on the sidebar item while the mutation is pending.
3. On success, navigate to `/recipes/${id}`.
4. The recipe editor's title field autofocuses so the user can rename inline.

This is the same end state as the current flow (user lands in the editor) but with zero intermediate UI.

## Scope

**Changes:**
- `SidebarContent.tsx` — remove dialog state, call mutation directly on click, handle loading/error
- `NewRecipeDialog/` — delete the entire directory (component, types, stories, index)
- Recipe editor — verify title field autofocuses; if not, pass `?new=1` query param and handle autofocus on mount
- `src/components/index.ts` — remove `NewRecipeDialog` export

**Not changing:** Dialog primitive, recipe editor UI, any other component.

## Handling Orphaned Recipes

Recipes created with the default title `"Untitled recipe"` are kept as-is if the user navigates away. This matches the Notion pattern. No auto-deletion logic is needed in this iteration.

## Testing

- Update or add `SidebarContent` tests: click "New recipe" → mutation called with "Untitled recipe" → navigate to `/recipes/${id}`
- Cover loading state: sidebar item disabled while pending
- Cover error state: mutation failure does not navigate
