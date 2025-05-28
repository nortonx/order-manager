import { Button } from "@/app/components/ui/button";
import { Order } from "@/types/order.type";
export default function StatusButton({ row }: Readonly<{ row: Order }>) {
  const open =
    "border-green-700 dark:border-green-500 text-green-700 dark:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20";
  const closed =
    "border-red-700 dark:border-red-500 text-red-700 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20";
  const statusClass = row.status.toLowerCase() === "aberto" ? open : closed;

  return (
    <div className="flex justify-center">
      <Button
        variant="outline"
        size="sm"
        className={`${statusClass} capitalize`}
      >
        {row.status}
      </Button>
    </div>
  );
}
