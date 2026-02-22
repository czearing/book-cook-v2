import type { Hit } from "./TextEditorSideMenu.types";

const CANDIDATE_SELECTOR = ":scope > *:not(ul):not(ol), li";
const CLOSEST_THRESHOLD = 12;

// Hit-test blocks by Y, preferring the smallest line rect for list items.
export const findBlockAtY = (root: HTMLElement, y: number): Hit | null => {
  const candidates = root.querySelectorAll<HTMLElement>(CANDIDATE_SELECTOR);
  let match: Hit | null = null;
  let closest: Hit | null = null;
  let closestDistance = Infinity;

  for (const block of candidates) {
    for (const rect of block.getClientRects()) {
      if (y >= rect.top && y <= rect.bottom) {
        if (!match || rect.height < match.rect.height) {
          match = { block, rect };
        }
      }
    }
    const rect = block.getBoundingClientRect();
    const distance = Math.abs(y - rect.top);
    if (distance < closestDistance) {
      closestDistance = distance;
      closest = { block, rect };
    }
  }
  if (match) { return match; }
  return closestDistance < CLOSEST_THRESHOLD ? closest : null;
};

// Toggle visibility and reliably re-trigger the fade animation.
export const setMenuVisible = (menu: HTMLElement, visible: boolean) => {
  menu.dataset.visible = visible ? "true" : "false";
  if (!visible) {
    menu.dataset.animate = "false";
    return;
  }
  menu.dataset.animate = "false";
  void menu.offsetWidth;
  menu.dataset.animate = "true";
};
