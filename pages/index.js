
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
      <Link href="https://stacks.org">
        <a target="_blank" rel="noopener noreferrer">
          <Logo className={styles.stxLogo} />
        </a>
      </Link>
      <div>
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
        <div className={styles.indexStxOnChain}>
            <a target="_blank" rel="noopener noreferrer" href="https://stacksonchain.com"> 
              Data provided by Stacks on Chain
            </a>
        </div>
        <div className={styles.indexRow}>
          <div className={styles.metrics}>
            <p className={styles.metricsTitle}>Current Mempool size:
               <span className={styles["metricsData"] + " " + styles["metricsTitle"]}>
                  {props.mempool_size[0].data}
              </span>
            </p>
          </div>
          <div className={styles.metrics}>
            <p className={styles.metricsTitle}>Last Block Time
              <span className={styles["metricsData"] + " " + styles["metricsTitle"]}>
                {props.block_time[0].data}
              </span>
            </p>
          </div>
          <div className={styles.metrics}>
            <p className={styles.metricsTitle}>Avg Daily Fees:
              <span className={styles["metricsData"] + " " + styles["metricsTitle"]}>
                {props.tx_fees_daily[0].data} 
              </span>
            </p>
            <p className={styles.metricsTitle}>Avg Hourly Fees: 
              <span className={styles["metricsData"] + " " + styles["metricsTitle"]}>
                {props.tx_fees_hourly[0].data}
              </span>
            </p>
          </div>
          <div className={styles.metrics}>
            <p className={styles.metricsTitle}>Block Transactions
              <span className={styles["metricsData"] + " " + styles["metricsTitle"]}>
                {props.block_txs[0].data}
              </span>
            </p>
          </div>
          <div className={styles.metrics}>
            <p className={styles.metricsTitle}>Last 10 blocks with single tx
              <span className={styles["metricsData"] + " " + styles["metricsTitle"]}>
                {props.single_tx_blocks[0].data}
              </span>
            </p>
          </div>
          <br/>
        </div>
        <div className={styles.indexRow}>
          <div className={styles.metrics}>
            <p>Blocks</p>
            <p className={styles.metricsTitle}>Block height: 
              <span className={styles["metricsData"] + " " + styles["metricsTitle"]}>
                {props.blocks[0].block_height}
              </span>
            </p>
            <p className={styles.metricsTitle}>Block hash: 
              <span className={styles["metricsData"] + " " + styles["metricsTitle"]}>
                {props.blocks[0].block_hash}
              </span>
            </p>
            <p className={styles.metricsTitle}>Burn blocktime: 
              <span className={styles["metricsData"] + " " + styles["metricsTitle"]}>
                { convertEpoch(props.blocks[0].burn_block_time) }
              </span>
            </p>
          </div>
          <div className={styles.metrics}>
            <p>Mempool Contracts</p>
            <p className={styles.metricsTitle}>{props.contracts[0].contract}: 
              <span className={styles["metricsData"] + " " + styles["metricsTitle"]}>
                {props.contracts[0].count}
              </span>
            </p>
            <p className={styles.metricsTitle}>{props.contracts[1].contract}: 
              <span className={styles["metricsData"] + " " + styles["metricsTitle"]}>
                {props.contracts[1].count}
              </span>
            </p>
            <p className={styles.metricsTitle}>{props.contracts[2].contract}: 
              <span className={styles["metricsData"] + " " + styles["metricsTitle"]}>
                {props.contracts[2].count}
              </span>
            </p>
            <p className={styles.metricsTitle}>{props.contracts[3].contract}: 
              <span className={styles["metricsData"] + " " + styles["metricsTitle"]}>
                {props.contracts[3].count}
              </span>
            </p>
            <p className={styles.metricsTitle}>{props.contracts[4].contract}: 
              <span className={styles["metricsData"] + " " + styles["metricsTitle"]}>
                {props.contracts[4].count}
              </span>
            </p>
          </div>
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