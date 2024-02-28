import { blocks } from '@prisma/client';
import React from 'react';
import {
  getTimestampFromNow,
  millisecondsPerHour,
  queryLineChartData,
} from '../../lib/util';
import Card from './Card';

interface TxsPerTimeProps {
  blocks: Pick<blocks, 'tx_count' | 'block_height' | 'burn_block_time'>[];
}

const TxsPerTime = async ({ blocks }: TxsPerTimeProps) => {
  const data = (await queryLineChartData('TPS')) as {
    hourly_bucket: Date;
    occurrences: number;
  }[];

  const startTimestamp = getTimestampFromNow(millisecondsPerHour) / 1000;
  const filteredBlocks = blocks.filter(
    (b) => b.burn_block_time >= startTimestamp
  );
  const txCount = filteredBlocks.reduce(
    (accumulator, currentValue) => accumulator + currentValue.tx_count,
    0
  );
  const secondsDiff =
    filteredBlocks[filteredBlocks.length - 1]?.burn_block_time -
    filteredBlocks[0]?.burn_block_time;
  const tps = parseFloat(
    (Math.round((txCount / secondsDiff) * 100) / 100).toFixed(2)
  );
  return (
    <div className='txs-per-time col-span-2'>
      <Card
        title='Transactions per second'
        value={tps.toLocaleString()}
        data={data}
        x='hourly_bucket'
        y='txs_per_second'
      />
    </div>
  );
};

export default TxsPerTime;
