import { useEffect, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import styles from "./TextEditorSideMenu.module.css";

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
      menu.dataset.visible = "false";
      menu.dataset.animate = "false";
      currentBlock = null;
    };

    const findBlockAtY = (y: number) => {
      const candidates = root.querySelectorAll<HTMLElement>(
        ":scope > *:not(ul):not(ol), li"
      );

      let match: { block: HTMLElement; rect: DOMRect } | null = null;
      for (const block of candidates) {
        for (const rect of block.getClientRects()) {
          if (y >= rect.top && y <= rect.bottom) {
            if (!match || rect.height < match.rect.height) {
              match = { block, rect };
            }
          }
        }
      }
      if (match) {
        return match;
      }

      let closest: { block: HTMLElement; rect: DOMRect; distance: number } | null =
        null;
      for (const block of candidates) {
        const rect = block.getBoundingClientRect();
        const distance = Math.abs(y - rect.top);
        if (!closest || distance < closest.distance) {
          closest = { block, rect, distance };
        }
      }
      return closest && closest.distance < 12
        ? { block: closest.block, rect: closest.rect }
        : null;
    };

    const update = (y: number) => {
      const hit = findBlockAtY(y);
      if (!hit) {
        hide();
        return;
      }

      if (hit.block === currentBlock) {
        return;
      }

      currentBlock = hit.block;
      const containerRect = container.getBoundingClientRect();
      const top = hit.rect.top - containerRect.top;

      menu.style.transform = `translate3d(0, ${Math.round(top)}px, 0)`;
      menu.dataset.visible = "true";
      menu.dataset.animate = "false";
      void menu.offsetWidth;
      menu.dataset.animate = "true";
    };

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => update(e.clientY));
    };

    const onType = () => {
      hide();
    };

    menu.dataset.visible = "false";
    menu.dataset.animate = "false";
    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", hide);
    const unregisterRootListener = editor.registerRootListener(
      (rootElement, prevRootElement) => {
        rootElement?.addEventListener("keydown", onType);
        prevRootElement?.removeEventListener("keydown", onType);
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
      <button type="button" className={styles.btn} onClick={() => undefined}>
        +
      </button>
    </div>
  );
};
