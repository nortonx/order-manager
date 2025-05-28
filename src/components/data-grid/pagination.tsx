import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import type { Table } from "@tanstack/react-table";

interface PaginationProps<TData> {
  readonly table: Table<TData>;
}

export function Pagination<TData>({ table }: Readonly<PaginationProps<TData>>) {
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;

  const paginationButtons = useMemo(() => {
    return Array.from({ length: pageCount }, (_, i) => (
      <Button
        key={i}
        variant={currentPage === i ? "default" : "outline"}
        size="sm"
        onClick={() => table.setPageIndex(i)}
        className="pagination-button"
      >
        {i + 1}
      </Button>
    ));
  }, [pageCount, currentPage, table]);

  return (
    <div className="flex items-center justify-center space-x-1 p-4 pagination-component">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Anterior
      </Button>
      {paginationButtons}
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Próximo
      </Button>
    </div>
  );
}
