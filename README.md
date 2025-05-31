# Aiqfome Ticket

Este é um projeto front-end desenvolvido com Next.js que simula a experiência de seleção de produtos, adicionais e bebidas em um sistema de pedidos online, semelhante ao Aiqfome

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Context API](https://reactjs.org/docs/context.html) para gerenciamento de carrinho (ticket)
- Armazenamento via `sessionStorage`

## Como rodar o projeto

### 1. Clone o repositório

```bash
cd aiqfome
```

### 2. Instale as dependências

Certifique-se de que você tem o [Node.js](https://nodejs.org/) instalado (recomendo versão 18+).

```bash
npm install
# ou
yarn
```

### 3. Rode o servidor de desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para visualizar o app.

## Estrutura de pastas

```
├── app/                # Páginas com rotas dinâmicas (Next.js App Router)
│   ├── item/[id]       # Página de seleção de um item específico
│   └── ticket          # Carrinho de pedidos
├── components/         # Componentes reutilizáveis (Banner, Selectores, etc)
├── contexts/           # Context API para gerenciar o Ticket
├── data/               # Arquivos JSON com produtos e restaurantes
├── hooks/              # Hooks personalizados para manipular adicionais e bebidas
├── public/             # Imagens e ícones públicos
└── styles/             # Estilos globais com Tailwind
```

## Funcionalidades

- Listagem de produtos com opções dinâmicas
- Seletor de adicionais com preço variável
- Seletor de bebidas com quantidade
- Cálculo de total do pedido com promoções (de/por)
- Edição de pedidos via `sessionStorage`
- Carrinho persistente entre páginas

## Melhorias futuras

- Integração com backend
- Autenticação de usuário
- Testes automatizados

## Licença

Este projeto é apenas para fins de aprendizado e não possui licença comercial.
