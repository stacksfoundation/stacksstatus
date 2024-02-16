import styles from '../styles/Index.module.css';
import React from 'react';
import Card from './components/Card';
import CardsGridLayout from './components/CardsGridLayout';
import { apiRoot, getData, makeSerializable } from '../lib/util';
import BlocksPerTime from './components/BlocksPerTime';
import { getBlocks } from './datastore/nodeDB';
import TxsPerTime from './components/TxsPerTime';
import TimeSinceLastBlock from './components/TimeSinceLastBlock';
import MempoolSize from './components/MempoolSize';
import TxsPerBlock from './components/TxsPerBlock';

const getOverviewData = async () => {
  const [blocks, mempool] = await Promise.all([
    getData(`${apiRoot}/extended/v1/block?limit=2`),
    getData(`${apiRoot}/extended/v1/tx/mempool/stats`),
  ]);
  console.log(`getAllTransactions height: ${blocks.results[0].height}`);
  const txUrl = `${apiRoot}/extended/v1/tx/block_height/${blocks.results[0].height}`;
  const limit = 20; // This can be adjusted based on your needs
  let offset = 0;
  let allTransactions = [];
  while (true) {
    const txResponse = await fetch(`${txUrl}?offset=${offset}&limit=${limit}`, {
      next: { revalidate: 0 },
    });
    if (!txResponse.ok) {
      // throw new Error('Failed to fetch data');
      console.error(txResponse.body);
      return;
    }

    const txData = await txResponse.json();
    allTransactions = allTransactions.concat(txData.results);
    // Check if there are more pages
    if (offset + limit < txData.total) {
      offset += limit;
    } else {
      break;
    }
  }
  const totalFees = allTransactions.reduce(
    (sum, transaction) => sum + parseInt(transaction.fee_rate),
    0
  );
  console.log(`totalFees: ${totalFees}`);
  const feeRate = (totalFees / allTransactions.length / 1000000).toFixed(4);

  return {
    data: {
      mempoolSize: makeSerializable(
        mempool.tx_type_counts.token_transfer +
          mempool.tx_type_counts.smart_contract +
          mempool.tx_type_counts.contract_call +
          mempool.tx_type_counts.poison_microblock
      ),
      blockTime: makeSerializable(
        (blocks.results[0].burn_block_time -
          blocks.results[1].burn_block_time) /
          60
      ).toFixed(2),
      blockTxs: makeSerializable(blocks.results[0].txs.length),
      blocks: makeSerializable(blocks),
      avgFee: makeSerializable(feeRate),
    },
  };
};

const getStatusData = async () => {
  const [blocks, mempool] = await Promise.all([
    getBlocks(10),
    getData(`${apiRoot}/extended/v1/tx/mempool/stats`),
  ]);
  console.log(mempool);
  return {
    blocks,
    mempool,
  };
};

const Home = async () => {
  // const data = await getOverviewData();
  // console.log(JSON.stringify(data));
  const data = await getStatusData();
  return (
    <div className='flex w-[95%] flex-col items-center justify-center'>
      <p className='m-2 w-[95%] pl-2 font-serif font-bold'>Overview: </p>
      <CardsGridLayout>
        {data.blocks.length && (
          <div className='blocks-per-time col-span-2'>
            <Card>
              <BlocksPerTime blocks={data.blocks} />
            </Card>
          </div>
        )}
        {data.blocks.length && (
          <div className='txs-per-time col-span-2'>
            <Card>
              <TxsPerTime blocks={data.blocks} />
            </Card>
          </div>
        )}
        {data.blocks.length && (
          <div className='txs-per-block col-span-2'>
            <Card>
              <TxsPerBlock blocks={data.blocks} />
            </Card>
          </div>
        )}
        {data.blocks.length && (
          <div className='time-since-last-block col-span-2'>
            <Card>
              <TimeSinceLastBlock blocks={data.blocks} />
            </Card>
          </div>
        )}
        {data.mempool && (
          <div className='mempool-size col-span-2'>
            <Card>
              <MempoolSize txTypeCounts={data.mempool.tx_type_counts} />
            </Card>
          </div>
        )}
      </CardsGridLayout>
    </div>
  );
};
export default Home;
