select date, size from stacks_blockchain_api.mempool_size where date >= now()- INTERVAL '1 HOURS';
