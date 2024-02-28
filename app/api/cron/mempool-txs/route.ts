// https://nextjs.org/docs/app/building-your-application/routing/route-handlers
import { NextRequest, NextResponse } from 'next/server';
import { MempoolTxTypeI, apiRoot, getData } from '../../../../lib/util';
import { addMempoolSize } from '../../../datastore/nodeDB';

export async function GET(req: NextRequest) {
  try {
    // const authHeader = req.headers.get('authorization');
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //   return new NextResponse('Unauthorized', {
    //     status: 401,
    //   });
    // }
    const size = await getMempoolSize();
    await addMempoolSize(size);
    return NextResponse.json({ size });
  } catch (error) {
    const msg = 'Failed to save mempool transactions';
    console.error({ msg, error });
    return NextResponse.json(
      { error: msg },
      {
        status: 500,
      }
    );
  }
}

const getMempoolSize = async () => {
  const mempool = await getData(`${apiRoot}/extended/v1/tx/mempool/stats`);
  const txTypeCounts = mempool.tx_type_counts as MempoolTxTypeI;
  const size =
    txTypeCounts.token_transfer +
    txTypeCounts.smart_contract +
    txTypeCounts.contract_call +
    txTypeCounts.poison_microblock;
  return size;
};
