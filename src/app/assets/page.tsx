import { columnsAssets } from "@/app/assets/columns";
import { DataTable } from "@/components/data-grid/data-table";
import { getAssets } from "@/actions/assets";
import PageTitle from "@/components/page-title";

export default function AssetsPage() {
  const data = getAssets();
  return (
    <div
      className="w-full border rounded-sm p-2"
      data-testid="assets-page"
    >
      <PageTitle name="Ativos" />
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
