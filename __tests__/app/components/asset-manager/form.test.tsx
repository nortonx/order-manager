import { render, screen, fireEvent } from "@testing-library/react";
import AssetForm from "@/app/components/asset-manager/form";
import { Asset } from "@/types/asset.type";

// Mock dependencies
jest.mock("@/actions");
// Provide a default export with getState for useAssetStore mock
jest.mock("@/store/useAssetStore", () => ({
  __esModule: true,
  default: {
    getState: jest.fn(() => ({
      addAsset: jest.fn(),
    })),
  },
}));

// Mock useOrderStore
jest.mock("@/store/useOrderStore", () => ({
  useOrderStore: {
    getState: jest.fn(() => ({
      addOrder: jest.fn(),
    })),
  },
}));

// Mock child components
jest.mock("@/app/components/asset-manager/asset-form-fields", () => ({
  AssetFormFields: ({
    symbol,
    assetType,
    quantity,
    totalPrice,
    onFilterAssets,
    onTypeChange,
    onQuantityChange,
  }: {
    symbol: string;
    assetType: string;
    quantity: number;
    totalPrice: number;
    onFilterAssets: (value: string) => void;
    onTypeChange: (type: string) => void;
    onQuantityChange: (quantity: number) => void;
  }) => (
    <div data-testid="asset-form-fields">
      <input
        data-testid="symbol-input"
        value={symbol}
        onChange={(e) => onFilterAssets(e.target.value)}
      />
      <select
        data-testid="type-select"
        value={assetType}
        onChange={(e) => onTypeChange(e.target.value)}
      >
        <option value="compra">Compra</option>
        <option value="venda">Venda</option>
      </select>
      <input
        data-testid="quantity-input"
        type="number"
        value={quantity}
        onChange={(e) => onQuantityChange(Number(e.target.value))}
      />
      <div data-testid="total-price">{totalPrice}</div>
    </div>
  ),
}));

jest.mock("@/app/components/asset-manager/asset-search-results", () => ({
  AssetSearchResults: ({
    results,
    onSelectAsset,
  }: {
    results: Asset[];
    onSelectAsset: (asset: Asset) => void;
  }) => (
    <div data-testid="asset-search-results">
      <ul>
        {results.map((asset) => (
          <li
            key={asset.id}
            data-testid={`asset-${asset.id}`}
          >
            <button onClick={() => onSelectAsset(asset)}>{asset.symbol}</button>
          </li>
        ))}
      </ul>
    </div>
  ),
}));

jest.mock("@/app/components/asset-manager/order-summary", () => ({
  OrderSummary: ({ selectedAsset }: { selectedAsset: Asset }) => (
    <div data-testid="order-summary">{selectedAsset.symbol}</div>
  ),
}));

jest.mock("@/app/components/asset-manager/action-buttons", () => ({
  ActionButtons: ({
    hasSelectedAsset,
    onReset,
  }: {
    hasSelectedAsset: boolean;
    onReset: () => void;
  }) => (
    <div data-testid="action-buttons">
      <button
        data-testid="add-button"
        disabled={!hasSelectedAsset}
        type="submit"
      >
        Add
      </button>
      <button
        data-testid="reset-button"
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  ),
}));

