import { Button } from "@/app/components/ui/button";

interface ActionButtonsProps {
  readonly hasSelectedAsset: boolean;
  readonly onReset: () => void;
}

export function ActionButtons({
  hasSelectedAsset,
  onReset,
}: ActionButtonsProps) {
  return (
    <div className="action-buttons flex justify-between">
      <Button
        type="submit"
        disabled={!hasSelectedAsset}
        size="sm"
      >
        Adicionar
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onReset}
        size="sm"
      >
        Cancelar
      </Button>
    </div>
  );
}
