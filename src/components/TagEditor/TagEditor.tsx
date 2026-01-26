import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { DotsSixVerticalIcon, PencilSimpleIcon, PlusIcon, XIcon } from "@phosphor-icons/react";
import { clsx } from "clsx";

import { SortableTag } from "./SortableTag";
import styles from "./TagEditor.module.css";
import type { TagEditorProps } from "./TagEditor.types";
import { useTagEditorState } from "./useTagEditorState";
import { Tag } from "../Tag";

export const TagEditor = ({
  tags,
  onTagsChange,
  onTagClick,
  editable = true,
  showEditControl,
}: TagEditorProps) => {
  const iconSizeSm = 12;
  const iconSizeMd = 14;
  const {
    wrapperRef,
    isEditing,
    toggleEdit,
    draftTags,
    inputValue,
    isAdding,
    removeTag,
    startAdd,
    handleInputChange,
    handleInputKeyDown,
    activeTag,
    handleDragStartEvent,
    handleDragCancelEvent,
    handleDragEndEvent,
  } = useTagEditorState(tags, onTagsChange);
  const dragIcon = isEditing ? <DotsSixVerticalIcon size={iconSizeSm} /> : undefined;
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } })
  );
  const controlsVisible = showEditControl || tags.length === 0;
  const isDragging = Boolean(activeTag);

  const handleEditClick = () => {
    if (!isEditing) {
      toggleEdit();
      if (tags.length === 0) {
        startAdd();
      }
      return;
    }
    toggleEdit();
  };

  return (
    <div
      ref={wrapperRef}
      className={clsx(
        styles.wrapper,
        isEditing && styles.editing,
        isDragging && styles.draggingList
      )}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStartEvent}
        onDragCancel={handleDragCancelEvent}
        onDragEnd={handleDragEndEvent}
      >
        <SortableContext items={draftTags} strategy={rectSortingStrategy}>
          {draftTags.map((tag) => (
            <SortableTag
              key={tag}
              tag={tag}
              isEditing={isEditing}
              onTagClick={onTagClick}
              onRemove={removeTag}
            />
          ))}
        </SortableContext>
        <DragOverlay adjustScale={false}>
          {activeTag ? (
            <span className={styles.dragOverlay}>
              <Tag
                startIcon={dragIcon}
                endIcon={isEditing ? <XIcon size={iconSizeSm} /> : undefined}
                endIconAriaLabel={`Remove ${activeTag}`}
              >
                {activeTag}
              </Tag>
            </span>
          ) : null}
        </DragOverlay>
      </DndContext>

      {isEditing && isAdding && (
        <input
          className={styles.addInput}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          autoFocus
          placeholder="Add tag"
        />
      )}

      {isEditing && !isAdding && (
        <button type="button" className={styles.addButton} onClick={startAdd}>
          <PlusIcon size={iconSizeSm} /> Add
        </button>
      )}

      {editable && (
        <div
          className={clsx(
            styles.controls,
            controlsVisible && styles.controlsVisible
          )}
        >
          <button
            type="button"
            className={styles.iconButton}
            onClick={handleEditClick}
            aria-label="Edit tags"
          >
            <PencilSimpleIcon size={iconSizeMd} />
          </button>
        </div>
      )}
    </div>
  );
};
