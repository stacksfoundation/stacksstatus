import styles from "../styles/Index.module.css";
import Logo from "../public/images/indexStxLogo.svg";
import GithubLogo from "../public/images/github.svg";
import DiscordLogo from "../public/images/discord.svg";
import TwitterLogo from "../public/images/twitter.svg";
import StacksLogo from "../public/images/stacks.svg";
import StacksOnChain from '../public/images/stacksonchain.svg';

import Link from "next/link";
import { Tooltip } from '@nextui-org/react';
import prisma from "../lib/db";
import { makeSerializable } from "../lib/util";
import { convertEpoch } from "../lib/util";

const Home = (props) => {
  if (process.env.NODE_ENV != 'production') {
    console.log("mempool_size: " + props.mempool_size.data);
    // console.log("block_time: " + props.block_time.data);
    // console.log("block_txs: " + props.block_txs.data);
    // console.log("block_height: " + props.blocks.block_height);
    // console.log("block_hash: " + props.blocks.block_hash);
    // console.log("burn_block_time: " + props.blocks.burn_block_time);
    // // console.log("single_tx_blocks:" + props.single_tx_blocks.data); // disabled
    // console.log("tx_fees_daily: " + props.tx_fees_daily.data)
    // console.log("tx_fees_hourly: " + props.tx_fees_hourly.data)
    console.log("node_env: " + process.env.NODE_ENV)
  }
  
  var tx_fees_daily_num = Number(props.tx_fees_daily.data);
  var tx_fees_hourly_num = Number(props.tx_fees_hourly.data);

  return (
    <div className={styles.indexParent}>
      <Logo className={styles.stxLogo} />
      <div className={styles.indexData}>
        <style global jsx>
          {`
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
            <grid>
              <Tooltip placement="bottomStart" hideArrow rounded content="StacksOnChain" >
                <Link href="https://stacksonchain.com">
                  <a target="_blank" rel="noopener noreferrer">
                      <StacksOnChain className={styles.serviceLogo} />
                  </a>
                </Link>
              </Tooltip>
            </grid>
            <grid>
              <Tooltip placement="bottomStart" hideArrow rounded content="Stacks.org">
                <Link href="https://stacks.org">
                  <a target="_blank" rel="noopener noreferrer">
                    <StacksLogo className={styles.serviceLogo} />
                  </a>
                </Link>
              </Tooltip>
            </grid>
            <grid>
              <Tooltip placement="bottomStart" hideArrow rounded content="Stacks Blockchain Repo">
                <Link href="https://github.com/stacks-network/stacks-blockchain">
                  <a target="_blank" rel="noopener noreferrer">
                    <GithubLogo className={styles.serviceLogo} />
                  </a>
                </Link>
              </Tooltip>
            </grid>
            <grid>
              <Tooltip placement="bottomStart" hideArrow rounded content="Stacks Discord">
                <Link href="https://discord.gg/HsK3ShU">
                  <a target="_blank" rel="noopener noreferrer">
                    <DiscordLogo className={styles.serviceLogo} />
                  </a>
                </Link>
              </Tooltip>
            </grid>
            <grid>
              <Tooltip placement="bottomStart" hideArrow rounded content="Stacks Twitter">
                <Link href="https://twitter.com/stacksstatus">
                  <a target="_blank" rel="noopener noreferrer">
                    <TwitterLogo className={styles.serviceLogo} />
                  </a>
                </Link>
              </Tooltip>
            </grid>
          </div>
        </div>

        {/* ROW 1 */}
        <div className={styles.indexRow}>
          <div className={styles.metrics}>
            <div className={styles.metricsData}>
              <p className={styles.metricsKey}>Block Height</p>
              <p className={styles.metricsValue}>
                <Link href={`https://explorer.stacks.co/block/${props.blocks.block_hash}?chain=mainnet`}>
                  <a className={styles.metricsValue} target="_blank" rel="noopener noreferrer">
                    {props.blocks ? props.blocks.block_height: "Data Unavailable"}
                  </a>
                </Link>
              </p>
            </div>
          </div>
          <div className={styles.metrics}>
            <div className={styles.metricsData}>
              <p className={styles.metricsKey}>Block Hash</p>
              <p className={styles.metricsValue}>
                <span className={styles.metricsValueSmall}>
                  <Link href={`https://explorer.stacks.co/block/${props.blocks.block_hash}?chain=mainnet`}>
                    <a className={styles.metricsValueSmall} target="_blank" rel="noopener noreferrer">
                      {props.blocks.block_hash}
                    </a>
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* ROW 2 */}
        <div className={styles.indexRow}>
          <div className={styles.metrics}>
            <div className={styles.metricsData}>
              <p className={styles.metricsKey}>Current Mempool Size</p>
              <p className={styles.metricsValue}>{props.mempool_size.data}<span className={styles.metricsValueDesc}>TXS</span></p>
            </div>
          </div>
          <div className={styles.metrics}>
            <div className={styles.metricsData}>
              <p className={styles.metricsKey}>Avg Daily Fees</p>
              <p className={styles.metricsValue}>
                {tx_fees_daily_num ? tx_fees_daily_num.toFixed(2) : "Data Unavailable"}
                  <span className={styles.metricsValueDesc}>STX</span>
              </p> 
            </div>
          </div>
          <div className={styles.metrics}>
            <div className={styles.metricsData}>
              <p className={styles.metricsKey}>Avg Hourly Fees</p>
              <p className={styles.metricsValue}>
                {tx_fees_hourly_num ? tx_fees_hourly_num.toFixed(2) : "Data Unavailable"}
                  <span className={styles.metricsValueDesc}>STX</span>
              </p>                
            </div>
          </div>
          {/* Disabled */}
          {/* <div className={styles.metrics}>
            <div className={styles.metricsData}>
              <p className={styles.metricsKey}>Single tx blocks</p>
              <p className={styles.metricsValue}>
                {props.single_tx_blocks.data}
              </p>
            </div>
          </div> */}
        </div>

        {/* ROW 3 */}
        <div className={styles.indexRow}>
         <div className={styles.metrics}>
            <div className={styles.metricsData}>
              <p className={styles.metricsKey}>Txs In Last block</p>
              <p className={styles.metricsValue}>
                <Link href={`https://explorer.stacks.co/block/${props.blocks.block_hash}?chain=mainnet`}>
                  <a className={styles.metricsValue} target="_blank" rel="noopener noreferrer">
                    {props.block_txs.data}
                  </a>
                </Link>
              </p>
            </div>
          </div>
          <div className={styles.metrics}>
            <div className={styles.metricsData}>
              <p className={styles.metricsKey}>Block Duration</p>
              <p className={styles.metricsValue}>
                <span className={styles.metricsValue}>
                  {props.block_time.data}
                  <span className={styles.metricsValueDesc}>Minutes</span>
                </span>
              </p>
            </div>
          </div>
          <div className={styles.metrics}>
            <div className={styles.metricsData}>
              <p className={styles.metricsKey}>Burn Blocktime</p>
              <p className={styles.metricsValue}>
                <span className={styles.metricsValueSmall}>
                  {convertEpoch(props.blocks.burn_block_time)}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* ROW 4 - contract*/}
        <div className={styles.indexRow}>
          <div className={styles.metrics}>
            <div className={styles.metricsData}>
            <table className={styles.table}>
              <tbody>
                <tr className={styles.tableRow}>
                  <th className={styles.metricsKey}>Contract</th>
                  <th className={styles.metricsKey}>txs in mempool</th>
                </tr>
                {props.contracts.map((contract, index) => {
                  return (
                    <tr className={styles.tableRow} key={index}>
                      <td className={(styles.metricsValueSmall, styles.tableCellKey)}>
                        <Link href={`https://explorer.stacks.co/txid/${contract.contract}?chain=mainnet`}>
                          <a className={styles.metricsValueSmall} target="_blank" rel="noopener noreferrer">
                            {contract.contract}
                          </a>
                        </Link>
                      </td>
                      <td className={(styles.metricsValueSmall, styles.tableCellValue)}>
                        {contract.count}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </div>
        </div>

        {/* ROW 5 - add some space at bottom of page */}
        <div className={styles.bottomRow}></div>
      </div>
  
    </div>
  );
};

export const getServerSideProps = async () => {
  let block_time;
  try {
    block_time = await prisma.$queryRawUnsafe(`select * from block_time order by ts desc limit 1;`);
  } catch (e) {
    block_time = { data: "Error fetching block_time data" };
  }

  let block_txs;
  try {
    // block_txs = await prisma.block_txs.findFirst({
    //   orderBy: {
    //     ts: "desc",
    //   },
    // });
    block_txs = await prisma.$queryRawUnsafe(`select * from block_txs order by ts desc limit 1;`);
  } catch {
    block_txs = { data: "Error fetching tx data" };
  }

  let blocks;
  try {
    // blocks = await prisma.blocks.findFirst({
    //   orderBy: {
    //     ts: "desc",
    //   },
    // });
    blocks = await prisma.$queryRawUnsafe(`select * from blocks order by ts desc limit 1;`);
  } catch {
    blocks = { data: "Error fetching last block data" };
  }

  let mempool_size;
  try {
    // mempool_size = await prisma.mempool_size.findFirst({
    //   orderBy: {
    //     ts: "desc",
    //   },
    // });
    mempool_size = await prisma.$queryRawUnsafe(`select * from mempool_size order by ts desc limit 1;`);
  } catch (e) {
      console.log("error: "+ e)
    mempool_size = { data: "Error fetching mempool data" };
  }

  // // Disabled 
  // let single_tx_blocks;
  // try {
  //   // single_tx_blocks = await prisma.single_tx_blocks.findFirst({
  //   //   orderBy: {
  //   //     ts: "desc",
  //   //   },
  //   // });
  //   single_tx_blocks = await prisma.$queryRawUnsafe(`select * from single_tx_blocks order by ts desc limit 1;`);
  // } catch {
  //   single_tx_blocks = { data: "Error fetching block tx data" };
  // }

  let tx_fees_daily;
  try {
    tx_fees_daily = await prisma.$queryRawUnsafe(`select * from tx_fees_daily order by ts desc limit 1;`);
  } catch {
    tx_fees_daily = { data: "Error fetching daily fee data" };
  }

  let tx_fees_hourly;
  try {
    tx_fees_hourly = await prisma.$queryRawUnsafe(`select * from tx_fees_hourly order by ts desc limit 1;`);
  } catch {
    tx_fees_hourly = { data: "Error fetching hourly fee data" };
  }

  let contracts;
  try {
    contracts = await prisma.$queryRawUnsafe(`
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
    `);
  } catch {
    contracts = { data: "Error fetching mempool contract data" };
  }
  return {
    props: {
      mempool_size: makeSerializable(mempool_size[0]),
      block_time: makeSerializable(block_time[0]),
      block_txs: makeSerializable(block_txs[0]),
      blocks: makeSerializable(blocks[0]),
      // single_tx_blocks: makeSerializable(single_tx_blocks),  // Disabled
      tx_fees_daily: makeSerializable(tx_fees_daily[0]),
      tx_fees_hourly: makeSerializable(tx_fees_hourly[0]),
      contracts: makeSerializable(contracts),
    },
  };
};

export default Home;
