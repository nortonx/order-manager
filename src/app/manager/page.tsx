import { columns } from "@/app/components/data-grid/columns";
import { DataTable } from "@/app/components/data-grid/data-table";
import { getAssets } from "@/actions/assets";
import AssetForm from "@/app/components/asset-manager/form";

export default function AssetManager() {
  return (
    <div className="grid grid-cols-12 gap-6 w-7xl" data-testid="manager-page">
      <div className="col-span-9 w-full" data-testid="orders-table">
        <DataTable columns={columns} data={getAssets()} />
      </div>
      <div
        className="col-span-3 border border-slate-800 rounded-sm"
        data-testid="manager-panel"
      >
        <AssetForm />
      </div>
    </div>
  );
}
