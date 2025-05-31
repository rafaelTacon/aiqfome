import Link from 'next/link';
import { RestaurantCardProps } from './interfaces';

export default function RestaurantCard({
  id,
  name,
  image,
  freight,
  freightColor,
  freightIcon,
  rating,
  isOpen,
}: RestaurantCardProps & { isOpen: boolean }) {
  const iconSrc = freight.toLowerCase() === 'grátis'
    ? '/assets/icons/bike-icon.svg'
    : '/assets/icons/helmet-icon.svg';

  return (
    <Link
      href={`/categoria/${id}`}
      className="flex items-center gap-3 bg-gray-100 h-[72px] transition rounded-lg"
    >
      <img
        src={image}
        alt={name}
        className={`rounded object-cover w-[72px] h-[72px] ${!isOpen ? 'opacity-50' : ''}`}
      />

      <div className="flex flex-col gap-1">
        <p className="font-bold text-base">{name}</p>

        <div className="flex items-center gap-1.5 px-1">
          <div className="flex items-center gap-1">
            <img src={iconSrc} alt="frete" className="w-4 h-4" />
            <span className={`flex items-center gap-1 text-sm font-bold ${freightColor}`}>
              {freight}
            </span>
          </div>

          <div className="flex items-end gap-1">
            <span className="font-bold text-sm flex items-center gap-1">
              <img src="/assets/icons/star-icon.svg" alt="estrela" className="w-4 h-4" />
              {rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
