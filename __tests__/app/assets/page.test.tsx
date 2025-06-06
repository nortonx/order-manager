import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";
import AssetsPage from "@/app/assets/page";

describe("AssetsPage", () => {
  it("renders the AssetsPage correctly", () => {
    render(<AssetsPage />);
    const assetsPageElement = screen.getByTestId("assets-page");
    const assetsTableElement = screen.getByTestId("assets-table");
    expect(assetsPageElement).toBeDefined();
    expect(assetsTableElement).toBeDefined();
  });
});
