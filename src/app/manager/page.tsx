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
    <div className="w-full">
      <PageTitle name="Gerenciador de Ordens" />

      <div
        className="grid w-full grid-cols-1 gap-4 lg:grid-cols-12"
        data-testid="manager-page"
      >
        <div
          className="w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm lg:col-span-9"
          data-testid="orders-table"
        >
          {store.orders.length > 0 ? (
            <DataTable
              columns={columns}
              data={data}
            />
          ) : (
            <div className="flex min-h-[16rem] flex-col items-center justify-center gap-1 p-8 text-center">
              <p className="text-sm font-medium text-foreground">
                Nenhum resultado listado
              </p>
              <p className="text-sm text-muted-foreground">
                Use o painel ao lado para buscar um ativo e registrar uma ordem.
              </p>
            </div>
          )}
        </div>
        <div
          className="w-full rounded-xl border border-border bg-card shadow-sm lg:col-span-3"
          data-testid="manager-panel"
        >
          <AssetForm />
        </div>
      </div>
    </div>
  );
}
