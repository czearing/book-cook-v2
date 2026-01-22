import { PlusIcon } from "@phosphor-icons/react";

import styles from "./TextEditorSideMenu.module.css";

export const TextEditorAddButton = () => (
  <button type="button" className={styles.btn} onClick={() => undefined}>
    <PlusIcon size={16} weight="bold" />
  </button>
);
