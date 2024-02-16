import React from 'react';

interface CardsGridLayoutProps {
  children: React.ReactNode;
}

const CardsGridLayout = ({ children }: CardsGridLayoutProps) => {
  return (
    <div className='cards-grid-layout grid h-full grid-cols-[repeat(12,_minmax(100px,1fr))] gap-2'>
      {children}
    </div>
  );
};

export default CardsGridLayout;
