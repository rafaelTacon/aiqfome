'use client';
import { DrinkSelectorProps } from './interfaces';
import { CircleMinus, CirclePlus, Minus } from 'lucide-react';

export default function DrinkSelector({
  title,
  choices,
  getQuantity,
  increment,
  decrement,
}: DrinkSelectorProps) {
  return (
    <div className="border-t-4 border-neutral-100 px-4 py-4">
      <h2 className="font-semibold">{title}</h2>
      <p className="text-xs text-neutral-500 mb-5 font-bold">escolha quantos quiser</p>
      <div className="flex flex-col gap-4">
        {choices.map((drink) => (
          <div key={drink.label} className="flex items-center justify-between pr-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => decrement(drink.label)}
                disabled={getQuantity(drink.label) === 0}
                className={`
                  rounded-full flex items-center justify-center
                  ${getQuantity(drink.label) === 0
                    ? 'w-7 h-7  bg-neutral-100 text-neutral-600'
                    : ''}
                  transition
                `}
              >
                {getQuantity(drink.label) === 0 ? (
                  <Minus className="w-4 h-4 stroke-1" />
                ) : (
                  <CircleMinus className="w-7 h-7 stroke-1 text-teal-600" />
                )}
              </button>
              <span className="text-sm font-bold">{getQuantity(drink.label)}</span>
              <button
                onClick={() => increment(drink.label)}
              >
                <CirclePlus className="w-7 h-7 stroke-1 text-teal-600" />
              </button>
              <span className="text-sm font-semibold text-neutral-500">{drink.label}</span>
            </div>
            <span className="text-sm font-bold text-purple-600">
              +R$ {drink.price.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
