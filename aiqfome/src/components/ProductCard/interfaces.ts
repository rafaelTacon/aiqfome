interface Additional {
  label: string;
  price?: number;
  quantity?: number;
}

interface ProductCardProps {
  index: number;
  id: number;
  title: string;
  price: number;
  adicionais?: Additional[];
  obs?: string;
  quantity?: number;
  onRemove: () => void;
}