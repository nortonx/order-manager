import { render, screen, fireEvent } from "@testing-library/react";
import { AssetSearch } from "@/app/components/asset-manager/asset-search";
import { Asset } from "@/types/asset.type";

describe("AssetSearch", () => {
  const mockAssets: Asset[] = [
    {
      id: "1",
      symbol: "AAPL",
      price: 150,
      type: "BUY",
      remainingQuantity: 100,
      status: "OPEN",
      dateTime: "2024-06-01T10:15:00Z",
    },
    {
      id: "2",
      symbol: "GOOGL",
      price: 2500,
      type: "BUY",
      remainingQuantity: 50,
      status: "OPEN",
      dateTime: "2024-06-01T10:15:00Z",
    },
  ];

  it("renders asset list when results are present", () => {
    render(
      <AssetSearch
        results={mockAssets}
        onSelectAsset={jest.fn()}
      />
    );
    expect(screen.getByText("AAPL")).toBeInTheDocument();
    expect(screen.getByText("GOOGL")).toBeInTheDocument();
    expect(
      screen.queryByText("Nenhum resultado listado")
    ).not.toBeInTheDocument();
  });

  it('renders "Nenhum resultado listado" when results are empty', () => {
    render(
      <AssetSearch
        results={[]}
        onSelectAsset={jest.fn()}
      />
    );
    expect(screen.getByText("Nenhum resultado listado")).toBeInTheDocument();
  });

  it("calls onSelectAsset with correct asset when button is clicked", () => {
    const onSelectAsset = jest.fn();
    render(
      <AssetSearch
        results={mockAssets}
        onSelectAsset={onSelectAsset}
      />
    );
    const button = screen.getByRole("button", { name: "AAPL" });
    fireEvent.click(button);
    expect(onSelectAsset).toHaveBeenCalledWith(mockAssets[0]);
  });

  it("displays formatted price for each asset", () => {
    render(
      <AssetSearch
        results={mockAssets}
        onSelectAsset={jest.fn()}
      />
    );
    expect(
      screen
        .getAllByText(/\d/)
        .some(
          (el) =>
            el.textContent?.includes("150") || el.textContent?.includes("2500")
        )
    ).toBe(true);
  });
});
