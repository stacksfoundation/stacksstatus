import prisma from '../../lib/db';
import { getTimestampFromNow, millisecondsPerDay } from '../../lib/util';

export const getBlocks = async (days: number = 300) => {
  try {
    const blocks = await prisma.blocks.findMany({
      select: { burn_block_time: true, block_height: true, tx_count: true },
      where: {
        burn_block_time: {
          gt: Math.floor(getTimestampFromNow(days * millisecondsPerDay) / 1000),
        },
        canonical: true,
      },
    });
    return blocks;
  } catch (e) {
    console.error(e);
    return [];
  }
};
