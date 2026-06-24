import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders a heading and entry points to the main sections", () => {
    render(<HomePage />);

    const home = screen.getByTestId("home-page");
    expect(home).toBeInTheDocument();
    expect(within(home).getByRole("heading")).toBeInTheDocument();
    expect(within(home).getByRole("link", { name: /ativos/i })).toHaveAttribute(
      "href",
      "/assets"
    );
    expect(
      within(home).getByRole("link", { name: /gerenciador de ordens/i })
    ).toHaveAttribute("href", "/manager");
  });
});
