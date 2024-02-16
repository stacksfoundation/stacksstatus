import { blocks } from '@prisma/client';
import React from 'react';

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
  let prevBurnBlockTime = 0;
  const secondsSinceLastBlockArray: number[] = blocks
    .map((b) => {
      const tempPrevBurnBlockTime = prevBurnBlockTime;
      prevBurnBlockTime = b.burn_block_time;
      return b.burn_block_time - tempPrevBurnBlockTime;
    })
    .slice(1); // remove the first element since prevBurnBlockTime was 0;
  secondsSinceLastBlockArray.push(timeSinceLastBlock); // add time since last block
  return (
    <div>
      <p>TimeSinceLastBlock</p>
      <p>{formatSeconds(timeSinceLastBlock)}</p>
    </div>
  );
};

export default TimeSinceLastBlock;
