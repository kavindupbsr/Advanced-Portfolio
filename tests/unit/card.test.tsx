import { render, screen } from "@testing-library/react";
import { Card } from "@/components/ui/Card";

describe("Card Component", () => {
  test("renders children content", () => {
    render(
      <Card>
        <h2>Card Title</h2>
        <p>Card content goes here</p>
      </Card>
    );

    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card content goes here")).toBeInTheDocument();
  });

  test("renders with className prop", () => {
    const { container } = render(
      <Card className="custom-class">
        Content
      </Card>
    );

    const cardElement = container.firstChild;
    expect(cardElement).toHaveClass("custom-class");
  });

  test("renders as div by default", () => {
    const { container } = render(
      <Card>
        Card content
      </Card>
    );

    expect(container.querySelector("div")).toBeInTheDocument();
  });

  test("renders multiple children correctly", () => {
    render(
      <Card>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Card>
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });
});
