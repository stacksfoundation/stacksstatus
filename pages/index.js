
import styles from '../styles/Index.module.css'
import Logo from '../public/images/indexStxLogo.svg';
import GithubLogo from '../public/images/github.svg';
import DiscordLogo from '../public/images/discord.svg';
import TwitterLogo from '../public/images/twitter.svg';
import StacksLogo from '../public/images/stacks.svg';
import Link from 'next/link';
import prisma from '../lib/db';
import { makeSerializable } from '../lib/util'


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
        <div className={styles.indexParent}>
          <Link href="https://stacks.org">
            <a target="_blank" rel="noopener noreferrer">
              <Logo className={styles.stxLogo} />
            </a>
          </Link>
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
        <div className={styles.indexRow1}>
          <div className={styles.metrics}>
            <p>Current Mempool size</p>
            {props.mempool_size[0].data}
          </div>
          <div className={styles.metrics}>
            <p>Last Block Time</p>
            {props.block_time[0].data}
          </div>
          <div className={styles.metrics}>
            <p>Tx Fees</p>
            <p>Daily: {props.tx_fees_daily[0].data} </p>
            <p>Hourly: {props.tx_fees_hourly[0].data}</p>
          </div>
          <div className={styles.metrics}>
            <p>Block Transactions</p>
            {props.block_txs[0].data}
          </div>
          <div className={styles.metrics}>
            <p>Last 10 blocks with single tx</p>
            {props.single_tx_blocks[0].data}
          </div>
          <br/>
        </div>
        <div className={styles.indexRow2}>
          <div className={styles.metrics}>
            <p>Blocks</p>
            <p>Block height: {props.blocks[0].block_height}</p>
            <p>Block hash: {props.blocks[0].block_hash}</p>
            <p>Burn blocktime: {props.blocks[0].burn_block_time}</p>
          </div>
        </div>
        <div className={styles.indexRow3}>
          <div className={styles.metrics}>
            <p>Mempool Contracts</p>
            <p>{props.contracts[0].contract}: {props.contracts[0].count}</p>
            <p>{props.contracts[1].contract}: {props.contracts[1].count}</p>
            <p>{props.contracts[2].contract}: {props.contracts[2].count}</p>
            <p>{props.contracts[3].contract}: {props.contracts[3].count}</p>
            <p>{props.contracts[4].contract}: {props.contracts[4].count}</p>
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