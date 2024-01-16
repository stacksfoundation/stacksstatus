import styles from "../styles/Index.module.css";
import Logo from "../public/images/indexStxLogo.svg";
import GithubLogo from "../public/images/github.svg";
import DiscordLogo from "../public/images/discord.svg";
import TwitterLogo from "../public/images/twitter.svg";
import StacksLogo from "../public/images/stacks.svg";
import Link from "next/link";
import { Tooltip } from "@nextui-org/react";
// import prisma from "../lib/db";
import { makeSerializable, convertEpoch, getData } from "../lib/util";
import React from "react";

const apiRoot = "https://api.hiro.so";
const Home = (props) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`mempool_size: ${props.mempoolSize}`);
    console.log(`block_time: ${props.blockTime}`);
    console.log(`block_txs: ${props.blockTxs}`);
    console.log(`block_height: ${props.blocks.results[0].height}`);
    console.log(`node_env: ${process.env.NODE_ENV}`);
    console.log(`avgFee: ${props.avgFee}`);
  }
  return (
    <div className={styles.indexParent}>
      <Logo className={styles.stxLogo} />
      <div className={styles.indexData}>
        <div className={styles.topRow}>
          <div className={styles.indexLogos}>
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
                <Link href="https://github.com/stacks-network/stacks-core">
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

        {/* ROW 1 */}
        <div className={styles.indexRow}>
          <div className={styles.metrics}>
            <div className={styles.metricsData}>
              <p className={styles.metricsKey}>Block Height</p>
              <p className={styles.metricsValue}>
                <Link
                  href={`https://explorer.hiro.so/block/${props.blocks.results[0].hash}?chain=mainnet`}
                >
                  <a
                    className={styles.metricsValue}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {props.blocks
                      ? props.blocks.results[0].height
                      : "Data Unavailable"}
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
                  <Link
                    href={`https://explorer.hiro.so/block/${props.blocks.results[0].hash}?chain=mainnet`}
                  >
                    <a
                      className={styles.metricsValueSmall}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {props.blocks
                        ? props.blocks.results[0].hash
                        : "Data Unavailable"}
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
              <p className={styles.metricsValue}>
                {props.blocks ? props.mempoolSize : "Data Unavailable"}
                <span className={styles.metricsValueDesc}></span>
              </p>
            </div>
          </div>
          <div className={styles.metrics}>
            <div className={styles.metricsData}>
              <p className={styles.metricsKey}>Avg Fees in last block</p>
              <p className={styles.metricsValue}>
                {props.blocks ? props.avgFee : "Data Unavailable"}
                <span className={styles.metricsValueDesc}>STX</span>
              </p>
            </div>
          </div>
          {/* <div className={styles.metrics}>
            <div className={styles.metricsData}>
              <p className={styles.metricsKey}>Avg Daily Fees</p>
              <p className={styles.metricsValue}>
                {txFeesDailyNum ? txFeesDailyNum.toFixed(2) : 'Data Unavailable'}
                  <span className={styles.metricsValueDesc}>STX</span>
              </p>
            </div>
          </div>
          <div className={styles.metrics}>
            <div className={styles.metricsData}>
              <p className={styles.metricsKey}>Avg Hourly Fees</p>
              <p className={styles.metricsValue}>
                {txFeesHourlyNum ? txFeesHourlyNum.toFixed(2) : 'Data Unavailable'}
                  <span className={styles.metricsValueDesc}>STX</span>
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
                <Link
                  href={`https://explorer.stacks.co/block/${props.blocks.results[0].hash}?chain=mainnet`}
                >
                  <a
                    className={styles.metricsValue}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {props.blockTxs}
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
                  {props.blockTime}
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
                  {props.blocks
                    ? convertEpoch(props.blocks.results[0].burn_block_time)
                    : "Data Unavailable"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* ROW 4 - contract */}
        {/* <div className={styles.indexRow}>
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
                  )
                })}
              </tbody>
            </table>
            </div>
          </div>
        </div> */}

        {/* ROW 5 - add some space at bottom of page */}
        <div className={styles.bottomRow}></div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  let blocks;
  try {
    blocks = await getData(`${apiRoot}/extended/v1/block?limit=2`);
  } catch {
    blocks = "Error fetching last block data";
  }

  let mempool;
  try {
    mempool = await getData(`${apiRoot}/extended/v1/tx/mempool/stats`);
  } catch {
    mempool = "Error fetching last block data";
  }

  let avgFee;
  try {
    console.log(`getAllTransactions height: ${blocks.results[0].height}`);
    const url = `${apiRoot}/extended/v1/tx/block_height/${blocks.results[0].height}`;
    console.log(`getAllTransactions url: ${url}`);
    const limit = 20; // This can be adjusted based on your needs
    let offset = 0;
    let allTransactions = [];

    while (true) {
      const response = await fetch(`${url}?offset=${offset}&limit=${limit}`);
      if (!response.ok) {
        throw new Error(`Failed to retrieve data: ${response.statusText}`);
      }

      const data = await response.json();
      allTransactions = allTransactions.concat(data.results);
      // Check if there are more pages
      if (offset + limit < data.total) {
        offset += limit;
      } else {
        break;
      }
    }
    const totalFees = allTransactions.reduce(
      (sum, transaction) => sum + parseInt(transaction.fee_rate),
      0
    );
    console.log(`totalFees: ${totalFees}`);
    const feeRate = (totalFees / allTransactions.length / 1000000).toFixed(4);
    console.log(`feeRate: ${feeRate}`);
    avgFee = feeRate;
  } catch {
    avgFee = "Error fetching block fee data";
  }

  return {
    props: {
      mempoolSize: makeSerializable(
        mempool.tx_type_counts.token_transfer +
          mempool.tx_type_counts.smart_contract +
          mempool.tx_type_counts.contract_call +
          mempool.tx_type_counts.poison_microblock
      ),
      blockTime: makeSerializable(
        (blocks.results[0].burn_block_time -
          blocks.results[1].burn_block_time) /
          60
      ).toFixed(2),
      blockTxs: makeSerializable(blocks.results[0].txs.length),
      blocks: makeSerializable(blocks),
      avgFee: makeSerializable(avgFee),
    },
  };
};

export default Home;
