'use client';

import Image from 'next/image';
import { RestaurantHeaderProps } from './interfaces';

export default function RestaurantHeader({
  name,
  image,
  freight,
  freightColor,
  freightIcon,
  rating,
  isOpen
}: RestaurantHeaderProps) {
  return (
    <div className="bg-white p-4 pt-6 flex flex-col items-start gap-4 mb-5">
      <div className="flex items-center justify-center gap-2">
        <div className="flex items-center justify-center rounded-md overflow-hidden">
            <Image src={image} alt={name} width={36} height={36} />
        </div>
        <span className="text-xl font-extrabold text-gray-900">{name}</span>
      </div>
      <div className="w-full flex items-center justify-between gap-2">
        <div className="flex items-center justify-center px-2 gap-6.5">
            <Image src="/assets/icons/share-icon.svg" alt="icone de compartilhamento" width={18} height={18} />
            <Image src="/assets/icons/like-icon.svg" alt="icone de favoritos" width={18} height={18} />
        </div>
        <a className='text-teal-600 font-bold text-xs'>mais infos</a>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-3 items-center">
            <div className="flex gap-2">
                <Image src={freightIcon} alt="icone de favoritos" width={18} height={18} />
                <span className={`text-sm font-bold ${freightColor}`}>
                    {freight}
                </span>
            </div>
            <span className="text-xs font-bold text-gray-400">•</span>
            <div className="flex gap-2">
                <span className="text-xs font-bold text-gray-500">
                    hoje, 30-40 min
                </span>
            </div>
            <span className="text-xs font-bold text-gray-400">•</span>
            <div className="flex gap-2">
                <span className="text-xs font-bold text-gray-500">
                    5.2km
                </span>
            </div>
        </div>
        {freight !== "grátis" && (
            <div className="bg-teal-50 py-1 px-2 rounded-md">
                <span className="text-sm font-bold text-teal-600">
                    entrega grátis acima de R$ 35,00
                </span>
            </div>
         )}
        <div className="flex flex-col gap-0.5">
            <div className="text-xs text-gray-500 flex items-center gap-5">
            <div className="text-xs text-gray-500 flex items-center gap-2">
                <Image src="/assets/icons/star-icon.svg" alt="icone de favoritos" width={12} height={12} />
                <span className="text-neutral-500 font-bold">{rating.toFixed(1)} de 5</span>
            </div>
            <span className={`font-bold ${isOpen ? 'text-green-500' : 'text-red-500'}`}>
                {isOpen ? 'fecha às 20:00' : 'Fechado'}
            </span>
            </div>
        </div>
        <span className="font-bold text-neutral-500 text-xs">
            pedido mínimo: R$ 15,00
        </span>
      </div>
    </div>
  );
}
