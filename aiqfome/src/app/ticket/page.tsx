'use client';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { TicketContext } from '@/contexts/TicketContext';
import TicketHeader from '@/components/TicketHeader/TicketHeader';
import restaurantes from '@/data/restaurantes_com_opcoes_atualizado.json';
import TicketItemCard from '@/components/TicketItemCard/TicketItemCard';


export default function TicketPage() {
  const { state, dispatch } = useContext(TicketContext);
  const router = useRouter();

  const firstItem = state[0];
  const restaurante = restaurantes.find(
    (r) => r.name === firstItem?.restaurantName
  );

  const handleEdit = (item: any, index: number) => {
    sessionStorage.setItem('editItem', JSON.stringify(item));
    router.push(`/item/${item.id}?editIndex=${index}`);
  };

  const handleRemove = (index: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: index });
    const updated = state.filter((_, i) => i !== index);
    sessionStorage.setItem('ticket', JSON.stringify(updated));
  };

  const handleIncrement = (index: number) => {
    const updated = [...state];
    updated[index].quantity += 1;
    dispatch({ type: 'SET_ALL_ITEMS', payload: updated });
    sessionStorage.setItem('ticket', JSON.stringify(updated));
  };

  const handleDecrement = (index: number) => {
    const updated = [...state];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
      dispatch({ type: 'SET_ALL_ITEMS', payload: updated });
      sessionStorage.setItem('ticket', JSON.stringify(updated));
    } else {
      handleRemove(index);
    }
  };

const calculateItemTotal = (item: any) => {
  const base = item.basePrice || item.price || 0;
  const sizeExtra = item.sizeOption?.price || 0;

  const adicionaisTotal = item.adicionais?.reduce((sum: number, a: any) => {
    const unit = a.unitPrice ?? a.price ?? 0;
    const qtd = a.quantity ?? 1;
    return sum + unit * qtd;
  }, 0) || 0;

  const unitTotal = base + sizeExtra + adicionaisTotal;

  return unitTotal * item.quantity;
};


  const subtotal = state.reduce((acc: number, item: any) => acc + calculateItemTotal(item), 0);

  const handleGoHome = () => {
    sessionStorage.removeItem('ticket');
    router.push('/');
  };

  return (
    <main className="flex flex-col gap-0">
      {state.length === 0 ? (
        <div className="text-center mt-10 text-gray-600 p-4">
          <p className="mb-4">Seu ticket está vazio !</p>
          <button
            onClick={handleGoHome}
            className="bg-purple-700 text-white px-6 py-2 rounded font-semibold hover:bg-purple-800 transition"
          >
            voltar para a home
          </button>
        </div>
      ) : (
        <>
          <TicketHeader
          name={restaurante?.name || ''}
          image={restaurante?.image || ''}
        />
        <div className="flex flex-col gap-4">
         {state.map((item: any, index: number) => (
           <TicketItemCard
              key={index}
              item={item}
              index={index}
              onEdit={handleEdit}
              onRemove={handleRemove}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              calculateItemTotal={calculateItemTotal}
            />
          ))}
          <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-[0_-2px_8px_rgba(0,0,0,0.05)] z-50">
            <div className="flex justify-around gap-6 flex-wrap">
              <div className="flex flex-col justify-between items-start">
                <p className="text-sm font-semibold text-neutral-900">subtotal</p>
                <p className="text-xl font-bold text-purple-700">R$ {subtotal.toFixed(2)}</p>
              </div>
              <button
                className="bg-purple-700 text-white max-w-[200px] flex-1 sm:flex-none sm:w-auto text-sm p-3 rounded-lg font-semibold"
              >
                ir para pagamento
              </button>
            </div>
          </div>

        </div>
        </>
      )}
    </main>
  );
}
