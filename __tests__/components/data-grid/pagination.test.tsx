import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "@/components/data-grid/pagination";
import type { Table } from "@tanstack/react-table";

// Mock table object for testing
const createMockTable = (overrides = {}) =>
  ({
    getPageCount: jest.fn(() => 5),
    getState: jest.fn(() => ({
      pagination: { pageIndex: 0 },
    })),
    setPageIndex: jest.fn(),
    previousPage: jest.fn(),
    nextPage: jest.fn(),
    getCanPreviousPage: jest.fn(() => false),
    getCanNextPage: jest.fn(() => true),
    ...overrides,
  }) as unknown as Table<Record<string, unknown>>;

describe("Pagination", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders pagination buttons correctly", () => {
    const mockTable = createMockTable();
    render(<Pagination table={mockTable} />);

    // Check for navigation buttons
    expect(screen.getByText("Anterior")).toBeInTheDocument();
    expect(screen.getByText("Próximo")).toBeInTheDocument();

    // Check for page number buttons (1-5)
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it("highlights the current page button", () => {
    const mockTable = createMockTable({
      getState: jest.fn(() => ({
        pagination: { pageIndex: 2 }, // Third page (0-indexed)
      })),
    });

    render(<Pagination table={mockTable} />);

    const currentPageButton = screen.getByText("3");
    expect(currentPageButton).toHaveClass("pagination-button");
  });

  it("disables previous button on first page", () => {
    const mockTable = createMockTable({
      getCanPreviousPage: jest.fn(() => false),
    });

    render(<Pagination table={mockTable} />);

    const previousButton = screen.getByText("Anterior");
    expect(previousButton).toBeDisabled();
  });

  it("disables next button on last page", () => {
    const mockTable = createMockTable({
      getState: jest.fn(() => ({
        pagination: { pageIndex: 4 }, // Last page
      })),
      getCanPreviousPage: jest.fn(() => true),
      getCanNextPage: jest.fn(() => false),
    });

    render(<Pagination table={mockTable} />);

    const nextButton = screen.getByText("Próximo");
    expect(nextButton).toBeDisabled();
  });

  it("calls previousPage when previous button is clicked", () => {
    const mockTable = createMockTable({
      getState: jest.fn(() => ({
        pagination: { pageIndex: 2 },
      })),
      getCanPreviousPage: jest.fn(() => true),
    });

    render(<Pagination table={mockTable} />);

    const previousButton = screen.getByText("Anterior");
    fireEvent.click(previousButton);

    expect(mockTable.previousPage).toHaveBeenCalledTimes(1);
  });

  it("calls nextPage when next button is clicked", () => {
    const mockTable = createMockTable({
      getCanNextPage: jest.fn(() => true),
    });

    render(<Pagination table={mockTable} />);

    const nextButton = screen.getByText("Próximo");
    fireEvent.click(nextButton);

    expect(mockTable.nextPage).toHaveBeenCalledTimes(1);
  });

  it("calls setPageIndex when page number button is clicked", () => {
    const mockTable = createMockTable();
    render(<Pagination table={mockTable} />);

    const pageButton = screen.getByText("3");
    fireEvent.click(pageButton);

    expect(mockTable.setPageIndex).toHaveBeenCalledWith(2); // 0-indexed
  });

  it("handles single page correctly", () => {
    const mockTable = createMockTable({
      getPageCount: jest.fn(() => 1),
      getCanPreviousPage: jest.fn(() => false),
      getCanNextPage: jest.fn(() => false),
    });

    render(<Pagination table={mockTable} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Anterior")).toBeDisabled();
    expect(screen.getByText("Próximo")).toBeDisabled();
  });

  it("handles no pages correctly", () => {
    const mockTable = createMockTable({
      getPageCount: jest.fn(() => 0),
      getCanPreviousPage: jest.fn(() => false),
      getCanNextPage: jest.fn(() => false),
    });

    render(<Pagination table={mockTable} />);

    expect(screen.getByText("Anterior")).toBeDisabled();
    expect(screen.getByText("Próximo")).toBeDisabled();
    expect(screen.queryByText("1")).not.toBeInTheDocument();
  });

  it("updates pagination buttons when page count changes", () => {
    const mockTable = createMockTable({
      getPageCount: jest.fn(() => 3),
    });

    const { rerender } = render(<Pagination table={mockTable} />);

    // Initial state - 3 pages
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.queryByText("4")).not.toBeInTheDocument();

    // Update page count to 4
    mockTable.getPageCount = jest.fn(() => 4);
    rerender(<Pagination table={mockTable} />);

    expect(screen.getByText("4")).toBeInTheDocument();
  });
});
