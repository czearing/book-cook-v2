import { DotsSixVerticalIcon, XIcon } from "@phosphor-icons/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { clsx } from "clsx";

import { Tag } from "../Tag";
import styles from "./TagEditor.module.css";
import type { SortableTagProps } from "./SortableTag.types";

export const SortableTag = ({
  tag,
  isEditing,
  onTagClick,
  onRemove,
  index,
  total,
  onMove,
  isFocused,
  onFocus,
  onFocusTag,
}: SortableTagProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: tag, disabled: !isEditing });
  const adjustedTransform = transform
    ? { ...transform, scaleX: 1, scaleY: 1 }
    : transform;
  const { onKeyDown: onSortableKeyDown, ...sortableListeners } =
    listeners ?? {};
  const handleFocusMove = (nextIndex: number) => {
    if (nextIndex === index) return;
    onFocusTag(nextIndex);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (!isEditing) return;
    const isForward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const isBackward = event.key === "ArrowLeft" || event.key === "ArrowUp";
    if (!isForward && !isBackward) return;
    event.preventDefault();
    const nextIndex = Math.max(
      0,
      Math.min(total - 1, index + (isForward ? 1 : -1))
    );
    if (event.ctrlKey || event.metaKey) {
      onMove(index, nextIndex);
      handleFocusMove(nextIndex);
      return;
    }
    handleFocusMove(nextIndex);
  };

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(adjustedTransform), transition }}
      className={clsx(styles.tagItem, isDragging && styles.dragging)}
    >
      <span
        className={styles.tagItemInner}
        data-tag-index={index}
        onFocus={() => onFocus(index)}
        onKeyDown={(event) => {
          handleKeyDown(event);
          onSortableKeyDown?.(event);
        }}
        {...attributes}
        {...sortableListeners}
        tabIndex={isEditing ? (isFocused ? 0 : -1) : undefined}
      >
        <Tag
          onClick={!isEditing ? () => onTagClick?.(tag) : undefined}
          startIcon={isEditing ? <DotsSixVerticalIcon size={12} /> : undefined}
          endIcon={isEditing ? <XIcon size={12} /> : undefined}
          endIconAriaLabel={`Remove ${tag}`}
          onEndIconClick={() => onRemove(tag)}
        >
          {tag}
        </Tag>
      </span>
    </div>
  );
};
