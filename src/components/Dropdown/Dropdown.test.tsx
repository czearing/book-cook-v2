import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  Dropdown,
  DropdownCaret,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  DropdownValue,
} from "./Dropdown";

describe("Dropdown", () => {
  it("opens and selects an item", async () => {
    const user = userEvent.setup();
    const onValueChange = jest.fn();

    render(
      <Dropdown defaultValue="newest" onValueChange={onValueChange}>
        <DropdownTrigger aria-label="Sort recipes">
          <DropdownValue placeholder="Sort recipes" />
          <DropdownCaret />
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem value="newest">Newest</DropdownItem>
          <DropdownItem value="oldest">Oldest</DropdownItem>
        </DropdownContent>
      </Dropdown>
    );

    await user.click(screen.getByRole("combobox", { name: "Sort recipes" }));

    await user.click(await screen.findByRole("option", { name: "Oldest" }));

    expect(onValueChange).toHaveBeenCalledWith("oldest");
  });

  it("does not select disabled items", async () => {
    const user = userEvent.setup();
    const onValueChange = jest.fn();

    render(
      <Dropdown defaultValue="newest" onValueChange={onValueChange}>
        <DropdownTrigger aria-label="Sort recipes">
          <DropdownValue placeholder="Sort recipes" />
          <DropdownCaret />
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem value="newest">Newest</DropdownItem>
          <DropdownItem value="oldest" disabled>
            Oldest
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    );

    await user.click(screen.getByRole("combobox", { name: "Sort recipes" }));

    const disabledOption = await screen.findByRole("option", { name: "Oldest" });

    await user.click(disabledOption);

    expect(onValueChange).not.toHaveBeenCalled();
    expect(disabledOption).toHaveAttribute("data-disabled");
  });
});
