select 
	date_trunc('hour', to_timestamp(burn_block_time)) AS hourly_bucket,
  CAST(SUM(tx_count)::float/3600 AS DECIMAL(10,2)) AS txs_per_second
from blocks
where canonical 
and burn_block_time>= EXTRACT(EPOCH FROM NOW() - INTERVAL '24 HOURS')::INTEGER
group by 1 order by 1;