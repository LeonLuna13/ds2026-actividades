import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps { children: ReactNode }

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="py-4">
        {children}
      </main>
      <Footer />
    </>
  );
}