"use client";

import { columns } from "@/app/manager/columns";
import { DataTable } from "@/app/components/data-grid/data-table";
import AssetForm from "@/app/components/asset-manager/form";
import { useOrderStore } from "@/store/useOrderStore";

export default function OrderManagerPage() {
  const store = useOrderStore();
  const data = store.orders;

  return (
    <div
      className="grid grid-cols-12 gap-6 w-full border rounded-sm p-2"
      data-testid="manager-page"
    >
      <div
        className="col-span-9 w-full bg-white dark:bg-slate-800 rounded-lg shadow"
        data-testid="orders-table"
      >
        {store.orders.length > 0 ? (
          <DataTable
            columns={columns}
            data={data}
          />
        ) : (
          <p className="max-w-fit mx-auto p-4">Nenhum resultado listado</p>
        )}
      </div>
      <div
        className="col-span-3 border border-slate-800 bg-white dark:bg-slate-800 rounded-lg shadow"
        data-testid="manager-panel"
      >
        <AssetForm />
      </div>
    </div>
  );
}
