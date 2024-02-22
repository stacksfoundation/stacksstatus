import React from 'react';

interface CardsGridLayoutProps {
  children: React.ReactNode;
}

const CardsGridLayout = ({ children }: CardsGridLayoutProps) => {
  return (
    <div className='cards-grid-layout grid h-full w-[95%] grid-cols-[repeat(6,_minmax(100px,1fr))] gap-2'>
      {children}
    </div>
  );
};

export default CardsGridLayout;
