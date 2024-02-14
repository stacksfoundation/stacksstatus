import React from "react"
import styles from "../../styles/Index.module.css"
import Link from "next/link"
import { convertEpoch } from "../../lib/util"

interface ChartsCanvasProps {
  data: any
}

const ChartsCanvas = ({ data }: ChartsCanvasProps) => {
  return (
    <div>
      {/* ROW 1 */}
      <div className={styles.indexRow}>
        <div className={styles.metrics}>
          <div className={styles.metricsData}>
            <p className={styles.metricsKey}>Block Height</p>
            <p className={styles.metricsValue}>
              <Link
                href={`https://explorer.hiro.so/block/${data.blocks.results[0].hash}?chain=mainnet`}
              >
                {data.blocks
                  ? data.blocks.results[0].height
                  : "Data Unavailable"}
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
                  href={`https://explorer.hiro.so/block/${data.blocks.results[0].hash}?chain=mainnet`}
                >
                  {data.blocks
                    ? data.blocks.results[0].hash
                    : "Data Unavailable"}
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
              {data.blocks ? data.mempoolSize : "Data Unavailable"}
              <span className={styles.metricsValueDesc}></span>
            </p>
          </div>
        </div>
        <div className={styles.metrics}>
          <div className={styles.metricsData}>
            <p className={styles.metricsKey}>Avg Fees in last block</p>
            <p className={styles.metricsValue}>
              {data.blocks ? data.avgFee : "Data Unavailable"}
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
                href={`https://explorer.stacks.co/block/${data.blocks.results[0].hash}?chain=mainnet`}
              >
                {data.blockTxs}
              </Link>
            </p>
          </div>
        </div>
        <div className={styles.metrics}>
          <div className={styles.metricsData}>
            <p className={styles.metricsKey}>Block Duration</p>
            <p className={styles.metricsValue}>
              <span className={styles.metricsValue}>
                {data.blockTime}
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
                {data.blocks
                  ? convertEpoch(data.blocks.results[0].burn_block_time)
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
        {data.contracts.map((contract, index) => {
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
  )
}

export default ChartsCanvas
