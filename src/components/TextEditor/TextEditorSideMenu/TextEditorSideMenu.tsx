"use client";

import { useEffect, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { TextEditorAddButton } from "./TextEditorAddButton";
import styles from "./TextEditorSideMenu.module.css";
import { findBlockAtY, setMenuVisible } from "./textEditorSideMenuUtils";

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
