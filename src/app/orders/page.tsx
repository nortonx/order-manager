import { columns } from "@/app/components/data-grid/columns";
import { DataTable } from "@/app/components/data-grid/data-table";
import { getAssets } from "@/actions/assets";

export default async function Page() {
  const data = getAssets();
  return (
    <div className="container mx-auto py-8" data-testid="orders-page">
      <DataTable columns={columns} data={data} />
      <div>
        <h2>Orders</h2>
      </div>
    </div>
  );
}
