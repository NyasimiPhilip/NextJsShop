// src/app/layout.tsx
import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { constructMetadata } from '@/lib/utils';
import ClientWrapper from './ClientWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className='flex grainy-light flex-col min-h-[calc(100vh-3.5rem-1px)]'>          
            <ClientWrapper>
              <Providers>{children}</Providers>
            </ClientWrapper>
         
          <Footer />
        </main>
        <Toaster />
      </body>
    </html>
  );
}
