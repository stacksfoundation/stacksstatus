import { blocks } from '@prisma/client';
import React from 'react';
import Card from './Card';

interface TxsPerBlockProps {
  blocks: Pick<blocks, 'tx_count' | 'block_height' | 'burn_block_time'>[];
}

const TxsPerBlock = async ({ blocks }: TxsPerBlockProps) => {
  const txs = blocks
    .map((b) => {
      return {
        blockHeight: b.block_height,
        txCount: b.tx_count,
      };
    })
    .sort((a, b) => a.blockHeight - b.blockHeight)
    .slice(-200);
  return (
    <div className='txs-per-block col-span-2'>
      <Card
        title='Transactions in last block'
        value={blocks[blocks.length - 1].tx_count.toLocaleString()}
        data={txs}
        x='blockHeight'
        y='txCount'
      />
    </div>
  );
};

export default TxsPerBlock;
