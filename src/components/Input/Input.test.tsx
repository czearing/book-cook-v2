import { render, screen } from "@testing-library/react";

import { Input } from "./Input";

describe("Input", () => {
  it("associates the label with the input", () => {
    render(
      <Input label="Recipe name" placeholder="Best lasagna ever" />
    );

    expect(screen.getByLabelText("Recipe name")).toHaveAttribute(
      "placeholder",
      "Best lasagna ever"
    );
  });

  it("wires description and error text to aria-describedby", () => {
    render(
      <Input
        id="email"
        label="Email"
        description="We won't share your email."
        error="Please enter a valid email."
      />
    );

    const input = screen.getByLabelText("Email");

    expect(input).toHaveAttribute(
      "aria-describedby",
      "email-description email-error"
    );
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(
      screen.getByText("We won't share your email.")
    ).toHaveAttribute("id", "email-description");
    expect(screen.getByText("Please enter a valid email.")).toHaveAttribute(
      "id",
      "email-error"
    );
  });
});
