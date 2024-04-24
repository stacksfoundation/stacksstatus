'use client';

import { Tooltip } from '@nextui-org/tooltip';
import React from 'react';

interface FeesDataProps {
  tooltipContent: React.JSX.Element | string;
  children: React.ReactNode;
}

const FeesData = ({ tooltipContent, children }: FeesDataProps) => {
  return (
    <div className='mx-1 hover:bg-slate-600'>
      <Tooltip content={tooltipContent} placement='bottom' offset={10}>
        {children}
      </Tooltip>
    </div>
  );
};

export default FeesData;
