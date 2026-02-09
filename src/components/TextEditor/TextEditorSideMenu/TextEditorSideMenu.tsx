"use client";

import { useEffect, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { TextEditorAddButton } from "./TextEditorAddButton";
import styles from "./TextEditorSideMenu.module.css";

const CANDIDATE_SELECTOR = ":scope > *:not(ul):not(ol), li";
const CLOSEST_THRESHOLD = 12;

type Hit = { block: HTMLElement; rect: DOMRect };

// Hit-test blocks by Y, preferring the smallest line rect for list items.
const findBlockAtY = (root: HTMLElement, y: number): Hit | null => {
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
  if (match) {return match;}
  return closestDistance < CLOSEST_THRESHOLD ? closest : null;
};

// Toggle visibility and reliably re-trigger the fade animation.
const setMenuVisible = (menu: HTMLElement, visible: boolean) => {
  menu.dataset.visible = visible ? "true" : "false";
  if (!visible) {
    menu.dataset.animate = "false";
    return;
  }
  menu.dataset.animate = "false";
  void menu.offsetWidth;
  menu.dataset.animate = "true";
};

export const TextEditorSideMenu = () => {
  const [editor] = useLexicalComposerContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const menu = ref.current;
    const root = editor.getRootElement();
    const container = root?.parentElement;
    if (!menu || !root || !container) {
      return;
    }

    let rafId: number;
    let currentBlock: HTMLElement | null = null;

    const hide = () => {
      setMenuVisible(menu, false);
      currentBlock = null;
    };

    const update = (y: number) => {
      const hit = findBlockAtY(root, y);
      if (!hit) {
        hide();
        return;
      }
      if (hit.block === currentBlock) {return;}

      currentBlock = hit.block;
      const top = hit.rect.top - container.getBoundingClientRect().top;
      menu.style.transform = `translate3d(0, ${Math.round(top)}px, 0)`;
      setMenuVisible(menu, true);
    };

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => update(e.clientY));
    };

    setMenuVisible(menu, false);
    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", hide);
    const unregisterRootListener = editor.registerRootListener(
      (rootElement, prevRootElement) => {
        rootElement?.addEventListener("keydown", hide);
        prevRootElement?.removeEventListener("keydown", hide);
      }
    );

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", hide);
      unregisterRootListener();
    };
  }, [editor]);

  return (
    <div ref={ref} aria-hidden="true" className={styles.menu}>
      <TextEditorAddButton />
    </div>
  );
};
