import { blocks } from '@prisma/client';
import React from 'react';

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
  >;
}

const LatestBlock = ({ block }: LatestBlockProps) => {
  const blockHeight = block.block_height;
  const txCount = block.tx_count;
  const blockHash = '0x' + block.block_hash.toString('hex');
  const blockTime = new Date(block.burn_block_time * 1000)
    .toUTCString()
    .slice(0, -3);
  const burnBlockHeight = block.burn_block_height;
  const minerTxID = '0x' + block.miner_txid.toString('hex');
  const burnBlockHash = '0x' + block.burn_block_hash.toString('hex');
  return (
    <div className='latest-block col-span-2 row-span-3 flex items-center justify-center rounded-lg border border-gray-700 bg-[#081115]'>
      <div className='card h-full w-full max-w-lg p-3 shadow-lg'>
        <h2 className='my-4 text-xl font-bold text-white'>Latest Block</h2>
        <ul className='list-none space-y-2'>
          <li className='text-gray-400'>
            <span className='font-semibold text-white'>Height: </span>
            {blockHeight.toLocaleString()}
          </li>
          <li className='overflow-hidden text-ellipsis text-gray-400'>
            <span className='font-semibold text-white'>Hash: </span> {blockHash}
          </li>
          <li className='text-gray-400'>
            <span className='font-semibold text-white'>Time: </span> {blockTime}
          </li>
          <li className='text-gray-400'>
            <span className='font-semibold text-white'>Transactions: </span>
            {txCount.toLocaleString()}
          </li>
          <li className='text-gray-400'>
            <span className='font-semibold text-white'>Bitcoin Block: </span>
            {burnBlockHeight.toLocaleString()}
          </li>
          <li className='overflow-hidden text-ellipsis text-gray-400'>
            <span className='font-semibold text-white'>
              Bitcoin block hash:{' '}
            </span>
            {burnBlockHash}
          </li>
          <li className='overflow-hidden text-ellipsis text-gray-400'>
            <span className='font-semibold text-white'>Miner TX ID: </span>
            {minerTxID}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LatestBlock;
