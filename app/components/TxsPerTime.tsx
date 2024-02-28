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
    hour: Date;
    tps: number;
  }[];

  const startTimestamp = getTimestampFromNow(millisecondsPerHour * 24) / 1000;
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
        data={data.map((d) => {
          return {
            hour: d.hour,
            TPS: d.tps.toString(), // Fix for Warning: Only plain objects can be passed to Client Components from Server Components. Decimal objects are not supported.
          };
        })}
        x='hour'
        y='TPS'
      />
    </div>
  );
};

export default TxsPerTime;
