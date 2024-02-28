SELECT
    burn_block_time,
    LAG(burn_block_time) OVER (ORDER BY burn_block_time) AS previous_burn_block_time,
    burn_block_time - LAG(burn_block_time) OVER (ORDER BY burn_block_time) AS seconds_diff
from blocks
where canonical 
and burn_block_time>= EXTRACT(EPOCH FROM NOW() - INTERVAL '24 HOURS')::INTEGER
order by 1;