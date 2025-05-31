import { TicketProvider } from '@/contexts/TicketContext';
import './globals.css';
import { ReactNode } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { SearchProvider } from '@/contexts/SearchContext';

export const metadata = {
  title: 'Aiqfome - Teste Front-End',
  description: 'Catálogo de Produtos com Ticket',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@100;200;300;400;500;600;700;800;900;1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-gray-900">
        <TicketProvider>
          <SearchProvider>
            <Header />
            <main>{children}</main>
          </SearchProvider>
        </TicketProvider>
        <Footer />
      </body>
    </html>
  );
}
