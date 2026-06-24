import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";
import OrderManagerPage from "@/app/manager/page";

describe("OrderManagerPage", () => {
  it("renders the order manager page scaffolding", async () => {
    render(<OrderManagerPage />);

    // Assert on stable testids rather than a full-DOM snapshot, which churns
    // on every Radix/Tailwind dependency bump (generated ids, class strings).
    expect(screen.getByTestId("manager-page")).toBeInTheDocument();
    expect(screen.getByTestId("orders-table")).toBeInTheDocument();
    expect(screen.getByTestId("manager-panel")).toBeInTheDocument();
  });

  it("shows the empty state when there are no orders", async () => {
    render(<OrderManagerPage />);

    // Covers the orders.length > 0 ? <DataTable> : <empty> branch via stable
    // content (not markup), so it survives dependency bumps but still fails if
    // the empty-state path regresses. Scoped to the orders table because the
    // asset search panel renders the same "no results" copy.
    const ordersTable = screen.getByTestId("orders-table");
    expect(
      within(ordersTable).getByText("Nenhum resultado listado")
    ).toBeInTheDocument();
  });
});
