import React from 'react';
import {
  BlockExecutionCost,
  BlockExecutionCostDB,
  blockLimits,
  getTotalCosts,
  capitalizeFirstLetter,
} from '../../lib/util';
import { getTxs } from '../datastore/nodeDB';
import BarChart from './Charts/BarChart';

type NewType = BlockExecutionCostDB;

interface BlockFullnessProps {
  block: NewType;
}

// BigInt.prototype['toJSON'] = function () {
//   return this.toString();
// };

const blockPercentagesToBarData = (data: BlockExecutionCost) => {
  return Object.keys(data)?.map((k: string) => {
    return {
      name: k.split('_').map(capitalizeFirstLetter).join(' '),
      value: data[k],
    };
  });
};

const BlockFullness = async ({ block }: BlockFullnessProps) => {
  const transactions = await getTxs(block.index_block_hash);

  const { blockCosts, microblockCosts } = await getTotalCosts(
    block,
    transactions
  );

  const blockPercentages: BlockExecutionCost = {
    read_count: BigInt(0),
    read_length: BigInt(0),
    runtime: BigInt(0),
    write_count: BigInt(0),
    write_length: BigInt(0),
    length: 0,
  };

  Object.keys(blockCosts).forEach((key) => {
    blockPercentages[key] =
      (Number(blockCosts[key]) / Number(blockLimits[key])) * 100;
  });
  const microblockPercentages: BlockExecutionCost = {
    read_count: BigInt(0),
    read_length: BigInt(0),
    runtime: BigInt(0),
    write_count: BigInt(0),
    write_length: BigInt(0),
    length: 0,
  };
  Object.keys(microblockCosts).forEach((key) => {
    microblockPercentages[key] =
      (Number(microblockCosts[key]) / Number(blockLimits[key])) * 100;
  });

  // const totalFees = await getTotalFees(transactions);
  // const highestCost = Math.max(Number(...Object.values(blockPercentages)));
  // const feeRate = Math.round(totalFees / highestCost);
  return (
    <div className='card col-span-4 mt-4 h-full p-6 shadow-lg'>
      <div className='w-full items-center justify-between md:flex'>
        <div className='block-fullness'>
          <BarChart
            data={blockPercentagesToBarData(blockPercentages).sort(
              (a, b) => b.value - a.value
            )}
            width={900}
            height={700}
            blockCosts={blockCosts}
          />
        </div>
      </div>
    </div>
  );
};

export default BlockFullness;
