import React from 'react';

interface CardsGridLayoutProps {
  children: React.ReactNode;
}

const CardsGridLayout = ({ children }: CardsGridLayoutProps) => {
  return (
    <div className='cards-grid-layout grid h-full w-[95%] grid-cols-1 gap-2 md:grid-cols-[repeat(6,_minmax(100px,1fr))]'>
      {children}
    </div>
  );
};

export default CardsGridLayout;
