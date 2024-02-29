import React from 'react';
import LineChart from './Charts/LineChart';

interface CardProps {
  title: string;
  value: string;
  data?: any[];
  x?: string;
  y?: string;
}

const Card = ({ title, value, data, x, y }: CardProps) => {
  return (
    <div className='card flex h-full items-center justify-center rounded-lg border border-gray-700 bg-[#081115] p-6 shadow-lg'>
      <div className='flex w-full flex-col items-center justify-between md:flex-row'>
        <div className='min-w-0 flex-1'>
          <div className='flex items-center space-x-4'>
            <div className='flex-1 overflow-hidden'>
              <h2 className='text-lg font-bold leading-tight text-gray-400'>
                {title}
              </h2>
              {value !== 'NaN' && (
                <p className='mt-1 flex justify-center overflow-hidden text-xl font-semibold text-indigo-600 md:justify-normal'>
                  {value}
                </p>
              )}
            </div>
          </div>
        </div>
        {data && (
          <div className='mt-4 min-w-0 flex-1 md:mt-0'>
            <LineChart data={data} xLabel={x} yLabel={y} tooltipTitle={title} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
