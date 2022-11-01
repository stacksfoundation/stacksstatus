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
  console.log(props.mempool_size);
  console.log(props.block_time);
  console.log(props.block_txs);
  console.log(props.blocks);
  console.log(props.single_tx_blocks);
  console.log(props.tx_fees_daily);
  console.log(props.tx_fees_hourly);
  console.log(props.contracts);

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
                <Tooltip 
                  placement="bottomStart" 
                  hideArrow
                  rounded
                  content="StacksOnChain"
                >
                  <Link href="https://stacksonchain.com">
                    <a target="_blank" rel="noopener noreferrer">
                        <StacksOnChain className={styles.serviceLogo} />
                    </a>
                  </Link>
                </Tooltip>
              </grid>
              
              <grid>
                <Tooltip 
                  placement="bottomStart" 
                  hideArrow
                  rounded
                  content="Stacks.org"
                >
                  <Link href="https://stacks.org">
                    <a target="_blank" rel="noopener noreferrer">
                      <StacksLogo className={styles.serviceLogo} />
                    </a>
                  </Link>
                </Tooltip>
              </grid>

              <grid>
                <Tooltip 
                  placement="bottomStart" 
                  hideArrow
                  rounded
                  content="Stacks Blockchain Repo"
                >
                  <Link href="https://github.com/stacks-network/stacks-blockchain">
                    <a target="_blank" rel="noopener noreferrer">
                      <GithubLogo className={styles.serviceLogo} />
                    </a>
                  </Link>
                </Tooltip>
              </grid>

              <grid>
                <Tooltip 
                  placement="bottomStart" 
                  hideArrow
                  rounded
                  content="Stacks Discord"
                >
                  <Link href="https://discord.gg/HsK3ShU">
                    <a target="_blank" rel="noopener noreferrer">
                      <DiscordLogo className={styles.serviceLogo} />
                    </a>
                  </Link>
                </Tooltip>
              </grid>

              <grid>
                <Tooltip 
                  placement="bottomStart" 
                  hideArrow
                  rounded
                  content="Stacks Twitter"
                >
                  <Link href="https://twitter.com/stacksstatus">
                    <a target="_blank" rel="noopener noreferrer">
                      <TwitterLogo className={styles.serviceLogo} />
                    </a>
                  </Link>
                </Tooltip>
              </grid>
          </div>
        </div>

        {/* ROW 1 - mempool/fees */}
        <div className={styles.indexRow}>
          <div className={styles.metrics}>
            <div className={styles.metricsData}>
              <p className={styles.metricsKey}>Current Mempool Size</p>
              <p className={styles.metricsValue}>{props.mempool_size.data}</p>
            </div>
          </div>
          <div className={styles.metrics}>
            <div className={styles.metricsData}>
              <p className={styles.metricsKey}>Avg Daily Fees</p>
              <p className={styles.metricsValue}>
                {props.tx_fees_daily
                  ? props.tx_fees_daily.data
                  : "Data Unavailable"}
              </p>
            </div>
            <div className={styles.metricsData}>
              <p className={styles.metricsKey}>Avg Hourly Fees</p>
              <p className={styles.metricsValue}>
                {props.tx_fees_hourly
                  ? props.tx_fees_hourly.data
                  : "Data Unavailable"}
              </p>
            </div>
          </div>
        </div>

        {/* ROW 2 - txs*/}
        <div className={styles.indexRow}>
          <div className={styles.metrics}>
            <Link
              href={`https://explorer.stacks.co/block/${props.blocks.block_hash}?chain=mainnet`}
            >
              <a target="_blank" rel="noopener noreferrer">
                <div className={styles.metricsData}>
                  <p className={styles.metricsKey}>Block Transactions</p>
                  <p className={styles.metricsValue}>{props.block_txs.data}</p>
                </div>
              </a>
            </Link>
          </div>
          <div className={styles.metrics}>
            <div className={styles.metricsData}>
              <p className={styles.metricsKey}>Single tx blocks</p>
              <p className={styles.metricsValue}>
                {props.single_tx_blocks.data}
              </p>
            </div>
          </div>
        </div>

        {/* ROW 3 - blocks*/}
        <div className={styles.indexRow}>
          <div className={styles.metrics}>
            <Link
              href={`https://explorer.stacks.co/block/${props.blocks.block_hash}?chain=mainnet`}
            >
              <a target="_blank" rel="noopener noreferrer">
                <div className={styles.metricsData}>
                  <p className={styles.metricsKey}>Block Height</p>
                  <p className={styles.metricsValue}>
                    <span className={styles.metricsValueSmall}>
                      {props.blocks.block_height}
                    </span>
                  </p>
                </div>
              </a>
            </Link>
            <Link
              href={`https://explorer.stacks.co/block/${props.blocks.block_hash}?chain=mainnet`}
            >
              <a target="_blank" rel="noopener noreferrer">
                <div className={styles.metricsData}>
                  <p className={styles.metricsKey}>Block Hash</p>
                  <p className={styles.metricsValue}>
                    <span className={styles.metricsValueSmall}>
                      {props.blocks.block_hash}
                    </span>
                  </p>
                </div>
              </a>
            </Link>
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
            <p className={styles.metricsKey}>ACTIVE CONTRACTS</p>
            <table className={styles.contractTable}>
              <tbody>
              <tr className={styles.contractRow}>
                <th className={styles.contractHeading}>Contract Name</th>
                <th className={styles.contractHeading}>TXs in Mempool</th>
              </tr>
                {props.contracts.map((contract, index) => {
                  return (
                    <tr className={styles.metricsData} key={index}>
                      <td className={(styles.metricsKey, styles.contractCell)}>
                        <Link href={`https://explorer.stacks.co/txid/${contract.contract}?chain=mainnet`}>
                          <a target="_blank" rel="noopener noreferrer">
                            {contract.contract}
                          </a>
                        </Link>
                      </td>
                      <td
                        className={
                          (styles.metricsValueSmall, styles.contractCell)
                        }
                      >
                        {contract.count}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ROW 5 - stacksonchain */}
        {/* <div className={styles.indexRow}>
          <p className={styles.indexStxOnChain}>
            <Link href="https://stacksonchain.com">
              <a target="_blank" rel="noopener noreferrer">
                Data provided by Stacks on Chain
              </a>
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  let block_time;
  try {
    block_time = await prisma.$queryRawUnsafe(`
      select * 
      from block_time 
      order by ts 
      desc 
      limit 1;
    `);
  //   block_time = await prisma.block_time.findFirst({
  //     orderBy: {
  //       ts: "desc",
  //     },
  //   });
  } catch (e) {
    block_time = { data: "Error fetching data" };
  }

  let block_txs;
  try {
    block_txs = await prisma.block_txs.findFirst({
      orderBy: {
        ts: "desc",
      },
    });
  } catch {
    block_txs = { data: "Error fetching data" };
  }

  let blocks;
  try {
    blocks = await prisma.blocks.findFirst({
      orderBy: {
        ts: "desc",
      },
    });
  } catch {
    blocks = { data: "Error fetching data" };
  }

  let mempool_size;
  try {
    mempool_size = await prisma.mempool_size.findFirst({
      orderBy: {
        ts: "desc",
      },
    });
  } catch (e) {
    mempool_size = { data: "Error fetching data" };
  }

  let single_tx_blocks;
  try {
    single_tx_blocks = await prisma.single_tx_blocks.findFirst({
      orderBy: {
        ts: "desc",
      },
    });
  } catch {
    single_tx_blocks = { data: "Error fetching data" };
  }

  let tx_fees_daily;
  try {
    tx_fees_daily = await prisma.tx_fees_daily.findFirst({
      orderBy: {
        ts: "desc",
      },
    });
  } catch {
    tx_fees_daily = { data: "Error fetching data" };
  }

  let tx_fees_hourly;
  try {
    tx_fees_hourly = await prisma.tx_fees_hourly.findFirst({
      orderBy: {
        ts: "desc",
      },
    });
  } catch {
    tx_fees_hourly = { data: "Error fetching data" };
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
    contracts = { data: "Error fetching data" };
  }
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
  };
};

export default Home;
