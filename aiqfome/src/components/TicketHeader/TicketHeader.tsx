'use client';

import Image from 'next/image';
import { TicketHeaderProps } from './interfaces';

export default function TicketHeader({
  name,
  image,
}: TicketHeaderProps) {
  return (
    <div className="bg-white px-4 pt-6 flex flex-col items-start gap-4">
      <div className="flex items-center justify-center gap-2">
        <div className="flex items-center justify-center rounded-md overflow-hidden">
            <Image src={image} alt={name} width={36} height={36} />
        </div>
        <div className="flex flex-col gap-1.5">
            <span className="text-sm font-extrabold text-neutral-500">seus itens em</span>
            <span className="text-base font-extrabold text-gray-900">{name}</span>
        </div>
      </div>
    </div>
  );
}
