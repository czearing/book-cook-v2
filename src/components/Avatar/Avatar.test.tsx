import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders initials when no image is provided", () => {
    render(<Avatar name="Avery Park" />);

    expect(screen.getByText("AP")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Avery Park" })
    ).toBeInTheDocument();
  });

  it("renders an image when imageURL is provided", () => {
    render(
      <Avatar
        name="Avery Park"
        imageURL="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80"
      />
    );

    expect(screen.getByAltText("Avery Park")).toBeInTheDocument();
  });

  it("calls onClick when interactive", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<Avatar name="Avery Park" onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: "Avery Park" }));

    expect(onClick).toHaveBeenCalled();
  });
});
