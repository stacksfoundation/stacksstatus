import React from 'react';
import {
  getTimestampFromNow,
  millisecondsPerHour,
  queryLineChartData,
} from '../../lib/util';
import { blocks } from '@prisma/client';
import Card from './Card';

interface BlocksPerTimeProps {
  blocks: Pick<blocks, 'burn_block_time' | 'block_height'>[];
}

const BlocksPerTime = async ({ blocks }: BlocksPerTimeProps) => {
  const data = (await queryLineChartData('BlocksPerHour')) as {
    hourly_bucket: Date;
    occurrences: number;
  }[];
  const startTimestamp = getTimestampFromNow(millisecondsPerHour) / 1000;
  const blocksInLastHour = blocks.filter(
    (b) => b.burn_block_time >= startTimestamp
  );
  return (
    <div className='blocks-per-time col-span-2'>
      <Card
        title='Blocks in the last hour'
        value={blocksInLastHour.length.toLocaleString()}
        data={data}
        x='hourly_bucket'
        y='occurrences'
      />
    </div>
  );
};

export default BlocksPerTime;
