import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'İstanbul Emlak Platformu | Hayalinizdeki Evi Bulun',
  description: 'İstanbul\'un en prestijli semtlerinde satılık ve kiralık mülkler. Akıllı arama ve kişiselleştirilmiş öneriler ile hayalinizdeki evi bulun.',
  keywords: 'istanbul emlak, satılık daire, kiralık daire, ev arama, mülk, gayrimenkul',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
