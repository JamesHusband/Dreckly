import { Header } from '..';
import { Footer } from '../Footer';
import { CuisineProvider } from '@dreckly/home';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <CuisineProvider>
      <Header />
      {children}
      <Footer />
    </CuisineProvider>
  );
}
