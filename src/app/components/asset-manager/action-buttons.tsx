import { Button } from "@/app/components/ui/button";

interface ActionButtonsProps {
  readonly hasSelectedAsset: boolean;
  readonly onReset: () => void;
}

export function ActionButtons({ hasSelectedAsset, onReset }: ActionButtonsProps) {
  return (
    <div className="action-buttons p-2 flex justify-evenly">
      <Button type="submit" disabled={!hasSelectedAsset}>Adicionar</Button>
      <Button type="button" variant="secondary" onClick={onReset}>Cancelar</Button>
    </div>
  );
}
