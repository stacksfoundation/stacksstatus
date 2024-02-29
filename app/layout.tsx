import '../styles/globals.css';
import { Metadata, Viewport } from 'next';
import React from 'react';
import Navbar from './components/Navigation/Navbar';
import Footer from './components/Navigation/Footer';

export const metadata: Metadata = {
  title: 'Stacks Blockchain Status',
  description: 'Data, status & Analytics for the Stacks Blockchain ',
};

export const viewport: Viewport = {
  themeColor: '#05030A',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/images/favicon.ico' />
      </head>
      <body className='flex min-h-[100vh] flex-col'>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
