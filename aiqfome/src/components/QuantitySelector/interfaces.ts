export interface QuantitySelectorProps {
  quantity: number;
  total: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}
