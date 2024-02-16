import { blocks } from '@prisma/client';
import React from 'react';

interface TxsPerBlockProps {
  blocks: Pick<blocks, 'tx_count' | 'block_height' | 'burn_block_time'>[];
}

const TxsPerBlock = ({ blocks }: TxsPerBlockProps) => {
  const txs = blocks.map((b) => b.tx_count);
  return (
    <div>
      <p>Txs in last block</p>
      <p>{blocks[blocks.length - 1].tx_count}</p>
    </div>
  );
};

export default TxsPerBlock;