describe("AssetForm", () => {
  const mockAssets = [
    {
      id: "1",
      symbol: "AAPL",
      price: 150,
      type: "COMPRA",
      remainingQuantity: 100,
      status: "OPEN",
      dateTime: "2024-06-01T10:15:00Z",
    },
    {
      id: "2",
      symbol: "GOOGL",
      price: 2500,
      type: "COMPRA",
      remainingQuantity: 50,
      status: "OPEN",
      dateTime: "2024-06-01T10:15:00Z",
    },
    {
      id: "3",
      symbol: "MSFT",
      price: 300,
      type: "VENDA",
      remainingQuantity: 75,
      status: "OPEN",
      dateTime: "2024-06-01T10:15:00Z",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    const getAssetsMock = jest.mocked(jest.requireMock("@/actions").getAssets);
    getAssetsMock.mockReturnValue(mockAssets);
  });

  it("renders the component with initial empty state", () => {
    render(<AssetForm />);

    expect(screen.getByTestId("asset-form-fields")).toBeInTheDocument();
    expect(screen.getByTestId("action-buttons")).toBeInTheDocument();
    expect(screen.getByTestId("asset-search-results")).toBeInTheDocument();
    expect(screen.queryByTestId("order-summary")).not.toBeInTheDocument();
  });

  it("filters assets based on search input", () => {
    render(<AssetForm />);

    const input = screen.getByTestId("symbol-input");
    fireEvent.change(input, { target: { value: "A" } });

    expect(input).toHaveValue("A");
    expect(screen.getByTestId("asset-1")).toBeInTheDocument();
  });

  it("updates quantity and recalculates total price", () => {
    render(<AssetForm />);

    // Search and select an asset first
    const input = screen.getByTestId("symbol-input");
    fireEvent.change(input, { target: { value: "A" } });

    const assetButton = screen.getByText("AAPL");
    fireEvent.click(assetButton);

    // Change quantity
    const quantityInput = screen.getByTestId("quantity-input");
    fireEvent.change(quantityInput, { target: { value: "3" } });

    // Check if quantity is updated
    expect(quantityInput).toHaveValue(3);
    expect(screen.getByTestId("total-price")).toHaveTextContent("450");
  });

  it("changes asset type", () => {
    render(<AssetForm />);

    // Search and select an asset first
    const input = screen.getByTestId("symbol-input");
    fireEvent.change(input, { target: { value: "A" } });

    const assetButton = screen.getByText("AAPL");
    fireEvent.click(assetButton);

    // Change type
    const typeSelect = screen.getByTestId("type-select");
    fireEvent.change(typeSelect, { target: { value: "venda" } });

    expect(typeSelect).toHaveValue("venda");
  });

  it("resets the form when reset button is clicked", () => {
    render(<AssetForm />);

    // Search and select an asset first
    const input = screen.getByTestId("symbol-input");
    fireEvent.change(input, { target: { value: "A" } });

    const assetButton = screen.getByText("AAPL");
    fireEvent.click(assetButton);

    // Verify order summary is shown
    expect(screen.getByTestId("order-summary")).toBeInTheDocument();

    // Click reset button
    const resetButton = screen.getByTestId("reset-button");
    fireEvent.click(resetButton);

    // Verify form is reset but type is maintained
    expect(screen.getByTestId("symbol-input")).toHaveValue("");
    expect(screen.getByTestId("quantity-input")).toHaveValue(1);
    expect(screen.queryByTestId("order-summary")).not.toBeInTheDocument();
    // Type should be maintained
    expect(screen.getByTestId("type-select")).toHaveValue("compra");
  });

  it("add button is disabled when no asset is selected", () => {
    render(<AssetForm />);

    const addButton = screen.getByTestId("add-button");
    expect(addButton).toBeDisabled();
  });

  it("add button is enabled when asset is selected", () => {
    render(<AssetForm />);

    // Search and select an asset
    const input = screen.getByTestId("symbol-input");
    fireEvent.change(input, { target: { value: "A" } });

    const assetButton = screen.getByText("AAPL");
    fireEvent.click(assetButton);

    const addButton = screen.getByTestId("add-button");
    expect(addButton).not.toBeDisabled();
  });

  it("maintains asset type when adding an asset", () => {
    render(<AssetForm />);

    // Mock the useOrderStore.getState().addOrder function
    const addOrderMock = jest.fn();
    jest
      .mocked(jest.requireMock("@/store/useOrderStore").useOrderStore.getState)
      .mockReturnValue({
        addOrder: addOrderMock,
      });

    // First select an asset
    const input = screen.getByTestId("symbol-input");
    fireEvent.change(input, { target: { value: "A" } });
    const assetButton = screen.getByText("AAPL");
    fireEvent.click(assetButton);

    // Change type to 'sell'
    const typeSelect = screen.getByTestId("type-select");
    fireEvent.change(typeSelect, { target: { value: "venda" } });

    // Add the asset
    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);

    // Form should be reset but type should be maintained
    expect(screen.getByTestId("symbol-input")).toHaveValue("");
    expect(screen.getByTestId("quantity-input")).toHaveValue(1);
    expect(screen.queryByTestId("order-summary")).not.toBeInTheDocument();
    expect(screen.getByTestId("type-select")).toHaveValue("venda");
  });

  it("normalizes uppercase SELL type to lowercase sell when selecting an asset", () => {
    render(<AssetForm />);

    // Search for assets with type 'SELL' (uppercase in data)
    const input = screen.getByTestId("symbol-input");
    fireEvent.change(input, { target: { value: "M" } });

    // Select the asset (MSFT has type 'SELL' uppercase in our mock data)
    const assetButton = screen.getByText("MSFT");
    fireEvent.click(assetButton);

    // Check if the type select has the correct normalized lowercase value
    expect(screen.getByTestId("type-select")).toHaveValue("venda");
  });
});
