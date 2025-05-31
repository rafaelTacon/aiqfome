'use client';
import { useSearch } from '@/contexts/SearchContext';
import Banner from '@/components/Banner/Banner';
import RestaurantCard from '@/components/RestaurantCard/RestaurantCard';
import restaurants from '@/data/restaurants.json';

export default function Home() {
  const { search } = useSearch();

  const lowerSearch = search.toLowerCase();

  const filteredRestaurants = restaurants.filter((r) =>
    r.name.toLowerCase().includes(lowerSearch)
  );

  const openRestaurants = filteredRestaurants.filter((r) => r.isOpen);
  const closedRestaurants = filteredRestaurants.filter((r) => !r.isOpen);

  return (
    <>
      <Banner src="/assets/banner-home.svg" alt="Banner promocional" />

      <main className="p-4">
        <h1 className="text-xl font-extrabold pb-4 pt-2 text-purple-700">abertos</h1>
        <ul className="flex flex-col gap-4">
          {openRestaurants.map((r) => (
            <li key={r.id}>
              <RestaurantCard {...r} isOpen={true} />
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-extrabold pb-4 pt-6 text-purple-700">fechados</h2>
        <ul className="flex flex-col gap-4">
          {closedRestaurants.map((r) => (
            <li key={r.id}>
              <RestaurantCard {...r} isOpen={false} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
