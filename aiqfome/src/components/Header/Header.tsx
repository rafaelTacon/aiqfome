'use client';
import { Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSearch } from '@/contexts/SearchContext';

export default function Header() {
  const pathname = usePathname();
  const showSearch = pathname === '/';
  const { search, setSearch } = useSearch();

  return (
    <header className="bg-[#7B1FA2] text-white p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <img
            src="/assets/icons/aiq-branding-icon.svg"
            alt="Ícone Aiq"
            className="w-8 h-8"
          />
          <div className="flex flex-row items-center gap-2">
            <img
              src="/assets/icons/location-icon.svg"
              alt="Ícone localização"
              className="w-6 h-6"
            />
            <div className="leading-tight">
              <p className="text-sm">entregando em</p>
              <p className="text-base font-semibold">Rua Mandaguari, 198</p>
            </div>
          </div>
        </div>
        <img
          src="/assets/icons/user-icon.svg"
          alt="Ícone do usuário"
          className="w-6 h-6"
        />
      </div>

      {showSearch && (
        <div className="relative mt-2">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="busque pela loja ou culinária"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded bg-white text-black text-sm placeholder:text-gray-400"
          />
        </div>
      )}
    </header>
  );
}
