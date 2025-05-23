import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getAssets } from "@/actions/assets";

export default async function Page() {
  const data = getAssets();
  return (
    <div className="container mx-auto py-8" data-testid="orders-page">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
