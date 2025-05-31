import { readFileSync } from 'fs';
import path from 'path';
import ProductCard from '@/components/ProductCard/ProductCard';
import AccordionCategory from '@/components/AccordionCategory/AccordionCategory';
import * as Accordion from '@radix-ui/react-accordion';
import RestaurantHeader from '@/components/RestaurantHeader/RestaurantHeader';
import { CategoriaPageProps, Produto, RestauranteDetalhado } from './interfaces';

export default function CategoriaPage({ params }: CategoriaPageProps) {
  const produtosPath = path.join(process.cwd(), 'src/data/restaurantes_com_opcoes_atualizado.json');
  const fileContent = readFileSync(produtosPath, 'utf-8');
  const restaurantes = JSON.parse(fileContent) as RestauranteDetalhado[];

  const restaurante = restaurantes.find((r) => r.id === params.slug);

  if (!restaurante) {
    return <div>Restaurante não encontrado.</div>;
  }

  const produtosPorCategoria: Record<string, Produto[]> = restaurante.menu.reduce((acc, categoria) => {
    acc[categoria.title] = categoria.products;
    return acc;
  }, {} as Record<string, Produto[]>);

  const iconSrc = restaurante.freight.toLowerCase() === 'grátis'
    ? '/assets/icons/bike-icon.svg'
    : '/assets/icons/helmet-icon.svg';

  return (
    <main>
      <RestaurantHeader
        name={restaurante.name}
        image={restaurante.image}
        freight={restaurante.freight}
        freightColor={restaurante.freightColor}
        freightIcon={iconSrc}
        rating={restaurante.rating}
        isOpen={restaurante.isOpen}
      />

      <Accordion.Root type="multiple" className="flex flex-col gap-4">
        {restaurante.menu.map((categoria) => (
          <AccordionCategory
            key={categoria.title}
            title={categoria.title}
            description={categoria.description}
            value={categoria.title}
            icon={categoria?.icon}
          >
            <div className="grid grid-cols-1 gap-3">
              {categoria.products.map((produto) => (
                <ProductCard key={produto.id} product={produto} />
              ))}
            </div>
          </AccordionCategory>
        ))}
      </Accordion.Root>
    </main>
  );
}
