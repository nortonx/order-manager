import { render, screen, fireEvent } from "@testing-library/react";
import AssetForm from "@/app/components/asset-manager/form";
import { Asset } from "@/types/asset.type";

// Mock dependencies
jest.mock("@/actions");
jest.mock("@/store/useAssetStore");

// Mock child components
jest.mock("@/app/components/asset-manager/asset-form-fields", () => ({
  AssetFormFields: ({ 
    symbol, 
    assetType, 
    quantity, 
    totalPrice,
    onFilterAssets, 
    onTypeChange, 
    onQuantityChange 
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
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
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

jest.mock("@/app/components/asset-manager/asset-search", () => ({
  AssetSearch: ({ results, onSelectAsset }: { results: Asset[]; onSelectAsset: (asset: Asset) => void }) => (
    <div data-testid="asset-search">
      <ul>
        {results.map((asset) => (
          <li key={asset.id} data-testid={`asset-${asset.id}`}>
            <button onClick={() => onSelectAsset(asset)}>
              {asset.symbol}
            </button>
          </li>
        ))}
      </ul>
    </div>
  ),
}));

jest.mock("@/app/components/asset-manager/order-summary", () => ({
  OrderSummary: ({ selectedAsset }: { selectedAsset: Asset }) => (
    <div data-testid="order-summary">
      {selectedAsset.symbol}
    </div>
  ),
}));

jest.mock("@/app/components/asset-manager/action-buttons", () => ({
  ActionButtons: ({ hasSelectedAsset, onReset }: { hasSelectedAsset: boolean; onReset: () => void }) => (
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

describe('AssetForm', () => {
  const mockAssets = [
    { id: '1', symbol: 'AAPL', price: 150, type: 'buy' },
    { id: '2', symbol: 'GOOGL', price: 2500, type: 'buy' },
    { id: '3', symbol: 'MSFT', price: 300, type: 'sell' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    const getAssetsMock = jest.mocked(jest.requireMock('@/actions').getAssets);
    getAssetsMock.mockReturnValue(mockAssets);
  });

  test('renders the component with initial empty state', () => {
    render(<AssetForm />);
    
    expect(screen.getByText(/Assets \(data length is: 3\)/i)).toBeInTheDocument();
    expect(screen.getByTestId('asset-form-fields')).toBeInTheDocument();
    expect(screen.getByTestId('action-buttons')).toBeInTheDocument();
    expect(screen.getByTestId('asset-search')).toBeInTheDocument();
    expect(screen.queryByTestId('order-summary')).not.toBeInTheDocument();
  });

  test('filters assets based on search input', () => {
    render(<AssetForm />);
    
    const input = screen.getByTestId('symbol-input');
    fireEvent.change(input, { target: { value: 'A' } });
    
    expect(input).toHaveValue('A');
    expect(screen.getByTestId('asset-1')).toBeInTheDocument();
  });

  test('selects an asset when clicked', () => {
    render(<AssetForm />);
    
    // Search for assets first
    const input = screen.getByTestId('symbol-input');
    fireEvent.change(input, { target: { value: 'A' } });
    
    // Select the asset
    const assetButton = screen.getByText('AAPL');
    fireEvent.click(assetButton);
    
    // Check if order summary appears
    expect(screen.getByTestId('order-summary')).toBeInTheDocument();
    expect(screen.getByText('AAPL')).toBeInTheDocument();
  });

  test('updates quantity and recalculates total price', () => {
    render(<AssetForm />);
    
    // Search and select an asset first
    const input = screen.getByTestId('symbol-input');
    fireEvent.change(input, { target: { value: 'A' } });
    
    const assetButton = screen.getByText('AAPL');
    fireEvent.click(assetButton);
    
    // Change quantity
    const quantityInput = screen.getByTestId('quantity-input');
    fireEvent.change(quantityInput, { target: { value: '3' } });
    
    // Check if quantity is updated
    expect(quantityInput).toHaveValue(3);
    expect(screen.getByTestId('total-price')).toHaveTextContent('450');
  });

  test('changes asset type', () => {
    render(<AssetForm />);
    
    // Search and select an asset first
    const input = screen.getByTestId('symbol-input');
    fireEvent.change(input, { target: { value: 'A' } });
    
    const assetButton = screen.getByText('AAPL');
    fireEvent.click(assetButton);
    
    // Change type
    const typeSelect = screen.getByTestId('type-select');
    fireEvent.change(typeSelect, { target: { value: 'sell' } });
    
    expect(typeSelect).toHaveValue('sell');
  });

  test('submits the form with selected asset data', () => {
    const addAssetMock = jest.fn();
    const useAssetStoreMock = jest.mocked(jest.requireMock('@/store/useAssetStore').default);
    useAssetStoreMock.getState.mockReturnValue({ 
      addAsset: addAssetMock 
    });
    
    render(<AssetForm />);
    
    // Search and select an asset
    const input = screen.getByTestId('symbol-input');
    fireEvent.change(input, { target: { value: 'A' } });
    
    const assetButton = screen.getByText('AAPL');
    fireEvent.click(assetButton);
    
    // Submit the form
    const addButton = screen.getByTestId('add-button');
    fireEvent.click(addButton);
    
    // Check if addAsset was called with correct data
    expect(addAssetMock).toHaveBeenCalledWith(expect.objectContaining({
      id: '1',
      symbol: 'AAPL',
      price: 150,
      quantity: 1,
      totalPrice: 150,
      type: 'buy'
    }));
  });

  test('resets the form when reset button is clicked', () => {
    render(<AssetForm />);
    
    // Search and select an asset first
    const input = screen.getByTestId('symbol-input');
    fireEvent.change(input, { target: { value: 'A' } });
    
    const assetButton = screen.getByText('AAPL');
    fireEvent.click(assetButton);
    
    // Verify order summary is shown
    expect(screen.getByTestId('order-summary')).toBeInTheDocument();
    
    // Click reset button
    const resetButton = screen.getByTestId('reset-button');
    fireEvent.click(resetButton);
    
    // Verify form is reset
    expect(screen.getByTestId('symbol-input')).toHaveValue('');
    expect(screen.getByTestId('quantity-input')).toHaveValue(1);
    expect(screen.queryByTestId('order-summary')).not.toBeInTheDocument();
  });

  test('add button is disabled when no asset is selected', () => {
    render(<AssetForm />);
    
    const addButton = screen.getByTestId('add-button');
    expect(addButton).toBeDisabled();
  });

  test('add button is enabled when asset is selected', () => {
    render(<AssetForm />);
    
    // Search and select an asset
    const input = screen.getByTestId('symbol-input');
    fireEvent.change(input, { target: { value: 'A' } });
    
    const assetButton = screen.getByText('AAPL');
    fireEvent.click(assetButton);
    
    const addButton = screen.getByTestId('add-button');
    expect(addButton).not.toBeDisabled();
  });
});

