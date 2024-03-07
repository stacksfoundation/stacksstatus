import React from 'react';
import {
  BlockExecutionCostDB,
  getBlockFullnessPercentages,
  getMax,
} from '../../lib/util';

type NewType = BlockExecutionCostDB;

interface BlockFullnessProps {
  block: NewType;
}

const BlockFullness = async ({ block }: BlockFullnessProps) => {
  const fullnessPerc = await getBlockFullnessPercentages({ block });
  const maxFullness = getMax(fullnessPerc);

  return (
    <>
      <div>Block Fullness:</div>
      <div>{maxFullness.toFixed(2)}%</div>
    </>
  );
};

export default BlockFullness;
