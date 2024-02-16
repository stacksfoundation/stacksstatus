import { blocks } from '@prisma/client';
import React from 'react';
import { getTimestampFromNow, millisecondsPerHour } from '../../lib/util';

interface TxsPerTimeProps {
  blocks: Pick<blocks, 'tx_count' | 'block_height' | 'burn_block_time'>[];
}

const TxsPerTime = ({ blocks }: TxsPerTimeProps) => {
  const startTimestamp =
    getTimestampFromNow(millisecondsPerHour * 24 * 10) / 1000;
  const blocksInLast24h = blocks.filter(
    (b) => b.burn_block_time >= startTimestamp
  );
  const txCount = blocksInLast24h.reduce(
    (accumulator, currentValue) => accumulator + currentValue.tx_count,
    0
  );
  const secondsDiff =
    blocksInLast24h[blocksInLast24h.length - 1].burn_block_time -
    blocksInLast24h[0].burn_block_time;
  const tps = parseFloat(
    (Math.round((txCount / secondsDiff) * 100) / 100).toFixed(2)
  );
  return (
    <div>
      <p>Transactions per Second</p>
      <p>{tps}</p>
    </div>
  );
};

export default TxsPerTime;
