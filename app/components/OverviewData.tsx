import React from 'react';
import { blocks } from '@prisma/client';
import { getBlockFullnessPercentages, getMax } from '../../lib/util';

interface OverviewDataProps {
  block: Pick<
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
  >;
}

const OverviewData = async ({ block }: OverviewDataProps) => {
  const blockTime = new Date(block.burn_block_time * 1000).toUTCString();
  const textShadow = '0 0 10px #f9f9f9, 0 0 6px ';

  const fullnessPerc = await getBlockFullnessPercentages({ block });
  const maxFullness = getMax(fullnessPerc);

  return (
    <div className='col-span-1 w-full md:col-span-6 '>
      <ul className=' grid list-none grid-cols-1 gap-2 rounded-lg border border-gray-700  p-6 shadow-lg sm:grid-cols-3'>
        <li className='flex flex-col items-center justify-center border-gray-700 sm:border-r-2'>
          <div>
            <span
              style={{ color: 'purple', textShadow: textShadow + ' purple' }}
            >
              •
            </span>
            <span className='text-gray-500'> Block Height: </span>
          </div>
          <span className='text-2xl font-semibold'>{block.block_height}</span>
        </li>
        <li className='mr-[-1rem] flex flex-col items-center justify-center border-gray-700 sm:border-r-2'>
          <div>
            <span
              style={{ color: 'orange', textShadow: textShadow + ' orange' }}
            >
              •
            </span>
            <span className='text-gray-500'> Block Time: </span>
          </div>
          <span className='text-2xl font-semibold'> {blockTime} </span>
        </li>
        <li className='flex flex-col items-center justify-center'>
          <div>
            <span style={{ color: 'green', textShadow: textShadow + ' green' }}>
              •
            </span>
            <span className='text-gray-500'> Block Fullness: </span>
          </div>
          <span className='text-2xl font-semibold'>
            {maxFullness.toFixed(2)}%
          </span>
        </li>
      </ul>
    </div>
  );
};

export default OverviewData;

// import React from 'react';

// const BulletList = () => {
//   const items = ['dq', '112'];
//   return (
//     <ul className='ml-5 list-none rounded-lg p-4'>
//       {items.map((item, index) => (
//         <li key={index} className='flex items-center'>
//           <span className='' style={{ textShadow }}>
//             •
//           </span>{' '}
//           {/* Custom bullet point */}
//           {item}
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default BulletList;
