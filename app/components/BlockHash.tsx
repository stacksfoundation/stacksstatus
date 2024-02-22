import React from 'react';
import Card from './Card';

const BlockHash = ({ blockhash }: { blockhash: string }) => {
  return (
    <div className='block-hash col-span-1'>
      <Card title='Blockhash' value={blockhash} />
    </div>
  );
};

export default BlockHash;
