import { render, screen, fireEvent } from "@testing-library/react";
import { ActionButtons } from "@/app/components/asset-manager/action-buttons";

describe("ActionButtons", () => {
  it("renders both buttons", () => {
    render(<ActionButtons hasSelectedAsset={true} onReset={jest.fn()} />);
    expect(
      screen.getByRole("button", { name: /Adicionar/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Cancelar/i }),
    ).toBeInTheDocument();
  });

  it("disables the Adicionar button when hasSelectedAsset is false", () => {
    render(<ActionButtons hasSelectedAsset={false} onReset={jest.fn()} />);
    expect(screen.getByRole("button", { name: /Adicionar/i })).toBeDisabled();
  });

  it("enables the Adicionar button when hasSelectedAsset is true", () => {
    render(<ActionButtons hasSelectedAsset={true} onReset={jest.fn()} />);
    expect(
      screen.getByRole("button", { name: /Adicionar/i }),
    ).not.toBeDisabled();
  });

  it("calls onReset when Cancelar button is clicked", () => {
    const onResetMock = jest.fn();
    render(<ActionButtons hasSelectedAsset={true} onReset={onResetMock} />);
    fireEvent.click(screen.getByRole("button", { name: /Cancelar/i }));
    expect(onResetMock).toHaveBeenCalledTimes(1);
  });
});
