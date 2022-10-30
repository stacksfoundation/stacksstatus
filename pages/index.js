
import styles from '../styles/Index.module.css'
import Logo from '../public/images/indexStxLogo.svg';
import GithubLogo from '../public/images/github.svg';
import DiscordLogo from '../public/images/discord.svg';
import TwitterLogo from '../public/images/twitter.svg';
import StacksLogo from '../public/images/stacks.svg';

import Link from 'next/link';
import prisma from '../lib/db';
import { makeSerializable } from '../lib/util'
import { convertEpoch } from '../lib/util'


const Home = props => {
  console.log(props.mempool_size)
  console.log(props.block_time)
  console.log(props.block_txs)
  console.log(props.blocks)
  console.log(props.single_tx_blocks)
  console.log(props.tx_fees_daily)
  console.log(props.tx_fees_hourly)
  console.log(props.contracts)

  return (
    <div className={styles.indexParent}>
        <Logo className={styles.stxLogo} />
        <div className={styles.indexParent1}>
          <style 
            global jsx>{`
              html,
              body,
              body > div:first-child,
              div#__next,
              div#__next > div {
                height: 100%;
              }
            `}
          </style>
          <div className={styles.topRow}>
            <div className={styles.indexLogos}>
              <Link href="https://stacks.org">
                <a target="_blank" rel="noopener noreferrer">
                  <StacksLogo className={styles.serviceLogo} />
                </a>
              </Link>
              <Link href="https://discord.gg/HsK3ShU">
                <a target="_blank" rel="noopener noreferrer">
                  <DiscordLogo className={styles.serviceLogo} />
                </a>
              </Link>
              <Link href="https://twitter.com/stacksstatus">
                <a target="_blank" rel="noopener noreferrer">
                  <TwitterLogo className={styles.serviceLogo} />
                </a>
              </Link>
              <Link href="https://github.com/stacks-network/stacks-blockchain">
                <a target="_blank" rel="noopener noreferrer">
                  <GithubLogo className={styles.serviceLogo} />
                </a>
              </Link>
            </div>
          </div>

          {/* ROW 1 - mempool/fees */}
          <div className={styles.indexRow}>
            <div className={styles.metrics}>
              <p className={styles.metricsData}>
                <span className={styles.metricsKey}>Current Mempool size</span>
                <span className={styles.metricsValue}>{props.mempool_size[0].data}</span>
              </p>
            </div>
            <div className={styles.metrics}>
              <p className={styles.metricsData}>
                <span className={styles.metricsKey}>Avg Daily Fees</span>
                <span className={styles.metricsValue}>{props.tx_fees_daily[0].data}</span>
              </p>
              <p className={styles.metricsData}>
                <span className={styles.metricsKey}>Avg Hourly Fees</span>
                <span className={styles.metricsValue}>{props.tx_fees_hourly[0].data}</span>
              </p>
            </div>
          </div>

          {/* ROW 2 - txs*/}
          <div className={styles.indexRow}>
            <div className={styles.metrics}>
              <Link href={`https://explorer.stacks.co/block/${props.blocks[0].block_hash}?chain=mainnet`}>
                  <a target="_blank" rel="noopener noreferrer">
                    <p className={styles.metricsData}>
                      <span className={styles.metricsKey}>Block Transactions</span>
                      <span className={styles.metricsValue}>{props.block_txs[0].data}</span>
                    </p>
                  </a>
                </Link>
            </div>
            <div className={styles.metrics}>
              <p className={styles.metricsData}>
                <span className={styles.metricsKey}>Single tx blocks</span>
                <span className={styles.metricsValue}>{props.single_tx_blocks[0].data}</span>
              </p>
            </div>
          </div>

          {/* ROW 3 - blocks*/}
          <div className={styles.indexRow}>
            <div className={styles.metrics}>
              <Link href={`https://explorer.stacks.co/block/${props.blocks[0].block_hash}?chain=mainnet`}>
                <a target="_blank" rel="noopener noreferrer">
                  <p className={styles.metricsData}>
                    <span className={styles.metricsKey}>Block Height</span>
                    <span className={styles.metricsValue}>{props.blocks[0].block_height}</span>
                  </p>
                </a>
              </Link>
              <Link href={`https://explorer.stacks.co/block/${props.blocks[0].block_hash}?chain=mainnet`}>
                <a target="_blank" rel="noopener noreferrer">
                  <p className={styles.metricsData}>
                    <span className={styles.metricsKey}>Block Hash</span>
                    <span className={styles.metricsValue}>{props.blocks[0].block_hash}</span>
                  </p>
                </a>
              </Link>
              <p className={styles.metricsData}>
                <span className={styles.metricsKey}>Burn Blocktime</span>
                <span className={styles.metricsValue}>{ convertEpoch(props.blocks[0].burn_block_time) }</span>
              </p>
            </div>
          </div>

          {/* ROW 4 - contract*/}
          <div className={styles.indexRow}>
            <div className={styles.metrics}>
              <p className={styles.metricsData}>
                <span className={styles.metricsKey}>{props.contracts[0].contract}</span>
                <span className={styles.metricsValue}>{props.contracts[0].count}</span>
              </p>
              <p className={styles.metricsData}>
                <span className={styles.metricsKey}>{props.contracts[1].contract}</span>
                <span className={styles.metricsValue}>{props.contracts[1].count}</span>
              </p>
              <p className={styles.metricsData}>
                <span className={styles.metricsKey}>{props.contracts[2].contract}</span>
                <span className={styles.metricsValue}>{props.contracts[2].count}</span>
              </p>
              <p className={styles.metricsData}>
                <span className={styles.metricsKey}>{props.contracts[3].contract}</span>
                <span className={styles.metricsValue}>{props.contracts[3].count}</span>
              </p>
              <p className={styles.metricsData}>
                <span className={styles.metricsKey}>{props.contracts[4].contract}</span>
                <span className={styles.metricsValue}>{props.contracts[4].count}</span>
              </p>
            </div> 
          </div>

          {/* ROW 5 - stacksonchain */}
          <div className={styles.indexRow}>
            <p className={styles.indexStxOnChain}>
              {/* <span className={styles.metricsKey}> */}
                <Link href="https://stacksonchain.com">
                  <a target="_blank" rel="noopener noreferrer">
                    Data provided by Stacks on Chain
                  </a>
                </Link>
              {/* </span> */}
            </p>
          </div>
        </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const block_time = await prisma.$queryRawUnsafe(`select * from block_time order by ts desc limit 1;`)
  const block_txs = await prisma.$queryRawUnsafe(`select * from block_txs order by ts desc limit 1;`)
  const blocks = await prisma.$queryRawUnsafe(`select * from blocks order by ts desc limit 1;`)
  const mempool_size = await prisma.$queryRawUnsafe(`select * from mempool_size order by ts desc limit 1;`)
  const single_tx_blocks = await prisma.$queryRawUnsafe(`select * from single_tx_blocks order by ts desc limit 1;`)
  const tx_fees_daily = await prisma.$queryRawUnsafe(`select * from tx_fees_daily order by ts desc limit 1;`)
  const tx_fees_hourly = await prisma.$queryRawUnsafe(`select * from tx_fees_hourly order by ts desc limit 1;`)
  const contracts = await prisma.$queryRawUnsafe(`
    with contracts as (
      select 
          * 
      from 
          mempool_contracts 
      order by 
          ts 
      desc 
      limit 5
    ) select * from contracts order by count desc;
  `)
  return {
    props: { 
      mempool_size: makeSerializable(mempool_size),
      block_time: makeSerializable(block_time),
      block_txs: makeSerializable(block_txs),
      blocks: makeSerializable(blocks),
      single_tx_blocks: makeSerializable(single_tx_blocks),
      tx_fees_daily: makeSerializable(tx_fees_daily),
      tx_fees_hourly: makeSerializable(tx_fees_hourly),
      contracts: makeSerializable(contracts),
    },
  }
}

export default Home;