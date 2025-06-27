import { Header } from '..';
import { Footer } from '../Footer';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
