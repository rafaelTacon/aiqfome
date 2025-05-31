import { useState } from 'react';

interface DrinkChoice {
  label: string;
  price: number;
}

export function useDrinkSelector(choices: DrinkChoice[]) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const getQuantity = (label: string) => quantities[label] || 0;

  const increment = (label: string) => {
    setQuantities((prev) => ({
      ...prev,
      [label]: (prev[label] || 0) + 1,
    }));
  };

  const decrement = (label: string) => {
    setQuantities((prev) => {
      const current = prev[label] || 0;
      if (current <= 1) {
        const { [label]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [label]: current - 1 };
    });
  };

  const getSelected = () =>
    choices
      .map((choice) => ({
        ...choice,
        quantity: quantities[choice.label] || 0,
      }))
      .filter((c) => c.quantity > 0);

  const getTotal = () =>
    getSelected().reduce((acc, c) => acc + c.price * c.quantity, 0);

  const restoreQuantities = (
    _choices: DrinkChoice[],
    quantitiesMap: Record<string, number>
  ) => {
    const validQuantities = Object.entries(quantitiesMap).reduce<Record<string, number>>(
      (acc, [label, quantity]) => {
        if (
          choices.some((c) => c.label === label) &&
          typeof quantity === 'number' &&
          quantity > 0
        ) {
          acc[label] = quantity;
        }
        return acc;
      },
      {}
    );

    setQuantities(validQuantities);
  };

  return {
    getQuantity,
    increment,
    decrement,
    getSelected,
    getTotal,
    restoreQuantities,
  };
}
