import '../styles/globals.css';
import { Metadata, Viewport } from 'next';
import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
