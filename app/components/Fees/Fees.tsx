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
  if (!Object(fees).keys?.length) return;

  const tooltipContent = (
    priority: 'low_priority' | 'medium_priority' | 'high_priority'
  ) => {
    const speed = priority.replace('_', ' ').split(' ')[0];
    const title = speed.charAt(0).toUpperCase() + speed.slice(1) + ' Priority';
    return (
      <div className="m-auto min-w-40 rounded-lg bg-slate-700 p-5 font-['Arial']">
        <h2>{title}</h2>
        <ul>
          <li>
            <strong>All: </strong> {formatFee(fees.all[priority])} stx
          </li>
          <li>
            <strong>Transfer: </strong>
            {formatFee(fees.token_transfer[priority])} stx
          </li>
          <li>
            <strong>Contract Call: </strong>
            {formatFee(fees.contract_call[priority])} stx
          </li>
        </ul>
        <p className='mt-2 max-w-72 text-sm italic'>{mempoolFeesDescription}</p>
      </div>
    );
  };

  // show up to 2 decimal places
  const formatFee = (feeInMicroStacks: number) => {
    const fee = feeInMicroStacks / 10 ** 6;
    return parseFloat((Math.round(fee * 100) / 100).toFixed(2));
  };

  return (
    <div className='mx-5 flex justify-center rounded-2xl border border-slate-600 px-3 py-1'>
      <p>Fees : </p>
      <FeesData tooltipContent={tooltipContent('low_priority')}>
        <div className='flex justify-center'>
          <GiTurtle className='mx-1 mt-1' />
          <p>{formatFee(fees.all.low_priority)}</p>
        </div>
      </FeesData>
      <FeesData tooltipContent={tooltipContent('medium_priority')}>
        <div className='flex justify-center '>
          <GiRabbitHead className='mx-1 mt-1' />
          <p>{formatFee(fees.all.medium_priority)}</p>
        </div>
      </FeesData>
      <FeesData tooltipContent={tooltipContent('high_priority')}>
        <div className='flex justify-center'>
          <GiBurningDot className='mx-1 mt-1' />
          <p>{formatFee(fees.all.high_priority)}</p>
        </div>
      </FeesData>
    </div>
  );
};

export default Fees;
