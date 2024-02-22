import React from 'react';
import Card from './Card';

interface MempoolSizeProps {
  txTypeCounts: {
    token_transfer: number;
    smart_contract: number;
    contract_call: number;
    poison_microblock: number;
  };
}

const MempoolSize = ({ txTypeCounts }: MempoolSizeProps) => {
  if (!txTypeCounts) {
    console.error({ txTypeCounts });
    return;
  }
  return (
    <div className='mempool-txs col-span-2'>
      <Card
        title='Pending transactions in mempool'
        value={(
          txTypeCounts.token_transfer +
          txTypeCounts.smart_contract +
          txTypeCounts.contract_call +
          txTypeCounts.poison_microblock
        ).toLocaleString()}
        data={['']} // TODO
      />
    </div>
  );
};

export default MempoolSize;
