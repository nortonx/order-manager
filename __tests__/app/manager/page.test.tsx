import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";
import OrderManagerPage from "@/app/manager/page";

describe("AssetsManagerPage", () => {
  it("renders the AssetsManager page", async () => {
    const { container } = render(<OrderManagerPage />);
    const orderManagerElement = screen.getByTestId("manager-page");
    expect(orderManagerElement).toBeDefined();
    expect(container).toMatchSnapshot();
  });
});
