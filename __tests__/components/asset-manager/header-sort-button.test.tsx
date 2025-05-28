import { render, screen, fireEvent } from "@testing-library/react";
import HeaderSortButton from "@/components/header-sort-button";

// Mock the FilterInput component since we're only testing the button
jest.mock("@/components/data-grid/filter-input", () => ({
  __esModule: true,
  default: () => (
    <div
      data-testid="mock-filter-input"
      className="capitalize"
    />
  ),
}));

describe("HeaderSortButton", () => {
  it("renders correctly with column id", () => {
    const column = {
      id: "test-column",
      getIsSorted: jest.fn(() => false),
      toggleSorting: jest.fn(),
      getFacetedUniqueValues: jest.fn(),
    };

    render(<HeaderSortButton column={column} />);

    expect(screen.getByTestId("mock-filter-input")).toBeInTheDocument();
  });

  it("renders correctly with provided name", () => {
    const column = {
      id: "test-column",
      getIsSorted: jest.fn(() => false),
      toggleSorting: jest.fn(),
      getFacetedUniqueValues: jest.fn(),
    };

    render(
      <HeaderSortButton
        column={column}
        name="custom name"
      />
    );

    // Should use the custom name instead of column.id
    expect(screen.getByText("custom name")).toBeInTheDocument();
  });

  it("calls toggleSorting when button is clicked", () => {
    const column = {
      id: "test-column",
      getIsSorted: jest.fn(() => "asc"),
      toggleSorting: jest.fn(),
      getFacetedUniqueValues: jest.fn(),
    };

    render(<HeaderSortButton column={column} />);

    // Click the button
    fireEvent.click(screen.getByRole("button"));

    // Should call toggleSorting with true since getIsSorted returned "asc"
    expect(column.toggleSorting).toHaveBeenCalledWith(true);
  });
});
