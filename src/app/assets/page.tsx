import { columnsAssets } from "@/app/assets/columns";
import { DataTable } from "@/app/components/data-grid/data-table";
import { getAssets } from "@/actions/assets";

export default async function Page() {
  const data = getAssets();
  return (
    <div
      className="container mx-auto p-4"
      data-testid="orders-page"
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-lg shadow"
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
