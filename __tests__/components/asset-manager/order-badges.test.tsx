import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";
import {
  OrderSideBadge,
  OrderStatusBadge,
} from "@/components/asset-manager/order-badges";

describe("OrderSideBadge", () => {
  it("renders a buy badge for 'compra'", () => {
    render(<OrderSideBadge side="compra" />);
    const badge = screen.getByTestId("order-side-badge");
    expect(badge).toHaveTextContent("Compra");
    expect(badge).toHaveAttribute("data-side", "compra");
  });

  it("renders a sell badge for 'venda'", () => {
    render(<OrderSideBadge side="venda" />);
    const badge = screen.getByTestId("order-side-badge");
    expect(badge).toHaveTextContent("Venda");
    expect(badge).toHaveAttribute("data-side", "venda");
  });

  it("normalizes uppercase input to a known side", () => {
    render(<OrderSideBadge side="VENDA" />);
    const badge = screen.getByTestId("order-side-badge");
    expect(badge).toHaveAttribute("data-side", "venda");
    expect(badge).toHaveTextContent("Venda");
  });
});

describe("OrderStatusBadge", () => {
  it("renders an open badge for 'aberta'", () => {
    render(<OrderStatusBadge status="aberta" />);
    const badge = screen.getByTestId("order-status-badge");
    expect(badge).toHaveTextContent("Aberta");
    expect(badge).toHaveAttribute("data-status", "aberta");
  });

  it("renders a closed badge for 'fechada'", () => {
    render(<OrderStatusBadge status="fechada" />);
    const badge = screen.getByTestId("order-status-badge");
    expect(badge).toHaveTextContent("Fechada");
    expect(badge).toHaveAttribute("data-status", "fechada");
  });

  it("normalizes uppercase input to a known status", () => {
    render(<OrderStatusBadge status="ABERTA" />);
    const badge = screen.getByTestId("order-status-badge");
    expect(badge).toHaveAttribute("data-status", "aberta");
    expect(badge).toHaveTextContent("Aberta");
  });
});
