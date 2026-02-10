import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Searchbox } from "./Searchbox";

describe("Searchbox", () => {
  it("associates the label with the input", () => {
    render(<Searchbox label="Search" placeholder="Find recipes" />);

    expect(screen.getByLabelText("Search")).toHaveAttribute(
      "placeholder",
      "Find recipes"
    );
  });

  it("calls onSubmit when Enter is pressed", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(
      <Searchbox
        label="Search"
        placeholder="Find recipes"
        onSubmit={onSubmit}
      />
    );

    const input = screen.getByLabelText("Search");
    await user.type(input, "pasta{enter}");

    expect(onSubmit).toHaveBeenCalledWith("pasta");
  });

  it("clears the value when the clear button is clicked", async () => {
    const user = userEvent.setup();
    const onValueChange = jest.fn();

    render(
      <Searchbox
        label="Search"
        value="salad"
        onValueChange={onValueChange}
      />
    );

    const clearButton = screen.getByRole("button", { name: "Clear search" });
    await user.click(clearButton);

    expect(onValueChange).toHaveBeenCalledWith("");
  });
});
