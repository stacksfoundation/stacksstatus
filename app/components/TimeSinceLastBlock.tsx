import { blocks } from '@prisma/client';
import React from 'react';
import Card from './Card';

interface TimeSinceLastBlockProps {
  blocks: Pick<blocks, 'block_height' | 'burn_block_time'>[];
}

function formatSeconds(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  let formattedTime = '';

  if (hrs > 0) {
    formattedTime += `${hrs} hr `;
  }
  if (mins > 0 || hrs > 0) {
    formattedTime += `${mins} min `;
  }
  if (secs > 0 && hrs === 0) {
    formattedTime += `${secs} sec`;
  }

  return formattedTime.trim();
}

const TimeSinceLastBlock = ({ blocks }: TimeSinceLastBlockProps) => {
  const now = new Date();
  const timeSinceLastBlock = Math.floor(
    now.getTime() / 1000 - blocks[blocks.length - 1].burn_block_time
  );
  const currentHeight = blocks[blocks.length - 1].block_height;
  let prevBurnBlockTime = 0;
  const timeBetweenBlocks = blocks
    .map((b) => {
      const tempPrevBurnBlockTime = prevBurnBlockTime;
      prevBurnBlockTime = b.burn_block_time;
      return {
        blockHeight: b.block_height,
        seconds: b.burn_block_time - tempPrevBurnBlockTime,
      };
    })
    .slice(-200)
    .slice(1); // remove the first element since prevBurnBlockTime was 0;
  timeBetweenBlocks.push({
    blockHeight: currentHeight + 1,
    seconds: timeSinceLastBlock,
  }); // add time since last block
  return (
    <div className='time-since-last-block col-span-2'>
      <Card
        title='Time since last block'
        value={formatSeconds(timeSinceLastBlock)}
        data={timeBetweenBlocks}
        x='blockHeight'
        y='seconds'
      />
    </div>
  );
};

export default TimeSinceLastBlock;
