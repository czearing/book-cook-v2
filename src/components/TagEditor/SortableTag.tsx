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
}: SortableTagProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: tag, disabled: !isEditing });
  const adjustedTransform = transform
    ? { ...transform, scaleX: 1, scaleY: 1 }
    : transform;

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(adjustedTransform), transition }}
      className={clsx(styles.tagItem, isDragging && styles.dragging)}
    >
      <span className={styles.tagItemInner} {...attributes} {...listeners}>
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
