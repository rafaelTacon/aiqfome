'use client';
import { CircleDollarSign, Sprout, ThermometerSun } from 'lucide-react';
import Link from 'next/link';

export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="pl-2 py-1 flex flex-col gap-2">
      <Link href={`/item/${product.id}`}>
        <div className="flex gap-0 justify-between">
          <div className="flex flex-col gap-0">
            <div className="flex items-center gap-1">
              <h2 className="font-semibold text-sm text-neutral-900">{product.title}</h2>
              {product.vegan && <Sprout className="w-4 h-4 text-teal-400" />}
              {product.spicy && <ThermometerSun className="w-4 h-4 text-teal-400" />}
            </div>
            <h2 className="text-xs text-neutral-500">{product.description}</h2>
          </div>

          <div className="flex flex-col items-end">
            {product.before && (
              <p className="text-xs font-bold line-through text-neutral-500">
                R$ {product.before.toFixed(2)}
              </p>
            )}

            <div className={`flex items-center gap-1 ${product.before ? 'text-green-600' : 'text-purple-700'}`}>
              {product.before && <CircleDollarSign className="w-3 h-3" />}
              <p className="text-sm font-bold">R$ {product.price.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
