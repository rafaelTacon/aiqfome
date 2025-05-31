import { TicketItem } from '@/contexts/TicketContext';

export interface TicketItemCardProps {
  item: TicketItem;
  index: number;
  onEdit: (item: TicketItem, index: number) => void;
  onRemove: (index: number) => void;
  onIncrement: (index: number) => void;
  onDecrement: (index: number) => void;
  calculateItemTotal: (item: TicketItem) => number;
}
