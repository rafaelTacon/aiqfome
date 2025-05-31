'use client';
import { QuantitySelectorProps } from './interfaces';
import { Trash2, CirclePlus, CircleMinus  } from 'lucide-react';

export default function QuantitySelector({
  quantity,
  total,
  onAdd,
  onIncrement,
  onDecrement,
  onRemove,
}: QuantitySelectorProps) {
  return (
    <div className="w-full flex p-4 pt-4 border-b-4 border-neutral-100">
      <div className="w-full flex flex-col justify-between items-start gap-1">
        <h2 className="font-bold text-neutral-800">quantos?</h2>
        <p className="text-sm font-medium text-neutral-500">total <span className="font-bold text-neutral-700">R$ {total.toFixed(2)}</span></p>
      </div>
        {quantity === 0 ? (
          <button
            onClick={onAdd}
            className="bg-neutral-500 text-white text-sm px-7 py-2.5 rounded-lg font-semibold h-fit"
          >
            adicionar
          </button>
        ) : (
          <div className="flex items-center gap-3">
            {quantity > 1 ? (
              <button onClick={onDecrement}>
                <CircleMinus className="w-8 h-8 stroke-1 text-teal-600" />
              </button>
            ) : (
              <button onClick={onRemove}>
                <Trash2 className="w-6 h-6 text-teal-600" />
              </button>
            )}
            <span className="w-6 text-center font-bold">{quantity}</span>
            <button onClick={onIncrement}>
              <CirclePlus  className="w-8 h-8 stroke-1 text-teal-600" />
            </button>
          </div>
        )}
    </div>
  );
}
