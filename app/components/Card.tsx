import React from 'react';
import LineChart from './Charts/LineChart';

interface CardProps {
  title: string;
  value: string;
  data?: any[];
}

const Card = ({ title, value, data }: CardProps) => {
  return (
    <div className='card h-full rounded-lg border border-gray-700 bg-[#081115] p-6 shadow-lg'>
      <div className='w-full items-center justify-between md:flex'>
        <div className='min-w-0 flex-1'>
          <div className='flex items-center space-x-4'>
            <div className='flex-1 overflow-hidden'>
              <h2 className='text-lg font-bold leading-tight text-gray-400'>
                {title}
              </h2>
              {value !== 'NaN' && (
                <p className='mt-1 overflow-hidden text-xl font-semibold text-indigo-600'>
                  {value}
                </p>
              )}
            </div>
          </div>
        </div>
        {data && (
          <div className='mt-4 min-w-0 flex-1 md:mt-0'>
            <LineChart />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
