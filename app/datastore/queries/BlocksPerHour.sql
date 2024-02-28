select date_trunc('hour', to_timestamp(burn_block_time)) AS hour, 
COUNT(*)::int AS blocks 
from blocks  
where canonical  and burn_block_time>= EXTRACT(EPOCH FROM NOW() - INTERVAL '24 HOURS')::INTEGER 
group by 1 order by 1;