import { render, screen } from "@testing-library/react";
import { DataTable } from "@/components/data-grid/data-table";
import type { ColumnDef } from "@tanstack/react-table";

// Mock the Pagination component
jest.mock("@/components/data-grid/pagination", () => ({
  Pagination: ({ table }: { table: { getPageCount: () => number } }) => (
    <div data-testid="pagination-mock">
      Pagination Component - Page Count: {table.getPageCount()}
    </div>
  ),
}));

interface TestData {
  id: string;
  name: string;
  value: number;
}

const mockColumns: ColumnDef<TestData>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
];

const mockData: TestData[] = [
  { id: "1", name: "Item 1", value: 100 },
  { id: "2", name: "Item 2", value: 200 },
  { id: "3", name: "Item 3", value: 300 },
];

describe("DataTable", () => {
  it("renders table with data correctly and match snapshot", () => {
    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
      />
    );

    // Check for table container
    expect(screen.getByTestId("data-table")).toBeInTheDocument();

    // Check for headers
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Value")).toBeInTheDocument();

    // Check for data rows
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
    expect(screen.getByText("300")).toBeInTheDocument();
  });

  it("renders empty state when no data provided", () => {
    render(
      <DataTable
        columns={mockColumns}
        data={[]}
      />
    );

    expect(screen.getByTestId("data-table")).toBeInTheDocument();
    expect(screen.getByText("Sem resultados.")).toBeInTheDocument();
  });

  it("renders pagination component", () => {
    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
      />
    );

    expect(screen.getByTestId("pagination-mock")).toBeInTheDocument();
  });

  it("handles empty columns array", () => {
    render(
      <DataTable
        columns={[]}
        data={[]}
      />
    );

    expect(screen.getByTestId("data-table")).toBeInTheDocument();
    // Should show "Sem resultados." when no columns are defined
    expect(screen.getByText("Sem resultados.")).toBeInTheDocument();
  });

  it("renders correct number of rows", () => {
    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
      />
    );

    // Get all table rows (excluding header row)
    const tableRows = screen.getAllByRole("row");
    // Should have 1 header row + 3 data rows = 4 total
    expect(tableRows).toHaveLength(4);
  });

  it("renders correct number of columns", () => {
    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
      />
    );

    // Get all column headers
    const columnHeaders = screen.getAllByRole("columnheader");
    expect(columnHeaders).toHaveLength(3);
  });

  it("handles large dataset", () => {
    const largeData = Array.from({ length: 100 }, (_, i) => ({
      id: i.toString(),
      name: `Item ${i}`,
      value: i * 10,
    }));

    render(
      <DataTable
        columns={mockColumns}
        data={largeData}
      />
    );

    expect(screen.getByTestId("data-table")).toBeInTheDocument();
    expect(screen.getByTestId("pagination-mock")).toBeInTheDocument();
  });

  it("handles data with missing properties gracefully", () => {
    const incompleteData = [
      { id: "1", name: "Item 1" }, // missing value
      { id: "2", value: 200 }, // missing name
      { name: "Item 3", value: 300 }, // missing id
    ] as unknown as TestData[];

    render(
      <DataTable
        columns={mockColumns}
        data={incompleteData}
      />
    );

    expect(screen.getByTestId("data-table")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
      />
    );

    const tableContainer = screen.getByTestId("data-table");
    expect(tableContainer).toHaveClass("rounded-md", "border");
  });

  it("shows empty state with correct colspan", () => {
    render(
      <DataTable
        columns={mockColumns}
        data={[]}
      />
    );

    const emptyCell = screen.getByText("Sem resultados.");
    const parentCell = emptyCell.closest("td");
    expect(parentCell).toHaveAttribute("colspan", "3");
  });

  it("renders with single row of data", () => {
    const singleRowData = [{ id: "1", name: "Single Item", value: 42 }];

    render(
      <DataTable
        columns={mockColumns}
        data={singleRowData}
      />
    );

    expect(screen.getByText("Single Item")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();

    // Should have 1 header row + 1 data row = 2 total
    const tableRows = screen.getAllByRole("row");
    expect(tableRows).toHaveLength(2);
  });

  it("handles special characters in data", () => {
    const specialData = [
      { id: "1", name: "Item with émojis 🚀", value: 100 },
      { id: "2", name: "Item with ñ special chars", value: 200 },
      { id: "3", name: "Item with 中文", value: 300 },
    ];

    render(
      <DataTable
        columns={mockColumns}
        data={specialData}
      />
    );

    expect(screen.getByText("Item with émojis 🚀")).toBeInTheDocument();
    expect(screen.getByText("Item with ñ special chars")).toBeInTheDocument();
    expect(screen.getByText("Item with 中文")).toBeInTheDocument();
  });
});
