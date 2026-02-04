import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TagEditor } from "./TagEditor";

const setup = (props: Partial<React.ComponentProps<typeof TagEditor>> = {}) => {
  const user = userEvent.setup();
  const onTagClick = jest.fn();
  const onTagsChange = jest.fn();
  render(
    <TagEditor
      tags={["Spicy"]}
      onTagClick={onTagClick}
      onTagsChange={onTagsChange}
      {...props}
    />
  );

  return { user, onTagClick, onTagsChange };
};

describe("TagEditor", () => {
  it("fires tag click when not editing", async () => {
    const { user, onTagClick } = setup();

    const tagButton = screen.getByText("Spicy").closest("button");
    expect(tagButton).not.toBeNull();
    await user.click(tagButton as HTMLElement);

    expect(onTagClick).toHaveBeenCalledWith("Spicy");
  });

  it("ignores tag click while editing", async () => {
    const { user, onTagClick } = setup();

    await user.click(screen.getByLabelText("Edit tags"));
    await user.click(screen.getByText("Spicy"));

    expect(onTagClick).not.toHaveBeenCalled();
  });

  it("adds a tag and saves on outside click", async () => {
    const { user, onTagsChange } = setup();

    await user.click(screen.getByLabelText("Edit tags"));
    await user.click(screen.getByRole("button", { name: "Add" }));
    await user.type(screen.getByPlaceholderText("Add tag"), "Salty{enter}");

    fireEvent.pointerDown(document.body);

    expect(onTagsChange).toHaveBeenCalledWith(["Spicy", "Salty"]);
  });

  it("removes a tag and saves on outside click", async () => {
    const { user, onTagsChange } = setup();

    await user.click(screen.getByLabelText("Edit tags"));
    await user.click(screen.getByLabelText("Remove Spicy"));

    fireEvent.pointerDown(document.body);

    expect(onTagsChange).toHaveBeenCalledWith([]);
  });

  it("shows the edit control for empty tags", () => {
    setup({ tags: [] });

    expect(screen.getByLabelText("Edit tags")).toBeInTheDocument();
  });

  it("supports keyboard sorting in edit mode", async () => {
    const { user, onTagsChange } = setup({ tags: ["Spicy", "Sweet"] });

    await user.click(screen.getByLabelText("Edit tags"));

    const dragButton = document.querySelector<HTMLElement>(
      '[data-tag-index="0"]'
    );
    expect(dragButton).not.toBeNull();

    fireEvent.keyDown(dragButton as HTMLElement, {
      key: "ArrowRight",
      ctrlKey: true,
    });

    await waitFor(() => {
      const firstTag = document.querySelector('[data-tag-index="0"]');
      expect(firstTag?.textContent).toContain("Sweet");
    });

    fireEvent.pointerDown(document.body);

    expect(onTagsChange).toHaveBeenCalledWith(["Sweet", "Spicy"]);
  });

  it("keeps tags focusable for accessibility while editing", async () => {
    const { user } = setup();

    await user.click(screen.getByLabelText("Edit tags"));

    const draggable = document.querySelector<HTMLElement>(
      '[data-tag-index="0"]'
    );
    expect(draggable).toHaveAttribute("aria-roledescription", "sortable");
    expect(draggable).toHaveAttribute("tabindex", "0");
  });

  it("moves focus with arrow keys without reordering", async () => {
    const { user } = setup({ tags: ["Spicy", "Sweet", "Salty"] });

    await user.click(screen.getByLabelText("Edit tags"));

    const first = document.querySelector<HTMLElement>('[data-tag-index="0"]');
    const second = document.querySelector<HTMLElement>('[data-tag-index="1"]');
    expect(first).not.toBeNull();
    expect(second).not.toBeNull();

    (first as HTMLElement).focus();
    fireEvent.keyDown(first as HTMLElement, { key: "ArrowRight" });

    await waitFor(() => {
      expect(second).toHaveFocus();
    });
  });
});
