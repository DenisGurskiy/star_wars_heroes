import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home page", () => {
  it("should have heading", () => {
    render(<Home />);

    const heading = screen.getByText("List of Characters");

    expect(heading).toBeInTheDocument();
  });

  it("should have loader while fetching", () => {
    render(<Home />);

    const heading = screen.getByText("Loading...");

    expect(heading).toBeInTheDocument();
  });
});
