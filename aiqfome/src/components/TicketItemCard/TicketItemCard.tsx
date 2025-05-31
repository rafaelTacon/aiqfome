'use client';
import { FC } from 'react';
import { TicketItemCardProps } from './interfaces';
import { CircleMinus, CirclePlus, Pencil, Trash2 } from 'lucide-react';

const TicketItemCard: FC<TicketItemCardProps> = ({
  item,
  index,
  onEdit,
  onRemove,
  onIncrement,
  onDecrement,
  calculateItemTotal
}) => {
  const totalItem = calculateItemTotal(item);

  const agrupados: Record<string, {
      unitPrice: number; label: string; price: number; quantity?: number 
}[]> = {};

  item.adicionais?.forEach((add: any) => {
    const group = add.groupTitle || 'Outros';
    if (!agrupados[group]) agrupados[group] = [];
    agrupados[group].push(add);
  });

  return (
    <div className="border-b-4 border-neutral-100">
      <div className="w-full flex flex-col justify-between items-start p-4">
        <div className="w-full flex flex-col justify-between items-start">
            <div className="w-full flex justify-between">
              <h3 className="text-sm font-bold text-neutral-800">{item.title}</h3>
              <p className="text-sm font-bold text-purple-700 mt-1">R$ {totalItem.toFixed(2)}</p>
            </div>
            <div className="flex justify-end gap-6 items-middle w-full pt-1">
							<button onClick={() => onEdit(item, index)} className="flex gap-2 align-center justify-baseline ">
								<Pencil className="w-3 h-3 text-teal-600 align-baseline self-center" />
								<p className="text-sm font-bold text-teal-600 self-center">
									editar
								</p>
							</button>
							<div className="flex items-center gap-3">
								{item.quantity > 1 ? (
								<button onClick={() => onDecrement(index)}>
										<CircleMinus className="w-6 h-6 stroke-1 text-teal-600" />
								</button>
								) : (
								<button onClick={() => onRemove(index)}>
										<Trash2 className="w-5 h-5 text-teal-600" />
								</button>
								)}
								<span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
								<button onClick={() => onIncrement(index)}>
										<CirclePlus className="w-6 h-6 stroke-1 text-teal-600" />
								</button>
							</div>
            </div>
            {Object.entries(agrupados).map(([group, items]) => (
              <div key={group}>
                <p className="text-xs text-gray-500 font-bold mt-2">• {group}</p>
                {items.map((add, i) => {
                  const q = add.quantity || 1;
                  const unitPrice = add.unitPrice ?? add.price;
                  return (
                    <div key={i} className="flex text-xs text-gray-500 pl-2 font-semibold gap-2">
                      <p>
                        {add.label}
                        {q > 1 ? ` x${q}` : ''}
                      </p>
                      {unitPrice > 0 && (
                        <span className="text-teal-600 font-bold ml-1">
                          +R$ {(unitPrice * q).toFixed(2)}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}

            {item.obs && (
              <div className="bg-neutral-50 rounded p-1.5 flex gap-1 mt-1 w-full">
                <p className="text-xs text-neutral-700 font-bold">observação:</p>
                <p className="text-xs text-neutral-700 font-semibold">{item.obs}</p>
              </div>
            )}

        </div>


      </div>
    </div>
  );
};

export default TicketItemCard;
