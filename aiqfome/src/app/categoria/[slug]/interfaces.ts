export interface CategoriaPageProps {
  params: {
    slug: string;
  };
}

export interface ProdutoChoice {
  label: string;
  price?: number;
  originalPrice?: number;
  icon?: string;
}

export type ProdutoOptionType = 'single' | 'multiple';

export interface ProdutoOption {
  title: string;
  type: ProdutoOptionType;
  required: boolean;
  min?: number;
  max?: number;
  choices: ProdutoChoice[];
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

export interface CategoriaMenu {
  title: string;
  description: string;
  products: Produto[];
  icon?: boolean;
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
  menu: CategoriaMenu[];
  drinkOptions?: ProdutoOption;
}
