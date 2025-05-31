export interface ProdutoOptionChoice {
  label: string;
  price?: number;
  originalPrice?: number;
  quantity?: number;
  icon?: string;
}

export interface ProdutoOption {
  title: string;
  type: 'single' | 'multiple';
  required: boolean;
  min?: number;
  max?: number;
  maxSelectable?: number;
  choices: ProdutoOptionChoice[];
}

export interface Produto {
  id: number;
  title: string;
  price: number;
  image: string;
  review: number;
  category: string;
  description: string;
  options?: ProdutoOption[];
}

export interface RestauranteDetalhado {
  id: string;
  name: string;
  image: string;
  freight: string;
  freightColor: string;
  freightIcon: string;
  rating: number;
  isOpen: boolean;
  menu: {
    title: string;
    description: string;
    products: Produto[];
  }[];
  drinkOptions?: ProdutoOption;
}

export interface ItemPageProps {
  params: {
    id: string;
  };
}

export interface CalculateTotalParams {
  quantity: number;
  produtoPrice: number;
  selectedAdicionais: { price?: number; groupTitle?: string }[];
  bebidasTotal: number;
}
