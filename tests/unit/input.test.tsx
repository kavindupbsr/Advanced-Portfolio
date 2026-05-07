import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "@/components/ui/Input";

describe("Input Component", () => {
  test("renders with placeholder text", () => {
    render(<Input placeholder="Enter your email" />);
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
  });

  test("updates value when user types", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Test input" />);

    const input = screen.getByPlaceholderText("Test input") as HTMLInputElement;
    await user.type(input, "hello world");

    expect(input.value).toBe("hello world");
  });

  test("calls onChange handler when value changes", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Input placeholder="Test" onChange={handleChange} />);

    const input = screen.getByPlaceholderText("Test");
    await user.type(input, "a");

    expect(handleChange).toHaveBeenCalled();
  });

  test("accepts disabled prop", () => {
    render(<Input placeholder="Disabled input" disabled />);
    expect(screen.getByPlaceholderText("Disabled input")).toBeDisabled();
  });

  test("renders with correct input type", () => {
    render(<Input type="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText("Email")).toHaveAttribute("type", "email");
  });
});
