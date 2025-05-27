import { columnsAssets } from "@/app/assets/columns";
import { DataTable } from "@/app/components/data-grid/data-table";
import { getAssets } from "@/actions/assets";

export default async function Page() {
  const data = getAssets();
  return (
    <div
      className="grid grid-cols-12 gap-6 max-w-fit border rounded-sm p-2"
      data-testid="orders-page"
    >
      <div
        className="col-span-12 w-full"
        data-testid="assets-table"
      >
        <DataTable
          columns={columnsAssets}
          data={data}
        />
      </div>
    </div>
  );
}
