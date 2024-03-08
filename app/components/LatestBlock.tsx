import { blocks } from '@prisma/client';
import React from 'react';
import { getBlockFullnessPercentages, getMax } from '../../lib/util';

interface LatestBlockProps {
  block: Pick<
    blocks,
    | 'tx_count'
    | 'block_hash'
    | 'burn_block_time'
    | 'block_height'
    | 'burn_block_height'
    | 'miner_txid'
    | 'burn_block_hash'
    | 'index_block_hash'
    | 'execution_cost_read_count'
    | 'execution_cost_read_length'
    | 'execution_cost_runtime'
    | 'execution_cost_write_count'
    | 'execution_cost_write_length'
  >;
}

const LatestBlock = async ({ block }: LatestBlockProps) => {
  const blockHeight = block.block_height;
  const txCount = block.tx_count;
  const blockHash = '0x' + block.block_hash.toString('hex');
  const blockTime = new Date(block.burn_block_time * 1000)
    .toUTCString()
    .slice(0, -3);
  const burnBlockHeight = block.burn_block_height;
  const minerTxID = '0x' + block.miner_txid.toString('hex');
  const burnBlockHash = '0x' + block.burn_block_hash.toString('hex');

  const fullnessPerc = await getBlockFullnessPercentages({ block });
  const maxFullness = getMax(fullnessPerc);
  return (
    <div className='latest-block col-span-2 row-span-2 flex items-center justify-center rounded-lg border border-gray-800 bg-[#081115] px-6'>
      <div className='card h-full w-full max-w-lg p-3 shadow-lg'>
        <h2 className='my-4 text-xl font-bold text-white'>Latest Block</h2>
        <ul className='list-none space-y-2'>
          <li className='text-gray-400'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href={`https://explorer.hiro.so/block/${blockHash}?chain=mainnet`}
            >
              <span className='font-semibold text-white'>Height: </span>
              <span className='hover:bg-slate-800'>
                {blockHeight.toLocaleString()}
              </span>
            </a>
          </li>
          <li className='text-gray-400'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href={`https://explorer.hiro.so/block/${blockHash}?chain=mainnet`}
            >
              <span className='font-semibold text-white'>Fullness: </span>
              <span className='hover:bg-slate-800'>
                {maxFullness.toFixed(2)}%
              </span>
            </a>
          </li>
          <li className='overflow-hidden text-ellipsis text-gray-400'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href={`https://explorer.hiro.so/block/${blockHash}?chain=mainnet`}
            >
              <span className='font-semibold text-white'>Hash: </span>{' '}
              <span className='hover:bg-slate-800'>{blockHash}</span>
            </a>
          </li>
          <li className='text-gray-400'>
            <span className='font-semibold text-white'>Time: </span> {blockTime}
          </li>
          <li className='text-gray-400'>
            <span className='font-semibold text-white'>Transactions: </span>
            {txCount.toLocaleString()}
          </li>
          <li className='text-gray-400'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href={`https://mempool.space/block/${burnBlockHash}`}
            >
              <span className='font-semibold text-white'>Bitcoin Block: </span>
              <span className='hover:bg-slate-800'>
                {burnBlockHeight.toLocaleString()}
              </span>
            </a>
          </li>
          <li className='overflow-hidden text-ellipsis text-gray-400'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href={`https://mempool.space/block/${burnBlockHash}`}
            >
              <span className='font-semibold text-white'>
                Bitcoin block hash:{' '}
              </span>
              <span className='hover:bg-slate-800'>{burnBlockHash}</span>
            </a>
          </li>
          <li className='overflow-hidden text-ellipsis text-gray-400'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href={`https://mempool.space/tx/${minerTxID}`}
            >
              <span className='font-semibold text-white'>Miner TX ID: </span>
              <span className='hover:bg-slate-800'>{minerTxID}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LatestBlock;
