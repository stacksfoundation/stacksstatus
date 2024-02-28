select block_height, tx_count
from blocks
where canonical 
and burn_block_time>= EXTRACT(EPOCH FROM NOW() - INTERVAL '24 HOURS')::INTEGER
order by 1;