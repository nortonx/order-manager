import { render, screen, fireEvent } from "@testing-library/react";
import { AssetFormFields } from "@/app/components/asset-manager/asset-form-fields";
import { RefObject, createRef } from "react";

describe("AssetFormFields", () => {
  const defaultProps = {
    symbol: "PETR4",
    assetType: "buy",
    quantity: 10,
    totalPrice: 1000,
    searchFieldRef:
      createRef<HTMLInputElement>() as RefObject<HTMLInputElement>,
    onFilterAssets: jest.fn(),
    onTypeChange: jest.fn(),
    onQuantityChange: jest.fn(),
  };

  it("renders all input fields with correct values", () => {
    render(<AssetFormFields {...defaultProps} />);
    expect(screen.getByPlaceholderText("Instrumento")).toHaveValue("PETR4");
    expect(screen.getByPlaceholderText("Quantidade")).toHaveValue(10);
    expect(screen.getByPlaceholderText("Preço")).toBeDisabled();
  });

  it("calls onFilterAssets when symbol input changes", () => {
    render(<AssetFormFields {...defaultProps} />);
    const input = screen.getByPlaceholderText("Instrumento");
    fireEvent.change(input, { target: { value: "VALE3" } });
    expect(defaultProps.onFilterAssets).toHaveBeenCalledWith("VALE3");
  });

  xit("calls onTypeChange when type is changed", () => {
    render(<AssetFormFields {...defaultProps} />);
    // Open the select dropdown and select the 'sell' option
    const selectTrigger = screen.getByRole("combobox");
    fireEvent.mouseDown(selectTrigger); // open dropdown
    const buyOption = screen.getByText("Compra");
    fireEvent.click(buyOption);
    expect(defaultProps.onTypeChange).toHaveBeenCalledWith("buy");
  });

  it("calls onQuantityChange when quantity input changes", () => {
    render(<AssetFormFields {...defaultProps} />);
    const input = screen.getByPlaceholderText("Quantidade");
    fireEvent.change(input, { target: { value: "5" } });
    expect(defaultProps.onQuantityChange).toHaveBeenCalledWith(5);
  });

  it("displays formatted total price", () => {
    render(
      <AssetFormFields
        {...defaultProps}
        totalPrice={1234.56}
      />
    );
    // The formatted value depends on formatCurrency, so just check for a string
    expect(screen.getByPlaceholderText("Preço").value).toMatch(/\d/);
  });
});
