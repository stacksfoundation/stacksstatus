import React from 'react';
import Card from './Card';
import { MempoolTxTypeI, queryLineChartData } from '../../lib/util';

interface MempoolSizeProps {
  txTypeCounts: MempoolTxTypeI;
}

const MempoolSize = async ({ txTypeCounts }: MempoolSizeProps) => {
  if (!txTypeCounts) {
    console.error({ msg: 'failed to load MempoolSize', txTypeCounts });
    return;
  }

  const data = (await queryLineChartData('PendingTxsInMempool')) as {
    date: Date;
    size: number;
  }[];

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
        data={data}
        x='date'
        y='size'
      />
    </div>
  );
};

export default MempoolSize;
