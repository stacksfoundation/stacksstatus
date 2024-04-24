import React from 'react';
import Card from './Card';

const BlockHeight = ({ height }: { height: number }) => {
  return (
    <div className='block-height col-span-1'>
      <Card title='Block height' value={height.toLocaleString()} />
    </div>
  );
};

export default BlockHeight;
