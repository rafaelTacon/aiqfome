export interface DrinkChoice {
  label: string;
  price: number;
}

export interface DrinkSelectorProps {
  title: string;
  choices: DrinkChoice[];
  getQuantity: (label: string) => number;
  increment: (label: string) => void;
  decrement: (label: string) => void;
}
