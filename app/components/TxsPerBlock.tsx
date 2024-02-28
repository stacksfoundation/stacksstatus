import { blocks } from '@prisma/client';
import React from 'react';
import Card from './Card';

interface TxsPerBlockProps {
  blocks: Pick<blocks, 'tx_count' | 'block_height' | 'burn_block_time'>[];
}

const TxsPerBlock = async ({ blocks }: TxsPerBlockProps) => {
  const txs = blocks
    .map((b) => {
      return { block_height: b.block_height, tx_count: b.tx_count };
    })
    .sort((a, b) => a.block_height - b.block_height)
    .slice(-200);
  return (
    <div className='txs-per-block col-span-2'>
      <Card
        title='Transactions in block'
        value={blocks[blocks.length - 1].tx_count.toLocaleString()}
        data={txs}
        x='block_height'
        y='tx_count'
      />
    </div>
  );
};

export default TxsPerBlock;
