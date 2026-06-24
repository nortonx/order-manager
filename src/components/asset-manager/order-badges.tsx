import { cn } from "@/lib/utils";

const SIDE_LABELS: Record<string, string> = {
  compra: "Compra",
  venda: "Venda",
};

const STATUS_LABELS: Record<string, string> = {
  aberta: "Aberta",
  fechada: "Fechada",
};

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

const badgeBase =
  "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium uppercase tracking-wider tabular-nums";

/** Color-coded buy/sell pill for an order's side (compra/venda). */
export function OrderSideBadge({ side }: Readonly<{ side: string }>) {
  const key = side.toLowerCase();

  return (
    <span
      data-testid="order-side-badge"
      data-side={key}
      className={cn(
        badgeBase,
        "data-[side=compra]:border-emerald-400/30 data-[side=compra]:bg-emerald-400/10 data-[side=compra]:text-emerald-300",
        "data-[side=venda]:border-rose-400/30 data-[side=venda]:bg-rose-400/10 data-[side=venda]:text-rose-300"
      )}
    >
      {SIDE_LABELS[key] ?? capitalize(key)}
    </span>
  );
}

/** Status pill for an order: aberta (live) vs fechada (settled). */
export function OrderStatusBadge({ status }: Readonly<{ status: string }>) {
  const key = status.toLowerCase();

  return (
    <span
      data-testid="order-status-badge"
      data-status={key}
      className={cn(
        badgeBase,
        "data-[status=aberta]:border-teal-400/40 data-[status=aberta]:bg-teal-400/10 data-[status=aberta]:text-teal-300",
        "data-[status=fechada]:border-slate-500/30 data-[status=fechada]:bg-slate-500/10 data-[status=fechada]:text-slate-400"
      )}
    >
      {STATUS_LABELS[key] ?? capitalize(key)}
    </span>
  );
}
