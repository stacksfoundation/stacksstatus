import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <div className='card h-full rounded-md border-gray-700 bg-[#081115]'>
      {children}
    </div>
  );
};

export default Card;
