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
  if (process.env.nodeEnv != 'production') {
    console.log("mempoolSize: " + props.mempoolSize.data);
    console.log("blockTime: " + props.blockTime.data);
    console.log("blockTxs: " + props.blockTxs.data);
    console.log("blockHeight: " + props.blocks.block_height);
    console.log("blockHash: " + props.blocks.block_hash);
    console.log("burnBlockTime: " + props.blocks.burn_block_time);
    // console.log("singleTxBlocks:" + props.singleTxBlocks.data); // disabled
    console.log("txFeesDaily: " + props.txFeesDaily.data)
    console.log("txFeesHourly: " + props.txFeesHourly.data)
    console.log("nodeEnv: " + process.env.nodeEnv)
  }
  
  var txFeesDailyNum = Number(props.txFeesDaily.data);
  var txFeesHourlyNum = Number(props.txFeesHourly.data);

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
              <p className={styles.metricsValue}>{props.mempoolSize.data}<span className={styles.metricsValueDesc}>TXS</span></p>
            </div>
          </div>
          <div className={styles.metrics}>
            <div className={styles.metricsData}>
              <p className={styles.metricsKey}>Avg Daily Fees</p>
              <p className={styles.metricsValue}>
                {txFeesDailyNum ? txFeesDailyNum.toFixed(2) : "Data Unavailable"}
                  <span className={styles.metricsValueDesc}>STX</span>
              </p> 
            </div>
          </div>
          <div className={styles.metrics}>
            <div className={styles.metricsData}>
              <p className={styles.metricsKey}>Avg Hourly Fees</p>
              <p className={styles.metricsValue}>
                {txFeesHourlyNum ? txFeesHourlyNum.toFixed(2) : "Data Unavailable"}
                  <span className={styles.metricsValueDesc}>STX</span>
              </p>                
            </div>
          </div>
          {/* Disabled */}
          {/* <div className={styles.metrics}>
            <div className={styles.metricsData}>
              <p className={styles.metricsKey}>Single tx blocks</p>
              <p className={styles.metricsValue}>
                {props.singleTxBlocks.data}
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
                    {props.blockTxs.data}
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
                  {props.blockTime.data}
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
  let blockTime;
  try {
    blockTime = await prisma.block_time.findFirst({
      orderBy: {
        ts: "desc",
      },
    });
    } catch (e) {
    blockTime = { data: "Error fetching block time data" };
  }

  let blockTxs;
  try {
    blockTxs = await prisma.block_txs.findFirst({
      orderBy: {
        ts: "desc",
      },
    });
  } catch {
    blockTxs = { data: "Error fetching tx data" };
  }

  let blocks;
  try {
    blocks = await prisma.blocks.findFirst({
      orderBy: {
        ts: "desc",
      },
    });
  } catch {
    blocks = { data: "Error fetching last block data" };
  }

  let mempoolSize;
  try {
    mempoolSize = await prisma.mempool_size.findFirst({
      orderBy: {
        ts: "desc",
      },
    });
  } catch (e) {
    mempoolSize = { data: "Error fetching mempool data" };
  }

  // // Disabled 
  // let singleTxBlocks;
  // try {
  //   singleTxBlocks = await prisma.singleTxBlocks.findFirst({
  //     orderBy: {
  //       ts: "desc",
  //     },
  //   });
  // } catch {
  //   singleTxBlocks = { data: "Error fetching block tx data" };
  // }

  let txFeesDaily;
  try {
    txFeesDaily = await prisma.tx_fees_daily.findFirst({
      orderBy: {
        ts: "desc",
      },
    });
  } catch {
    txFeesDaily = { data: "Error fetching daily fee data" };
  }

  let txFeesHourly;
  try {
    txFeesHourly = await prisma.tx_fees_hourly.findFirst({
      orderBy: {
        ts: "desc",
      },
    });
  } catch {
    txFeesHourly = { data: "Error fetching hourly fee data" };
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
      mempoolSize: makeSerializable(mempoolSize),
      blockTime: makeSerializable(blockTime),
      blockTxs: makeSerializable(blockTxs),
      blocks: makeSerializable(blocks),
      // singleTxBlocks: makeSerializable(singleTxBlocks),  // Disabled
      txFeesDaily: makeSerializable(txFeesDaily),
      txFeesHourly: makeSerializable(txFeesHourly),
      contracts: makeSerializable(contracts),
    },
  };
};

export default Home;
