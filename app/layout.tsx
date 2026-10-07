import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NavLinks from '@/components/NavLinks';

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Sacrament Meeting Planner',
    template: '%s | Sacrament Meeting Planner',
  },
  description:
    'Plan and review sacrament meeting programs for your ward.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />

          <NavLinks />

          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}