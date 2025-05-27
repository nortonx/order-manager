"use client";

import { columns } from "@/app/components/data-grid/columns";
import { DataTable } from "@/app/components/data-grid/data-table";
import AssetForm from "@/app/components/asset-manager/form";
import { useOrderStore } from "@/store/useOrderStore";

export default function AssetManager() {
  const store = useOrderStore();
  const data = store.orders;

  return (
    <div
      className="grid grid-cols-12 gap-6 max-w-fit border rounded-sm p-2"
      data-testid="manager-page"
    >
      <div className="col-span-10 w-full" data-testid="orders-table">
        {store.orders.length > 0 ? (
          <DataTable columns={columns} data={data} />
        ) : (
          <p className="mx-auto">Nenhum resultado listado</p>
        )}
      </div>
      <div
        className="col-span-2 border border-slate-800 rounded-sm"
        data-testid="manager-panel"
      >
        <AssetForm />
      </div>
    </div>
  );
}
