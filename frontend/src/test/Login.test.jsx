import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";

test("renders login form", () => {
  render(<Login />);

  expect(screen.getByText(/login/i)).toBeInTheDocument();
});

test("input works", () => {
  render(<Login />);

  const emailInput = screen.getByLabelText(/email/i);

  fireEvent.change(emailInput, { target: { value: "test@test.com" } });

  expect(emailInput.value).toBe("test@test.com");
});