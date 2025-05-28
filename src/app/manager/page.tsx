"use client";

import { columns } from "@/app/manager/columns";
import { DataTable } from "@/components/data-grid/data-table";
import AssetForm from "@/components/asset-manager/form";
import { useOrderStore } from "@/store/useOrderStore";
import PageTitle from "@/components/page-title";

export default function OrderManagerPage() {
  const store = useOrderStore();
  const data = store.orders;

  return (
    <div className="w-full border rounded-sm p-2">
      <PageTitle name="Gerenciador de Ordens" />

      <div
        className="grid grid-cols-12 gap-2 w-full"
        data-testid="manager-page"
      >
        <div
          className="col-span-10 w-full bg-white dark:bg-slate-800 rounded-lg shadow"
          data-testid="orders-table"
        >
          {store.orders.length > 0 ? (
            <DataTable
              columns={columns}
              data={data}
            />
          ) : (
            <p className="max-w-fit mx-auto p-4 font-bold text-xl">
              Nenhum resultado listado
            </p>
          )}
        </div>
        <div
          className="col-span-2 border border-slate-800 bg-white dark:bg-slate-800 rounded-lg shadow"
          data-testid="manager-panel"
        >
          <AssetForm />
        </div>
      </div>
    </div>
  );
}
