import React from 'react';
import { apiRoot, getData } from '../../../lib/util';
import { GiRabbitHead, GiBurningDot, GiTurtle } from 'react-icons/gi';
import FeesData from './FeesData';

interface FeeDetailsI {
  no_priority: number;
  low_priority: number;
  medium_priority: number;
  high_priority: number;
}

interface FeeI {
  all: FeeDetailsI;
  token_transfer: FeeDetailsI;
  contract_call: FeeDetailsI;
}

const Fees = async () => {
  // TODO write a better description
  const mempoolFeesDescription =
    'Estimated fee priorities for all transactions that are currently in the mempool. ';
  const getFees = async () => {
    return (await getData(`${apiRoot}/extended/v2/mempool/fees`)) as FeeI;
  };
  const fees = await getFees();

  const tooltipContent = (
    priority: 'low_priority' | 'medium_priority' | 'high_priority'
  ) => {
    const speed = priority.replace('_', ' ').split(' ')[0];
    const title = speed.charAt(0).toUpperCase() + speed.slice(1) + ' Priority';
    return (
      <div className='min-w-40 rounded-lg bg-slate-700 px-1 py-2'>
        <div className='text-small font-bold'>{title}</div>
        <div className='text-tiny'>all: {formatFee(fees.all[priority])}</div>
        <div className='text-tiny'>
          transfer: {formatFee(fees.token_transfer[priority])}
        </div>
        <div className='text-tiny'>
          contract call: {formatFee(fees.contract_call[priority])}
        </div>
        <div className='text-xs text-slate-400'>{mempoolFeesDescription}</div>
      </div>
    );
  };

  // show up to 2 decimal places
  const formatFee = (feeInMicroStacks: number) => {
    const fee = feeInMicroStacks / 10 ** 3;
    return parseFloat((Math.round(fee * 100) / 100).toFixed(2));
  };

  return (
    <div className='mx-5 flex justify-center rounded-md border border-slate-600 px-2'>
      <p>Mempool fees : </p>
      <FeesData tooltipContent={tooltipContent('low_priority')}>
        <div className='ml-1 flex justify-center'>
          <GiTurtle className='mt-1' />
          <p>{formatFee(fees.all.low_priority)}</p>
        </div>
      </FeesData>
      <FeesData tooltipContent={tooltipContent('medium_priority')}>
        <div className='flex justify-center '>
          <GiRabbitHead className='mt-1' />
          <p>{formatFee(fees.all.medium_priority)}</p>
        </div>
      </FeesData>
      <FeesData tooltipContent={tooltipContent('high_priority')}>
        <div className='flex justify-center'>
          <GiBurningDot className='mt-1' />
          <p>{formatFee(fees.all.high_priority)}</p>
        </div>
      </FeesData>
    </div>
  );
};

export default Fees;
