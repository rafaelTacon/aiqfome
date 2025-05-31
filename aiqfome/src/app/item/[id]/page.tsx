'use client';
import { useContext, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import restaurantes from '@/data/restaurantes_com_opcoes_atualizado.json';
import { TicketContext } from '@/contexts/TicketContext';
import Banner from '@/components/Banner/Banner';
import { ItemPageProps, Produto, ProdutoOptionChoice, RestauranteDetalhado } from './interfaces';
import { useOptionSelector } from '@/hooks/useOptionSelector';
import { useDrinkSelector } from '@/hooks/useDrinkSelector';
import DrinkSelector from '@/components/DrinkSelector/DrinkSelector';
import QuantitySelector from '@/components/QuantitySelector/QuantitySelector';
import { calculateTotal } from './helper';

export default function ItemPage({ params }: ItemPageProps) {
  const { dispatch } = useContext(TicketContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const editIndex = searchParams.get('editIndex');

  const allProdutos: (Produto & { restauranteId: string })[] = (restaurantes as RestauranteDetalhado[]).flatMap((r) =>
    r.menu.flatMap((menu) => menu.products.map((p) => ({ ...p, restauranteId: r.id })))
  );

  const produto = allProdutos.find((p) => p.id.toString() === params.id);
  const restaurante = restaurantes.find((r) => r.id === produto?.restauranteId);
  const drinkSelector = useDrinkSelector(restaurante?.drinkOptions?.choices || []);

  const [obs, setObs] = useState('');
  const opcoesAdicionais = produto?.options || [];
  const optionSelector = useOptionSelector(opcoesAdicionais);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const editItem = sessionStorage.getItem('editItem');

    if (editItem && editIndex) {
      try {
        const parsed = JSON.parse(editItem);
        setQuantity(parsed.quantity || 1);
        setObs(parsed.obs || '');

        const agrupado: Record<string, string[]> = {};
        for (const add of parsed.adicionais || []) {
          const optGroup = opcoesAdicionais.find((opt) =>
            opt.choices.some((c) => c.label === add.label)
          );
          if (optGroup) {
            if (!agrupado[optGroup.title]) agrupado[optGroup.title] = [];
            agrupado[optGroup.title].push(add.label);
          }
        }

        optionSelector.setInitialSelections(agrupado);

        const bebidas = parsed.adicionais?.filter((a: any) => a.groupTitle === 'vai querer bebida?') || [];
        drinkSelector.restoreQuantities(
          bebidas.map((b: any) => ({
            label: b.label,
            price: b.unitPrice ?? b.price,
          })),
          bebidas.reduce((acc: Record<string, number>, b: any) => {
            acc[b.label] = b.quantity || 1;
            return acc;
          }, {})
        );

        sessionStorage.removeItem('editItem');
      } catch (e) {
        console.error('Erro ao carregar item de edição:', e);
      }
    }
  }, [editIndex]);

  if (!produto) return <p className="p-4">Produto não encontrado</p>;

  const selectedAdicionais = opcoesAdicionais
    .flatMap((opt) => opt.choices)
    .filter((choice: ProdutoOptionChoice) => optionSelector.getSelectedLabels().includes(choice.label));

  const bebidasTotal = drinkSelector.getTotal();

  const totalUnitValue = calculateTotal({
    quantity: 1,
    produtoPrice: produto.price,
    selectedAdicionais,
    bebidasTotal,
  });

  const total = totalUnitValue * quantity;

  const handleAdd = () => {
    if (!optionSelector.isValid()) {
      alert('Por favor, selecione as opções obrigatórias.');
      return;
    }

    if (quantity < 1) {
      alert('Selecione ao menos 1 unidade.');
      return;
    }

    const adicionaisSelecionados = opcoesAdicionais.flatMap((opt) =>
      opt.choices
        .filter((c) => optionSelector.getSelectedLabels().includes(c.label))
        .map((c) => {
          const price = typeof c.price === 'number' ? c.price : 0;
          return {
            label: c.label,
            groupTitle: opt.title.toLowerCase(),
            unitPrice: price,
            quantity: 1,
            price: price,
          };
        })
    );

    const bebidasSelecionadas = drinkSelector.getSelected().map((drink) => ({
      label: drink.label,
      groupTitle: 'vai querer bebida?',
      unitPrice: drink.price,
      quantity: drink.quantity,
      price: drink.price * drink.quantity,
    }));

    const novoItem = {
      ...produto,
      quantity,
      obs,
      restaurantName: restaurante?.name || '',
      adicionais: [...adicionaisSelecionados, ...bebidasSelecionadas],
      totalUnitValue,
    };

    const current = JSON.parse(sessionStorage.getItem('ticket') || '[]');
    const isSameRestaurant = current.every((item: any) => item.restaurantName === novoItem.restaurantName);
    const updatedCart = editIndex !== null && !isNaN(Number(editIndex))
      ? (() => {
          const temp = [...current];
          temp[Number(editIndex)] = novoItem;
          return temp;
        })()
      : isSameRestaurant
      ? [...current, novoItem]
      : [novoItem];

    sessionStorage.setItem('ticket', JSON.stringify(updatedCart));
    dispatch({ type: 'SET_ALL_ITEMS', payload: updatedCart });
    router.push('/ticket');
  };

  return (
    <main className="flex flex-col gap-4">
      <Banner src={produto.image} alt={produto.title} />

      <div>
        <div className="flex flex-col gap-1 px-4 mb-3">
          <h1 className="text-xl font-bold text-neutral-700">{produto.title}</h1>
          <div className="flex gap-2 items-baseline">
            <p className="text-sm text-neutral-500 font-extrabold mb-1.5">a partir de</p>
            <p className="text-lg text-purple-800 font-extrabold">R$ {produto.price.toFixed(2)}</p>
          </div>
          <p className="text-sm text-neutral-500">{produto.description}</p>
        </div>

        <QuantitySelector
          quantity={quantity}
          total={total}
          onAdd={() => setQuantity(1)}
          onIncrement={() => setQuantity((q) => q + 1)}
          onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
          onRemove={() => setQuantity(0)}
        />

        {opcoesAdicionais.map((opt, idx) => (
          <div key={idx} className="border-b-4 border-neutral-100">
            <div className="p-5 gap">
              <div className="flex justify-between items-center">
                <h2 className="font-bold">{opt.title}</h2>
                {opt.required && (
                  <span className="text-xs text-white bg-neutral-800 rounded px-2.5 py-1.5">obrigatório</span>
                )}
              </div>
              {!opt.min && opt.max && (
                <p className="text-xs text-neutral-500 mb-4 font-bold">
                  escolha até {opt.max}
                </p>
              )}
              {opt.min && opt.max && (
                <p className="text-xs text-neutral-500 mb-4 font-bold">
                  escolha de {opt.min} a {opt.max}
                </p>
              )}
              {opt.choices.map((choice, i) => (
                <label
                  key={i}
                  className={`flex items-center gap-3 text-neutral-500 text-sm font-normal pr-4 ${
                    i !== opt.choices.length - 1 ? 'mb-5' : ''
                  }`}
                >
                  <input
                    className="w-4 h-4 border-5 border-neutral-400"
                    type={opt.type === 'single' ? 'radio' : 'checkbox'}
                    name={opt.title}
                    checked={optionSelector.isSelected(opt.title, choice.label)}
                    disabled={optionSelector.isDisabled(opt.title, choice.label)}
                    onChange={() => optionSelector.toggle(opt.title, opt.type, choice.label)}
                  />
                  {choice.label}
                  {typeof choice.price === 'number' && (
                    choice.originalPrice ? (
                      <div className="flex items-center ml-auto font-bold gap-1.5">
                        <span className="text-neutral-500 text-xs">
                          de R$ {choice.originalPrice.toFixed(2)} por
                        </span>
                        <span className="text-green-600 text-sm">
                          R$ {choice.price.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-purple-600 font-bold ml-auto">
                        R$ {choice.price.toFixed(2)}
                      </span>
                    )
                  )}
                </label>
              ))}
            </div>

            {opt.title.toLowerCase().includes('acompanhamento') && restaurante?.drinkOptions && (
              <DrinkSelector
                title={restaurante.drinkOptions.title}
                choices={restaurante.drinkOptions.choices}
                getQuantity={drinkSelector.getQuantity}
                increment={drinkSelector.increment}
                decrement={drinkSelector.decrement}
              />
            )}
          </div>
        ))}

        <div className="p-4">
          <textarea
            value={obs}
            onChange={(e) => setObs(e.target.value)}
            className="w-full border border-neutral-200 rounded-md p-2 font-bold text-sm text-neutral-950"
             placeholder={`alguma observação do item?• opcional\nex: tirar algum ingrediente, ponto do prato`}
          />
        </div>

        {optionSelector.isValid() && quantity >= 1 && (
          <div className="fixed bottom-0 left-0 w-full p-4 z-50">
            <button
              className="w-full bg-purple-700 text-white p-4 rounded-lg font-semibold text-center text-base"
              onClick={handleAdd}
            >
              ver ticket
            </button>
          </div>
        )}
      </div>
    </main>
  );
}