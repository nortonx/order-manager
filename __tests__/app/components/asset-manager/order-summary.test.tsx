import { render, screen } from "@testing-library/react";
import { OrderSummary } from "@/app/components/asset-manager/order-summary";
import { formatCurrency } from "@/utils/currency";

// Mock the currency formatter
jest.mock("@/utils/currency", () => ({
  formatCurrency: jest.fn((value) => `R$ ${value.toFixed(2)}`),
}));

describe("OrderSummary Component", () => {
  // Common test props
  const defaultProps = {
    selectedAsset: {
      id: "123",
      symbol: "PETR4",
      price: 28.45,
      type: "buy",
      remainingQuantity: 100,
      status: "active",
      dateTime: new Date().toISOString(),
    },
    assetType: "buy",
    quantity: 100,
    totalPrice: 2845,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with all required information", () => {
    render(<OrderSummary {...defaultProps} />);

    // Check for heading
    expect(screen.getByText("Order Summary")).toBeInTheDocument();

    // Check for symbol
    expect(screen.getByText("Symbol: PETR4")).toBeInTheDocument();

    // Check for type (buy)
    expect(screen.getByText("Type: Compra")).toBeInTheDocument();

    // Check for price display
    expect(screen.getByText("Price per unit: R$ 28.45")).toBeInTheDocument();

    // Check for quantity
    expect(screen.getByText("Quantity: 100")).toBeInTheDocument();

    // Check for total price
    expect(screen.getByText("Total: R$ 2845.00")).toBeInTheDocument();

    // Verify currency formatter was called with correct values
    expect(formatCurrency).toHaveBeenCalledWith(28.45, "BRL");
    expect(formatCurrency).toHaveBeenCalledWith(2845, "BRL");
  });

  it("renders sell type correctly", () => {
    render(<OrderSummary {...defaultProps} assetType="sell" />);

    // Check that it displays "Venda" for sell type
    expect(screen.getByText("Type: Venda")).toBeInTheDocument();
  });

  it("handles missing price gracefully", () => {
    const assetWithoutPrice = {
      ...defaultProps,
      selectedAsset: {
        id: "123",
        symbol: "PETR4",
        type: "buy",
        // price is missing
        remainingQuantity: 100,
        status: "active",
        dateTime: new Date().toISOString(),
      },
    };

    render(<OrderSummary {...assetWithoutPrice} />);

    // Should use fallback value of 0
    expect(screen.getByText("Price per unit: R$ 0.00")).toBeInTheDocument();

    // Verify currency formatter was called with 0
    expect(formatCurrency).toHaveBeenCalledWith(0, "BRL");
  });

  it("displays correct total amount based on props", () => {
    const customProps = {
      ...defaultProps,
      quantity: 50,
      totalPrice: 1422.5,
    };

    render(<OrderSummary {...customProps} />);

    // Check for updated quantity and total
    expect(screen.getByText("Quantity: 50")).toBeInTheDocument();
    expect(screen.getByText("Total: R$ 1422.50")).toBeInTheDocument();

    expect(formatCurrency).toHaveBeenCalledWith(1422.5, "BRL");
  });
});
