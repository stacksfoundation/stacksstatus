import React from 'react';
import CardsGridLayout from './components/CardsGridLayout';
import { apiRoot, getData } from '../lib/util';
import BlocksPerTime from './components/BlocksPerTime';
import { getBlocks } from './datastore/nodeDB';
import TxsPerTime from './components/TxsPerTime';
import TimeSinceLastBlock from './components/TimeSinceLastBlock';
import MempoolSize from './components/MempoolSize';
import TxsPerBlock from './components/TxsPerBlock';
import LatestBlock from './components/LatestBlock';
import BlockFullness from './components/BlockFullness';

const getStatusData = async () => {
  const [blocks, mempool] = await Promise.all([
    getBlocks(7),
    getData(`${apiRoot}/extended/v1/tx/mempool/stats`),
  ]);
  console.info(JSON.stringify({ blocks: blocks.length, mempool }));
  return {
    blocks,
    mempool,
  };
};

const Home = async () => {
  const data = await getStatusData();
  return (
    <div className='flex w-[95%] flex-col items-center justify-center'>
      <div className='flex items-center justify-center'>
        <h2 className='font-serif m-2 text-lg font-bold'>Overview:</h2>
      </div>
      <CardsGridLayout>
        {!!data.blocks.length && (
          <>
            <LatestBlock block={data.blocks[data.blocks.length - 1]} />
            <BlocksPerTime blocks={data.blocks} />
            <TxsPerTime blocks={data.blocks} />
            <TxsPerBlock blocks={data.blocks} />
            <TimeSinceLastBlock blocks={data.blocks} />
          </>
        )}
        {!!data.mempool && (
          <MempoolSize txTypeCounts={data.mempool.tx_type_counts} />
        )}
      </CardsGridLayout>
      <div className='block-fullness-wrapper m-2'>
        {!!data.blocks.length && (
          <BlockFullness block={data.blocks[data.blocks.length - 1]} />
        )}
      </div>
    </div>
  );
};
export default Home;
