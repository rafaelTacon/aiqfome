export type TicketItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  review: number;
  category: string;
  description: string;
  restauranteId: string;
  quantity: number;
  obs?: string;
  adicionais?: {
    label: string;
    price?: number;
    quantity?: number;
  }[];
};
