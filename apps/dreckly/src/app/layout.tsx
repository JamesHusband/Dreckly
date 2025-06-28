import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './global.css';
import { ClientLayout } from '@dreckly/layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dreckly',
  description: 'Food delivery app',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
};

export default RootLayout;
