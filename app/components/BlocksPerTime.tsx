import React from 'react';
import { getTimestampFromNow, millisecondsPerHour } from '../../lib/util';
import { blocks } from '@prisma/client';

interface BlocksPerTimeProps {
  blocks: Pick<blocks, 'burn_block_time' | 'block_height'>[];
}

const BlocksPerTime = ({ blocks }: BlocksPerTimeProps) => {
  const startTimestamp = getTimestampFromNow(millisecondsPerHour) / 1000;
  const blocksInLastHour = blocks.filter(
    (b) => b.burn_block_time >= startTimestamp
  );
  return (
    <div className='p-4'>
      <p className='text-small font-bold text-gray-400'>
        Blocks in the last hour:
      </p>
      <p className='font-bold'>{blocksInLastHour.length}</p>
    </div>
  );
};

export default BlocksPerTime;
