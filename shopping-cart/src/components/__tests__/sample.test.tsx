import { render, screen } from "@testing-library/react";

describe("Sample Test", () => {
  it("renders hello message", () => {
    render(<h1>Hello, Vitest!</h1>);
    expect(screen.getByText("Hello, Vitest!")).toBeInTheDocument();
  });
});
