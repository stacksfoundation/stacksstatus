import prisma from '../../lib/db';
import {
  TxExecutionCostDB,
  getTimestampFromNow,
  millisecondsPerDay,
} from '../../lib/util';

export const getBlocks = async (pastDays: number) => {
  try {
    const blocks = await prisma.blocks.findMany({
      select: {
        index_block_hash: true,
        burn_block_time: true,
        block_height: true,
        tx_count: true,
        block_hash: true,
        burn_block_height: true,
        burn_block_hash: true,
        miner_txid: true,
        execution_cost_read_count: true,
        execution_cost_read_length: true,
        execution_cost_runtime: true,
        execution_cost_write_count: true,
        execution_cost_write_length: true,
      },
      where: {
        burn_block_time: {
          gt: Math.floor(
            getTimestampFromNow(pastDays * millisecondsPerDay) / 1000
          ),
        },
        canonical: true,
      },
      orderBy: {
        block_height: 'asc',
      },
    });
    return blocks;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getChainTip = async () => {
  const tip = await prisma.chain_tip.findFirst({});
  return tip;
};

export const getTxs = async (
  blockHash: Buffer
): Promise<TxExecutionCostDB[]> => {
  try {
    const txs = await prisma.txs.findMany({
      select: {
        index_block_hash: true,
        microblock_hash: true,
        fee_rate: true,
        execution_cost_read_count: true,
        execution_cost_read_length: true,
        execution_cost_runtime: true,
        execution_cost_write_count: true,
        execution_cost_write_length: true,
      },
      where: { index_block_hash: blockHash },
    });
    return txs;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const addMempoolSize = async (size: number, date = new Date()) => {
  await prisma.mempool_size.create({
    data: {
      date,
      size,
    },
  });
};
