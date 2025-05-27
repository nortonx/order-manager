import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";
import AssetsPage from "@/app/assets/page";

describe("AssetsPage", () => {
  it("renders the AssetsManager page and match snapshot", async () => {
    const { container } = render(<AssetsPage />);
    const assetsPageElement = screen.getByTestId("assets-page");
    expect(assetsPageElement).toBeDefined();
    expect(container).toMatchSnapshot();
  });
});
