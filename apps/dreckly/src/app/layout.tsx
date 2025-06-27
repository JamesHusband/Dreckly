import './global.css';

export const metadata = {
  title: 'Dreckly',
  description: 'A food delivery app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
