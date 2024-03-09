import React from 'react';
import CardsGridLayout from './components/CardsGridLayout';
import { apiRoot, getData } from '../lib/util';
import BlocksPerTime from './components/BlocksPerTime';
import { getBlocks } from './datastore/nodeDB';
import TimeSinceLastBlock from './components/TimeSinceLastBlock';
import MempoolSize from './components/MempoolSize';
import TxsPerBlock from './components/TxsPerBlock';
import LatestBlock from './components/LatestBlock';
import OverviewData from './components/OverviewData';
import { GetServerSideProps } from 'next';
import { blocks } from '@prisma/client';

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

export const getServerSideProps = (async () => {
  return { props: await getStatusData() };
}) satisfies GetServerSideProps<{
  blocks: Pick<
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
  >[];
  mempool: any;
}>;

const Home = async () => {
  const data = await getStatusData();
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex items-center justify-center'>
        <h2 className='font-serif m-2 text-lg font-bold'>Overview:</h2>
      </div>
      <CardsGridLayout>
        {!!data.blocks.length && (
          <>
            <OverviewData block={data.blocks[data.blocks.length - 1]} />
            <LatestBlock block={data.blocks[data.blocks.length - 1]} />
            <BlocksPerTime blocks={data.blocks} />
            <TxsPerBlock blocks={data.blocks} />
            <TimeSinceLastBlock blocks={data.blocks} />
          </>
        )}
        {!!data.mempool && (
          <MempoolSize txTypeCounts={data.mempool.tx_type_counts} />
        )}
      </CardsGridLayout>
    </div>
  );
};
export default Home;
