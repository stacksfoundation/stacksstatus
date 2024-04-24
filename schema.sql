--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.6 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: stacks_blockchain_api; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA stacks_blockchain_api;


ALTER SCHEMA stacks_blockchain_api OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: blocks; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.blocks (
    index_block_hash bytea NOT NULL,
    block_hash bytea NOT NULL,
    block_height integer NOT NULL,
    burn_block_time integer NOT NULL,
    burn_block_hash bytea NOT NULL,
    burn_block_height integer NOT NULL,
    miner_txid bytea NOT NULL,
    parent_index_block_hash bytea NOT NULL,
    parent_block_hash bytea NOT NULL,
    parent_microblock_hash bytea NOT NULL,
    parent_microblock_sequence integer NOT NULL,
    canonical boolean NOT NULL,
    execution_cost_read_count bigint NOT NULL,
    execution_cost_read_length bigint NOT NULL,
    execution_cost_runtime bigint NOT NULL,
    execution_cost_write_count bigint NOT NULL,
    execution_cost_write_length bigint NOT NULL,
    tx_count integer DEFAULT 1 NOT NULL
);


ALTER TABLE stacks_blockchain_api.blocks OWNER TO stacks;

--
-- Name: burnchain_rewards; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.burnchain_rewards (
    id integer NOT NULL,
    canonical boolean NOT NULL,
    burn_block_hash bytea NOT NULL,
    burn_block_height integer NOT NULL,
    burn_amount numeric NOT NULL,
    reward_recipient text NOT NULL,
    reward_amount numeric NOT NULL,
    reward_index integer NOT NULL
);


ALTER TABLE stacks_blockchain_api.burnchain_rewards OWNER TO stacks;

--
-- Name: burnchain_rewards_id_seq; Type: SEQUENCE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE SEQUENCE stacks_blockchain_api.burnchain_rewards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stacks_blockchain_api.burnchain_rewards_id_seq OWNER TO stacks;

--
-- Name: burnchain_rewards_id_seq; Type: SEQUENCE OWNED BY; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER SEQUENCE stacks_blockchain_api.burnchain_rewards_id_seq OWNED BY stacks_blockchain_api.burnchain_rewards.id;


--
-- Name: chain_tip; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.chain_tip (
    id boolean DEFAULT true NOT NULL,
    block_height integer NOT NULL,
    block_count integer NOT NULL,
    block_hash bytea NOT NULL,
    index_block_hash bytea NOT NULL,
    burn_block_height integer NOT NULL,
    microblock_hash bytea,
    microblock_sequence integer,
    microblock_count integer NOT NULL,
    tx_count integer NOT NULL,
    tx_count_unanchored integer NOT NULL,
    mempool_tx_count integer DEFAULT 0 NOT NULL,
    mempool_updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT chain_tip_one_row CHECK (id)
);


ALTER TABLE stacks_blockchain_api.chain_tip OWNER TO stacks;

--
-- Name: config_state; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.config_state (
    id boolean DEFAULT true NOT NULL,
    bns_names_onchain_imported boolean DEFAULT false NOT NULL,
    bns_subdomains_imported boolean DEFAULT false NOT NULL,
    token_offering_imported boolean DEFAULT false NOT NULL,
    CONSTRAINT config_state_one_row CHECK (id)
);


ALTER TABLE stacks_blockchain_api.config_state OWNER TO stacks;

--
-- Name: contract_logs; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.contract_logs (
    id integer NOT NULL,
    event_index integer NOT NULL,
    tx_id bytea NOT NULL,
    tx_index smallint NOT NULL,
    block_height integer NOT NULL,
    index_block_hash bytea NOT NULL,
    parent_index_block_hash bytea NOT NULL,
    microblock_hash bytea NOT NULL,
    microblock_sequence integer NOT NULL,
    microblock_canonical boolean NOT NULL,
    canonical boolean NOT NULL,
    contract_identifier text NOT NULL,
    topic text NOT NULL,
    value bytea NOT NULL
);


ALTER TABLE stacks_blockchain_api.contract_logs OWNER TO stacks;

--
-- Name: contract_logs_id_seq; Type: SEQUENCE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE SEQUENCE stacks_blockchain_api.contract_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stacks_blockchain_api.contract_logs_id_seq OWNER TO stacks;

--
-- Name: contract_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER SEQUENCE stacks_blockchain_api.contract_logs_id_seq OWNED BY stacks_blockchain_api.contract_logs.id;


--
-- Name: event_observer_requests; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.event_observer_requests (
    id bigint NOT NULL,
    receive_timestamp timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL,
    event_path text NOT NULL,
    payload jsonb NOT NULL
);


ALTER TABLE stacks_blockchain_api.event_observer_requests OWNER TO stacks;

--
-- Name: event_observer_requests_id_seq; Type: SEQUENCE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE SEQUENCE stacks_blockchain_api.event_observer_requests_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stacks_blockchain_api.event_observer_requests_id_seq OWNER TO stacks;

--
-- Name: event_observer_requests_id_seq; Type: SEQUENCE OWNED BY; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER SEQUENCE stacks_blockchain_api.event_observer_requests_id_seq OWNED BY stacks_blockchain_api.event_observer_requests.id;


--
-- Name: faucet_requests; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.faucet_requests (
    id integer NOT NULL,
    currency text NOT NULL,
    address text NOT NULL,
    ip text NOT NULL,
    occurred_at bigint NOT NULL
);


ALTER TABLE stacks_blockchain_api.faucet_requests OWNER TO stacks;

--
-- Name: faucet_requests_id_seq; Type: SEQUENCE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE SEQUENCE stacks_blockchain_api.faucet_requests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stacks_blockchain_api.faucet_requests_id_seq OWNER TO stacks;

--
-- Name: faucet_requests_id_seq; Type: SEQUENCE OWNED BY; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER SEQUENCE stacks_blockchain_api.faucet_requests_id_seq OWNED BY stacks_blockchain_api.faucet_requests.id;


--
-- Name: ft_events; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.ft_events (
    id integer NOT NULL,
    event_index integer NOT NULL,
    tx_id bytea NOT NULL,
    tx_index smallint NOT NULL,
    block_height integer NOT NULL,
    index_block_hash bytea NOT NULL,
    parent_index_block_hash bytea NOT NULL,
    microblock_hash bytea NOT NULL,
    microblock_sequence integer NOT NULL,
    microblock_canonical boolean NOT NULL,
    canonical boolean NOT NULL,
    asset_event_type_id smallint NOT NULL,
    asset_identifier text NOT NULL,
    amount numeric NOT NULL,
    sender text,
    recipient text,
    CONSTRAINT valid_asset_burn CHECK (((asset_event_type_id <> 3) OR ((recipient IS NULL) AND (sender IS NOT NULL)))),
    CONSTRAINT valid_asset_mint CHECK (((asset_event_type_id <> 2) OR ((sender IS NULL) AND (recipient IS NOT NULL)))),
    CONSTRAINT valid_asset_transfer CHECK (((asset_event_type_id <> 1) OR (NOT (ROW(sender, recipient) IS NULL))))
);


ALTER TABLE stacks_blockchain_api.ft_events OWNER TO stacks;

--
-- Name: ft_events_id_seq; Type: SEQUENCE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE SEQUENCE stacks_blockchain_api.ft_events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stacks_blockchain_api.ft_events_id_seq OWNER TO stacks;

--
-- Name: ft_events_id_seq; Type: SEQUENCE OWNED BY; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER SEQUENCE stacks_blockchain_api.ft_events_id_seq OWNED BY stacks_blockchain_api.ft_events.id;


--
-- Name: mempool_txs; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.mempool_txs (
    id integer NOT NULL,
    pruned boolean NOT NULL,
    tx_id bytea NOT NULL,
    type_id smallint NOT NULL,
    anchor_mode smallint NOT NULL,
    status smallint NOT NULL,
    post_conditions bytea NOT NULL,
    nonce integer NOT NULL,
    fee_rate bigint NOT NULL,
    sponsored boolean NOT NULL,
    sponsor_address text,
    sponsor_nonce integer,
    sender_address text NOT NULL,
    origin_hash_mode smallint NOT NULL,
    raw_tx bytea NOT NULL,
    receipt_time integer NOT NULL,
    receipt_block_height integer NOT NULL,
    token_transfer_recipient_address text,
    token_transfer_amount bigint,
    token_transfer_memo bytea,
    smart_contract_clarity_version smallint,
    smart_contract_contract_id text,
    smart_contract_source_code text,
    contract_call_contract_id text,
    contract_call_function_name text,
    contract_call_function_args bytea,
    poison_microblock_header_1 bytea,
    poison_microblock_header_2 bytea,
    coinbase_payload bytea,
    coinbase_alt_recipient text,
    tx_size integer GENERATED ALWAYS AS (length(raw_tx)) STORED NOT NULL,
    coinbase_vrf_proof bytea,
    tenure_change_tenure_consensus_hash bytea,
    tenure_change_prev_tenure_consensus_hash bytea,
    tenure_change_burn_view_consensus_hash bytea,
    tenure_change_previous_tenure_end bytea,
    tenure_change_previous_tenure_blocks integer,
    tenure_change_cause smallint,
    tenure_change_pubkey_hash bytea,
    tenure_change_signature bytea,
    tenure_change_signers bytea,
    CONSTRAINT valid_coinbase CHECK (((type_id <> 4) OR (NOT (coinbase_payload IS NULL)))),
    CONSTRAINT "valid_coinbase-pay-to-alt" CHECK (((type_id <> 5) OR (NOT (ROW(coinbase_payload, coinbase_alt_recipient) IS NULL)))),
    CONSTRAINT valid_contract_call CHECK (((type_id <> 2) OR (NOT (ROW(contract_call_contract_id, contract_call_function_name, contract_call_function_args) IS NULL)))),
    CONSTRAINT "valid_nakamoto-coinbase" CHECK (((type_id <> 8) OR (NOT (ROW(coinbase_payload, coinbase_vrf_proof) IS NULL)))),
    CONSTRAINT valid_poison_microblock CHECK (((type_id <> 3) OR (NOT (ROW(poison_microblock_header_1, poison_microblock_header_2) IS NULL)))),
    CONSTRAINT valid_smart_contract CHECK (((type_id <> 1) OR (NOT (ROW(smart_contract_contract_id, smart_contract_source_code) IS NULL)))),
    CONSTRAINT "valid_tenure-change" CHECK (((type_id <> 7) OR (NOT (ROW(tenure_change_tenure_consensus_hash, tenure_change_prev_tenure_consensus_hash, tenure_change_burn_view_consensus_hash, tenure_change_previous_tenure_end, tenure_change_previous_tenure_blocks, tenure_change_cause, tenure_change_pubkey_hash, tenure_change_signature, tenure_change_signers) IS NULL)))),
    CONSTRAINT valid_token_transfer CHECK (((type_id <> 0) OR (NOT (ROW(token_transfer_recipient_address, token_transfer_amount, token_transfer_memo) IS NULL)))),
    CONSTRAINT valid_versioned_smart_contract CHECK (((type_id <> 6) OR (NOT (ROW(smart_contract_clarity_version, smart_contract_contract_id, smart_contract_source_code) IS NULL))))
);


ALTER TABLE stacks_blockchain_api.mempool_txs OWNER TO stacks;

--
-- Name: mempool_digest; Type: MATERIALIZED VIEW; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE MATERIALIZED VIEW stacks_blockchain_api.mempool_digest AS
 SELECT COALESCE(to_hex(bit_xor(m.tx_short_id)), '0'::text) AS digest
   FROM ( SELECT ((('x'::text || encode(mempool_txs.tx_id, 'hex'::text)))::bit(64))::bigint AS tx_short_id
           FROM stacks_blockchain_api.mempool_txs
          WHERE (mempool_txs.pruned = false)) m
  WITH NO DATA;


ALTER TABLE stacks_blockchain_api.mempool_digest OWNER TO stacks;

--
-- Name: mempool_txs_id_seq; Type: SEQUENCE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE SEQUENCE stacks_blockchain_api.mempool_txs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stacks_blockchain_api.mempool_txs_id_seq OWNER TO stacks;

--
-- Name: mempool_txs_id_seq; Type: SEQUENCE OWNED BY; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER SEQUENCE stacks_blockchain_api.mempool_txs_id_seq OWNED BY stacks_blockchain_api.mempool_txs.id;


--
-- Name: microblocks; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.microblocks (
    id bigint NOT NULL,
    receive_timestamp timestamp without time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL,
    canonical boolean NOT NULL,
    microblock_canonical boolean NOT NULL,
    microblock_hash bytea NOT NULL,
    microblock_sequence integer NOT NULL,
    microblock_parent_hash bytea NOT NULL,
    index_block_hash bytea NOT NULL,
    parent_index_block_hash bytea NOT NULL,
    block_height integer NOT NULL,
    parent_block_height integer NOT NULL,
    parent_block_hash bytea NOT NULL,
    parent_burn_block_height integer NOT NULL,
    parent_burn_block_time integer NOT NULL,
    parent_burn_block_hash bytea NOT NULL,
    block_hash bytea NOT NULL
);


ALTER TABLE stacks_blockchain_api.microblocks OWNER TO stacks;

--
-- Name: microblocks_id_seq; Type: SEQUENCE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE SEQUENCE stacks_blockchain_api.microblocks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stacks_blockchain_api.microblocks_id_seq OWNER TO stacks;

--
-- Name: microblocks_id_seq; Type: SEQUENCE OWNED BY; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER SEQUENCE stacks_blockchain_api.microblocks_id_seq OWNED BY stacks_blockchain_api.microblocks.id;


--
-- Name: miner_rewards; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.miner_rewards (
    id integer NOT NULL,
    block_hash bytea NOT NULL,
    index_block_hash bytea NOT NULL,
    from_index_block_hash bytea NOT NULL,
    mature_block_height integer NOT NULL,
    canonical boolean NOT NULL,
    recipient text NOT NULL,
    miner_address text,
    coinbase_amount numeric NOT NULL,
    tx_fees_anchored numeric NOT NULL,
    tx_fees_streamed_confirmed numeric NOT NULL,
    tx_fees_streamed_produced numeric NOT NULL
);


ALTER TABLE stacks_blockchain_api.miner_rewards OWNER TO stacks;

--
-- Name: miner_rewards_id_seq; Type: SEQUENCE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE SEQUENCE stacks_blockchain_api.miner_rewards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stacks_blockchain_api.miner_rewards_id_seq OWNER TO stacks;

--
-- Name: miner_rewards_id_seq; Type: SEQUENCE OWNED BY; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER SEQUENCE stacks_blockchain_api.miner_rewards_id_seq OWNED BY stacks_blockchain_api.miner_rewards.id;


--
-- Name: names; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.names (
    id integer NOT NULL,
    name text NOT NULL,
    address text NOT NULL,
    registered_at integer NOT NULL,
    expire_block integer NOT NULL,
    zonefile_hash text NOT NULL,
    namespace_id text NOT NULL,
    grace_period text,
    renewal_deadline integer,
    resolver text,
    tx_id bytea,
    tx_index smallint NOT NULL,
    event_index integer,
    status text,
    canonical boolean DEFAULT true NOT NULL,
    index_block_hash bytea,
    parent_index_block_hash bytea NOT NULL,
    microblock_hash bytea NOT NULL,
    microblock_sequence integer NOT NULL,
    microblock_canonical boolean NOT NULL
);


ALTER TABLE stacks_blockchain_api.names OWNER TO stacks;

--
-- Name: names_id_seq; Type: SEQUENCE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE SEQUENCE stacks_blockchain_api.names_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stacks_blockchain_api.names_id_seq OWNER TO stacks;

--
-- Name: names_id_seq; Type: SEQUENCE OWNED BY; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER SEQUENCE stacks_blockchain_api.names_id_seq OWNED BY stacks_blockchain_api.names.id;


--
-- Name: namespaces; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.namespaces (
    id integer NOT NULL,
    namespace_id text NOT NULL,
    launched_at integer,
    address text NOT NULL,
    reveal_block integer NOT NULL,
    ready_block integer NOT NULL,
    buckets text NOT NULL,
    base numeric NOT NULL,
    coeff numeric NOT NULL,
    nonalpha_discount numeric NOT NULL,
    no_vowel_discount numeric NOT NULL,
    lifetime integer NOT NULL,
    status text,
    tx_id bytea,
    tx_index smallint NOT NULL,
    canonical boolean DEFAULT true NOT NULL,
    index_block_hash bytea,
    parent_index_block_hash bytea NOT NULL,
    microblock_hash bytea NOT NULL,
    microblock_sequence integer NOT NULL,
    microblock_canonical boolean NOT NULL
);


ALTER TABLE stacks_blockchain_api.namespaces OWNER TO stacks;

--
-- Name: namespaces_id_seq; Type: SEQUENCE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE SEQUENCE stacks_blockchain_api.namespaces_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stacks_blockchain_api.namespaces_id_seq OWNER TO stacks;

--
-- Name: namespaces_id_seq; Type: SEQUENCE OWNED BY; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER SEQUENCE stacks_blockchain_api.namespaces_id_seq OWNED BY stacks_blockchain_api.namespaces.id;


--
-- Name: nft_custody; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.nft_custody (
    asset_identifier text NOT NULL,
    value bytea NOT NULL,
    recipient text,
    block_height integer NOT NULL,
    index_block_hash bytea NOT NULL,
    parent_index_block_hash bytea NOT NULL,
    microblock_hash bytea NOT NULL,
    microblock_sequence integer NOT NULL,
    tx_id bytea NOT NULL,
    tx_index smallint NOT NULL,
    event_index integer NOT NULL
);


ALTER TABLE stacks_blockchain_api.nft_custody OWNER TO stacks;

--
-- Name: nft_custody_unanchored; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.nft_custody_unanchored (
    asset_identifier text NOT NULL,
    value bytea NOT NULL,
    recipient text,
    block_height integer NOT NULL,
    index_block_hash bytea NOT NULL,
    parent_index_block_hash bytea NOT NULL,
    microblock_hash bytea NOT NULL,
    microblock_sequence integer NOT NULL,
    tx_id bytea NOT NULL,
    tx_index smallint NOT NULL,
    event_index integer NOT NULL
);


ALTER TABLE stacks_blockchain_api.nft_custody_unanchored OWNER TO stacks;

--
-- Name: nft_events; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.nft_events (
    id integer NOT NULL,
    event_index integer NOT NULL,
    tx_id bytea NOT NULL,
    tx_index smallint NOT NULL,
    block_height integer NOT NULL,
    index_block_hash bytea NOT NULL,
    parent_index_block_hash bytea NOT NULL,
    microblock_hash bytea NOT NULL,
    microblock_sequence integer NOT NULL,
    microblock_canonical boolean NOT NULL,
    canonical boolean NOT NULL,
    asset_event_type_id smallint NOT NULL,
    asset_identifier text NOT NULL,
    value bytea NOT NULL,
    sender text,
    recipient text,
    CONSTRAINT valid_asset_burn CHECK (((asset_event_type_id <> 3) OR ((recipient IS NULL) AND (sender IS NOT NULL)))),
    CONSTRAINT valid_asset_mint CHECK (((asset_event_type_id <> 2) OR ((sender IS NULL) AND (recipient IS NOT NULL)))),
    CONSTRAINT valid_asset_transfer CHECK (((asset_event_type_id <> 1) OR (NOT (ROW(sender, recipient) IS NULL))))
);


ALTER TABLE stacks_blockchain_api.nft_events OWNER TO stacks;

--
-- Name: nft_events_id_seq; Type: SEQUENCE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE SEQUENCE stacks_blockchain_api.nft_events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stacks_blockchain_api.nft_events_id_seq OWNER TO stacks;

--
-- Name: nft_events_id_seq; Type: SEQUENCE OWNED BY; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER SEQUENCE stacks_blockchain_api.nft_events_id_seq OWNED BY stacks_blockchain_api.nft_events.id;


--
-- Name: pgmigrations; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.pgmigrations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    run_on timestamp without time zone NOT NULL
);


ALTER TABLE stacks_blockchain_api.pgmigrations OWNER TO stacks;

--
-- Name: pgmigrations_id_seq; Type: SEQUENCE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE SEQUENCE stacks_blockchain_api.pgmigrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stacks_blockchain_api.pgmigrations_id_seq OWNER TO stacks;

--
-- Name: pgmigrations_id_seq; Type: SEQUENCE OWNED BY; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER SEQUENCE stacks_blockchain_api.pgmigrations_id_seq OWNED BY stacks_blockchain_api.pgmigrations.id;


--
-- Name: pox2_events; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.pox2_events (
    id bigint NOT NULL,
    event_index integer NOT NULL,
    tx_id bytea NOT NULL,
    tx_index smallint NOT NULL,
    block_height integer NOT NULL,
    index_block_hash bytea NOT NULL,
    parent_index_block_hash bytea NOT NULL,
    microblock_hash bytea NOT NULL,
    microblock_sequence integer NOT NULL,
    microblock_canonical boolean NOT NULL,
    canonical boolean NOT NULL,
    stacker text NOT NULL,
    locked numeric NOT NULL,
    balance numeric NOT NULL,
    burnchain_unlock_height bigint NOT NULL,
    name text NOT NULL,
    pox_addr text,
    pox_addr_raw bytea,
    first_cycle_locked numeric,
    first_unlocked_cycle numeric,
    delegate_to text,
    lock_period numeric,
    lock_amount numeric,
    start_burn_height numeric,
    unlock_burn_height numeric,
    delegator text,
    increase_by numeric,
    total_locked numeric,
    extend_count numeric,
    reward_cycle numeric,
    amount_ustx numeric,
    CONSTRAINT valid_event_specific_columns CHECK (
CASE name
    WHEN 'handle-unlock'::text THEN ((first_cycle_locked IS NOT NULL) AND (first_unlocked_cycle IS NOT NULL))
    WHEN 'stack-stx'::text THEN ((lock_period IS NOT NULL) AND (lock_amount IS NOT NULL) AND (start_burn_height IS NOT NULL) AND (unlock_burn_height IS NOT NULL))
    WHEN 'stack-increase'::text THEN ((increase_by IS NOT NULL) AND (total_locked IS NOT NULL))
    WHEN 'stack-extend'::text THEN ((extend_count IS NOT NULL) AND (unlock_burn_height IS NOT NULL))
    WHEN 'delegate-stx'::text THEN ((amount_ustx IS NOT NULL) AND (delegate_to IS NOT NULL))
    WHEN 'delegate-stack-stx'::text THEN ((lock_period IS NOT NULL) AND (lock_amount IS NOT NULL) AND (start_burn_height IS NOT NULL) AND (unlock_burn_height IS NOT NULL) AND (delegator IS NOT NULL))
    WHEN 'delegate-stack-increase'::text THEN ((increase_by IS NOT NULL) AND (total_locked IS NOT NULL) AND (delegator IS NOT NULL))
    WHEN 'delegate-stack-extend'::text THEN ((extend_count IS NOT NULL) AND (unlock_burn_height IS NOT NULL) AND (delegator IS NOT NULL))
    WHEN 'stack-aggregation-commit'::text THEN ((reward_cycle IS NOT NULL) AND (amount_ustx IS NOT NULL))
    WHEN 'stack-aggregation-commit-indexed'::text THEN ((reward_cycle IS NOT NULL) AND (amount_ustx IS NOT NULL))
    WHEN 'stack-aggregation-increase'::text THEN ((reward_cycle IS NOT NULL) AND (amount_ustx IS NOT NULL))
    ELSE false
END)
);


ALTER TABLE stacks_blockchain_api.pox2_events OWNER TO stacks;

--
-- Name: pox2_events_id_seq; Type: SEQUENCE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE SEQUENCE stacks_blockchain_api.pox2_events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stacks_blockchain_api.pox2_events_id_seq OWNER TO stacks;

--
-- Name: pox2_events_id_seq; Type: SEQUENCE OWNED BY; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER SEQUENCE stacks_blockchain_api.pox2_events_id_seq OWNED BY stacks_blockchain_api.pox2_events.id;


--
-- Name: pox3_events; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.pox3_events (
    id bigint NOT NULL,
    event_index integer NOT NULL,
    tx_id bytea NOT NULL,
    tx_index smallint NOT NULL,
    block_height integer NOT NULL,
    index_block_hash bytea NOT NULL,
    parent_index_block_hash bytea NOT NULL,
    microblock_hash bytea NOT NULL,
    microblock_sequence integer NOT NULL,
    microblock_canonical boolean NOT NULL,
    canonical boolean NOT NULL,
    stacker text NOT NULL,
    locked numeric NOT NULL,
    balance numeric NOT NULL,
    burnchain_unlock_height bigint NOT NULL,
    name text NOT NULL,
    pox_addr text,
    pox_addr_raw bytea,
    first_cycle_locked numeric,
    first_unlocked_cycle numeric,
    delegate_to text,
    lock_period numeric,
    lock_amount numeric,
    start_burn_height numeric,
    unlock_burn_height numeric,
    delegator text,
    increase_by numeric,
    total_locked numeric,
    extend_count numeric,
    reward_cycle numeric,
    amount_ustx numeric,
    CONSTRAINT valid_event_specific_columns CHECK (
CASE name
    WHEN 'handle-unlock'::text THEN ((first_cycle_locked IS NOT NULL) AND (first_unlocked_cycle IS NOT NULL))
    WHEN 'stack-stx'::text THEN ((lock_period IS NOT NULL) AND (lock_amount IS NOT NULL) AND (start_burn_height IS NOT NULL) AND (unlock_burn_height IS NOT NULL))
    WHEN 'stack-increase'::text THEN ((increase_by IS NOT NULL) AND (total_locked IS NOT NULL))
    WHEN 'stack-extend'::text THEN ((extend_count IS NOT NULL) AND (unlock_burn_height IS NOT NULL))
    WHEN 'delegate-stx'::text THEN ((amount_ustx IS NOT NULL) AND (delegate_to IS NOT NULL))
    WHEN 'delegate-stack-stx'::text THEN ((lock_period IS NOT NULL) AND (lock_amount IS NOT NULL) AND (start_burn_height IS NOT NULL) AND (unlock_burn_height IS NOT NULL) AND (delegator IS NOT NULL))
    WHEN 'delegate-stack-increase'::text THEN ((increase_by IS NOT NULL) AND (total_locked IS NOT NULL) AND (delegator IS NOT NULL))
    WHEN 'delegate-stack-extend'::text THEN ((extend_count IS NOT NULL) AND (unlock_burn_height IS NOT NULL) AND (delegator IS NOT NULL))
    WHEN 'stack-aggregation-commit'::text THEN ((reward_cycle IS NOT NULL) AND (amount_ustx IS NOT NULL))
    WHEN 'stack-aggregation-commit-indexed'::text THEN ((reward_cycle IS NOT NULL) AND (amount_ustx IS NOT NULL))
    WHEN 'stack-aggregation-increase'::text THEN ((reward_cycle IS NOT NULL) AND (amount_ustx IS NOT NULL))
    ELSE false
END)
);


ALTER TABLE stacks_blockchain_api.pox3_events OWNER TO stacks;

--
-- Name: pox3_events_id_seq; Type: SEQUENCE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE SEQUENCE stacks_blockchain_api.pox3_events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stacks_blockchain_api.pox3_events_id_seq OWNER TO stacks;

--
-- Name: pox3_events_id_seq; Type: SEQUENCE OWNED BY; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER SEQUENCE stacks_blockchain_api.pox3_events_id_seq OWNED BY stacks_blockchain_api.pox3_events.id;


--
-- Name: pox4_events; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.pox4_events (
    id bigint NOT NULL,
    event_index integer NOT NULL,
    tx_id bytea NOT NULL,
    tx_index smallint NOT NULL,
    block_height integer NOT NULL,
    index_block_hash bytea NOT NULL,
    parent_index_block_hash bytea NOT NULL,
    microblock_hash bytea NOT NULL,
    microblock_sequence integer NOT NULL,
    microblock_canonical boolean NOT NULL,
    canonical boolean NOT NULL,
    stacker text NOT NULL,
    locked numeric NOT NULL,
    balance numeric NOT NULL,
    burnchain_unlock_height bigint NOT NULL,
    name text NOT NULL,
    pox_addr text,
    pox_addr_raw bytea,
    first_cycle_locked numeric,
    first_unlocked_cycle numeric,
    delegate_to text,
    lock_period numeric,
    lock_amount numeric,
    start_burn_height numeric,
    unlock_burn_height numeric,
    delegator text,
    increase_by numeric,
    total_locked numeric,
    extend_count numeric,
    reward_cycle numeric,
    amount_ustx numeric,
    CONSTRAINT valid_event_specific_columns CHECK (
CASE name
    WHEN 'handle-unlock'::text THEN ((first_cycle_locked IS NOT NULL) AND (first_unlocked_cycle IS NOT NULL))
    WHEN 'stack-stx'::text THEN ((lock_period IS NOT NULL) AND (lock_amount IS NOT NULL) AND (start_burn_height IS NOT NULL) AND (unlock_burn_height IS NOT NULL))
    WHEN 'stack-increase'::text THEN ((increase_by IS NOT NULL) AND (total_locked IS NOT NULL))
    WHEN 'stack-extend'::text THEN ((extend_count IS NOT NULL) AND (unlock_burn_height IS NOT NULL))
    WHEN 'delegate-stx'::text THEN ((amount_ustx IS NOT NULL) AND (delegate_to IS NOT NULL))
    WHEN 'delegate-stack-stx'::text THEN ((lock_period IS NOT NULL) AND (lock_amount IS NOT NULL) AND (start_burn_height IS NOT NULL) AND (unlock_burn_height IS NOT NULL) AND (delegator IS NOT NULL))
    WHEN 'delegate-stack-increase'::text THEN ((increase_by IS NOT NULL) AND (total_locked IS NOT NULL) AND (delegator IS NOT NULL))
    WHEN 'delegate-stack-extend'::text THEN ((extend_count IS NOT NULL) AND (unlock_burn_height IS NOT NULL) AND (delegator IS NOT NULL))
    WHEN 'stack-aggregation-commit'::text THEN ((reward_cycle IS NOT NULL) AND (amount_ustx IS NOT NULL))
    WHEN 'stack-aggregation-commit-indexed'::text THEN ((reward_cycle IS NOT NULL) AND (amount_ustx IS NOT NULL))
    WHEN 'stack-aggregation-increase'::text THEN ((reward_cycle IS NOT NULL) AND (amount_ustx IS NOT NULL))
    ELSE false
END)
);


ALTER TABLE stacks_blockchain_api.pox4_events OWNER TO stacks;

--
-- Name: pox4_events_id_seq; Type: SEQUENCE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE SEQUENCE stacks_blockchain_api.pox4_events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stacks_blockchain_api.pox4_events_id_seq OWNER TO stacks;

--
-- Name: pox4_events_id_seq; Type: SEQUENCE OWNED BY; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER SEQUENCE stacks_blockchain_api.pox4_events_id_seq OWNED BY stacks_blockchain_api.pox4_events.id;


--
-- Name: pox_state; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.pox_state (
    id boolean DEFAULT true NOT NULL,
    pox_v1_unlock_height bigint DEFAULT 0 NOT NULL,
    pox_v2_unlock_height bigint DEFAULT 0 NOT NULL,
    pox_v3_unlock_height bigint DEFAULT 0 NOT NULL,
    CONSTRAINT only_one_row CHECK (id)
);


ALTER TABLE stacks_blockchain_api.pox_state OWNER TO stacks;

--
-- Name: principal_stx_txs; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.principal_stx_txs (
    id integer NOT NULL,
    principal text NOT NULL,
    tx_id bytea NOT NULL,
    block_height integer NOT NULL,
    index_block_hash bytea NOT NULL,
    microblock_hash bytea NOT NULL,
    microblock_sequence integer NOT NULL,
    tx_index smallint NOT NULL,
    canonical boolean NOT NULL,
    microblock_canonical boolean NOT NULL
);


ALTER TABLE stacks_blockchain_api.principal_stx_txs OWNER TO stacks;

--
-- Name: principal_stx_txs_id_seq; Type: SEQUENCE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE SEQUENCE stacks_blockchain_api.principal_stx_txs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stacks_blockchain_api.principal_stx_txs_id_seq OWNER TO stacks;

--
-- Name: principal_stx_txs_id_seq; Type: SEQUENCE OWNED BY; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER SEQUENCE stacks_blockchain_api.principal_stx_txs_id_seq OWNED BY stacks_blockchain_api.principal_stx_txs.id;


--
-- Name: reward_slot_holders; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.reward_slot_holders (
    id integer NOT NULL,
    canonical boolean NOT NULL,
    burn_block_hash bytea NOT NULL,
    burn_block_height integer NOT NULL,
    address text NOT NULL,
    slot_index integer NOT NULL
);


ALTER TABLE stacks_blockchain_api.reward_slot_holders OWNER TO stacks;

--
-- Name: reward_slot_holders_id_seq; Type: SEQUENCE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE SEQUENCE stacks_blockchain_api.reward_slot_holders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stacks_blockchain_api.reward_slot_holders_id_seq OWNER TO stacks;

--
-- Name: reward_slot_holders_id_seq; Type: SEQUENCE OWNED BY; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER SEQUENCE stacks_blockchain_api.reward_slot_holders_id_seq OWNED BY stacks_blockchain_api.reward_slot_holders.id;


--
-- Name: smart_contracts; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.smart_contracts (
    id integer NOT NULL,
    tx_id bytea NOT NULL,
    canonical boolean NOT NULL,
    contract_id text NOT NULL,
    block_height integer NOT NULL,
    index_block_hash bytea NOT NULL,
    parent_index_block_hash bytea NOT NULL,
    microblock_hash bytea NOT NULL,
    microblock_sequence integer NOT NULL,
    microblock_canonical boolean NOT NULL,
    clarity_version smallint,
    source_code text NOT NULL,
    abi jsonb NOT NULL
);


ALTER TABLE stacks_blockchain_api.smart_contracts OWNER TO stacks;

--
-- Name: smart_contracts_id_seq; Type: SEQUENCE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE SEQUENCE stacks_blockchain_api.smart_contracts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stacks_blockchain_api.smart_contracts_id_seq OWNER TO stacks;

--
-- Name: smart_contracts_id_seq; Type: SEQUENCE OWNED BY; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER SEQUENCE stacks_blockchain_api.smart_contracts_id_seq OWNED BY stacks_blockchain_api.smart_contracts.id;


--
-- Name: stx_events; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.stx_events (
    id integer NOT NULL,
    event_index integer NOT NULL,
    tx_id bytea NOT NULL,
    tx_index smallint NOT NULL,
    block_height integer NOT NULL,
    index_block_hash bytea NOT NULL,
    parent_index_block_hash bytea NOT NULL,
    microblock_hash bytea NOT NULL,
    microblock_sequence integer NOT NULL,
    microblock_canonical boolean NOT NULL,
    canonical boolean NOT NULL,
    asset_event_type_id smallint NOT NULL,
    amount bigint NOT NULL,
    sender text,
    recipient text,
    memo bytea,
    CONSTRAINT valid_asset_burn CHECK (((asset_event_type_id <> 3) OR ((recipient IS NULL) AND (sender IS NOT NULL)))),
    CONSTRAINT valid_asset_mint CHECK (((asset_event_type_id <> 2) OR ((sender IS NULL) AND (recipient IS NOT NULL)))),
    CONSTRAINT valid_asset_transfer CHECK (((asset_event_type_id <> 1) OR (NOT (ROW(sender, recipient) IS NULL))))
);


ALTER TABLE stacks_blockchain_api.stx_events OWNER TO stacks;

--
-- Name: stx_events_id_seq; Type: SEQUENCE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE SEQUENCE stacks_blockchain_api.stx_events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stacks_blockchain_api.stx_events_id_seq OWNER TO stacks;

--
-- Name: stx_events_id_seq; Type: SEQUENCE OWNED BY; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER SEQUENCE stacks_blockchain_api.stx_events_id_seq OWNED BY stacks_blockchain_api.stx_events.id;


--
-- Name: stx_lock_events; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.stx_lock_events (
    id integer NOT NULL,
    event_index integer NOT NULL,
    tx_id bytea NOT NULL,
    tx_index smallint NOT NULL,
    block_height integer NOT NULL,
    index_block_hash bytea NOT NULL,
    parent_index_block_hash bytea NOT NULL,
    microblock_hash bytea NOT NULL,
    microblock_sequence integer NOT NULL,
    microblock_canonical boolean NOT NULL,
    canonical boolean NOT NULL,
    locked_amount numeric NOT NULL,
    unlock_height integer NOT NULL,
    locked_address text NOT NULL,
    contract_name text NOT NULL
);


ALTER TABLE stacks_blockchain_api.stx_lock_events OWNER TO stacks;

--
-- Name: stx_lock_events_id_seq; Type: SEQUENCE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE SEQUENCE stacks_blockchain_api.stx_lock_events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stacks_blockchain_api.stx_lock_events_id_seq OWNER TO stacks;

--
-- Name: stx_lock_events_id_seq; Type: SEQUENCE OWNED BY; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER SEQUENCE stacks_blockchain_api.stx_lock_events_id_seq OWNED BY stacks_blockchain_api.stx_lock_events.id;


--
-- Name: subdomains; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.subdomains (
    id integer NOT NULL,
    name text NOT NULL,
    namespace_id text NOT NULL,
    fully_qualified_subdomain text NOT NULL,
    owner text NOT NULL,
    zonefile_hash text NOT NULL,
    parent_zonefile_hash text NOT NULL,
    parent_zonefile_index integer NOT NULL,
    tx_index smallint NOT NULL,
    block_height integer NOT NULL,
    zonefile_offset integer,
    resolver text,
    tx_id bytea,
    canonical boolean DEFAULT true NOT NULL,
    index_block_hash bytea,
    parent_index_block_hash bytea NOT NULL,
    microblock_hash bytea NOT NULL,
    microblock_sequence integer NOT NULL,
    microblock_canonical boolean NOT NULL
);


ALTER TABLE stacks_blockchain_api.subdomains OWNER TO stacks;

--
-- Name: subdomains_id_seq; Type: SEQUENCE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE SEQUENCE stacks_blockchain_api.subdomains_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stacks_blockchain_api.subdomains_id_seq OWNER TO stacks;

--
-- Name: subdomains_id_seq; Type: SEQUENCE OWNED BY; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER SEQUENCE stacks_blockchain_api.subdomains_id_seq OWNED BY stacks_blockchain_api.subdomains.id;


--
-- Name: token_offering_locked; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.token_offering_locked (
    id integer NOT NULL,
    address text NOT NULL,
    value bigint NOT NULL,
    block integer NOT NULL
);


ALTER TABLE stacks_blockchain_api.token_offering_locked OWNER TO stacks;

--
-- Name: token_offering_locked_id_seq; Type: SEQUENCE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE SEQUENCE stacks_blockchain_api.token_offering_locked_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stacks_blockchain_api.token_offering_locked_id_seq OWNER TO stacks;

--
-- Name: token_offering_locked_id_seq; Type: SEQUENCE OWNED BY; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER SEQUENCE stacks_blockchain_api.token_offering_locked_id_seq OWNED BY stacks_blockchain_api.token_offering_locked.id;


--
-- Name: txs; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.txs (
    id integer NOT NULL,
    tx_id bytea NOT NULL,
    tx_index smallint NOT NULL,
    raw_result bytea NOT NULL,
    index_block_hash bytea NOT NULL,
    block_hash bytea NOT NULL,
    block_height integer NOT NULL,
    parent_block_hash bytea NOT NULL,
    burn_block_time integer NOT NULL,
    parent_burn_block_time integer NOT NULL,
    type_id smallint NOT NULL,
    anchor_mode smallint NOT NULL,
    status smallint NOT NULL,
    canonical boolean NOT NULL,
    post_conditions bytea NOT NULL,
    nonce integer NOT NULL,
    fee_rate bigint NOT NULL,
    sponsored boolean NOT NULL,
    sponsor_address text,
    sponsor_nonce integer,
    sender_address text NOT NULL,
    origin_hash_mode smallint NOT NULL,
    event_count integer NOT NULL,
    execution_cost_read_count bigint NOT NULL,
    execution_cost_read_length bigint NOT NULL,
    execution_cost_runtime bigint NOT NULL,
    execution_cost_write_count bigint NOT NULL,
    execution_cost_write_length bigint NOT NULL,
    raw_tx bytea NOT NULL,
    microblock_canonical boolean NOT NULL,
    microblock_sequence integer NOT NULL,
    microblock_hash bytea NOT NULL,
    parent_index_block_hash bytea NOT NULL,
    token_transfer_recipient_address text,
    token_transfer_amount bigint,
    token_transfer_memo bytea,
    smart_contract_clarity_version smallint,
    smart_contract_contract_id text,
    smart_contract_source_code text,
    contract_call_contract_id text,
    contract_call_function_name text,
    contract_call_function_args bytea,
    poison_microblock_header_1 bytea,
    poison_microblock_header_2 bytea,
    coinbase_payload bytea,
    coinbase_alt_recipient text,
    coinbase_vrf_proof bytea,
    tenure_change_tenure_consensus_hash bytea,
    tenure_change_prev_tenure_consensus_hash bytea,
    tenure_change_burn_view_consensus_hash bytea,
    tenure_change_previous_tenure_end bytea,
    tenure_change_previous_tenure_blocks integer,
    tenure_change_cause smallint,
    tenure_change_pubkey_hash bytea,
    tenure_change_signature bytea,
    tenure_change_signers bytea,
    CONSTRAINT valid_coinbase CHECK (((type_id <> 4) OR (NOT (coinbase_payload IS NULL)))),
    CONSTRAINT "valid_coinbase-pay-to-alt" CHECK (((type_id <> 5) OR (NOT (ROW(coinbase_payload, coinbase_alt_recipient) IS NULL)))),
    CONSTRAINT valid_contract_call CHECK (((type_id <> 2) OR (NOT (ROW(contract_call_contract_id, contract_call_function_name, contract_call_function_args) IS NULL)))),
    CONSTRAINT "valid_nakamoto-coinbase" CHECK (((type_id <> 8) OR (NOT (ROW(coinbase_payload, coinbase_vrf_proof) IS NULL)))),
    CONSTRAINT valid_poison_microblock CHECK (((type_id <> 3) OR (NOT (ROW(poison_microblock_header_1, poison_microblock_header_2) IS NULL)))),
    CONSTRAINT valid_smart_contract CHECK (((type_id <> 1) OR (NOT (ROW(smart_contract_contract_id, smart_contract_source_code) IS NULL)))),
    CONSTRAINT "valid_tenure-change" CHECK (((type_id <> 7) OR (NOT (ROW(tenure_change_tenure_consensus_hash, tenure_change_prev_tenure_consensus_hash, tenure_change_burn_view_consensus_hash, tenure_change_previous_tenure_end, tenure_change_previous_tenure_blocks, tenure_change_cause, tenure_change_pubkey_hash, tenure_change_signature, tenure_change_signers) IS NULL)))),
    CONSTRAINT valid_token_transfer CHECK (((type_id <> 0) OR (NOT (ROW(token_transfer_recipient_address, token_transfer_amount, token_transfer_memo) IS NULL)))),
    CONSTRAINT valid_versioned_smart_contract CHECK (((type_id <> 6) OR (NOT (ROW(smart_contract_clarity_version, smart_contract_contract_id, smart_contract_source_code) IS NULL))))
);


ALTER TABLE stacks_blockchain_api.txs OWNER TO stacks;

--
-- Name: txs_id_seq; Type: SEQUENCE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE SEQUENCE stacks_blockchain_api.txs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stacks_blockchain_api.txs_id_seq OWNER TO stacks;

--
-- Name: txs_id_seq; Type: SEQUENCE OWNED BY; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER SEQUENCE stacks_blockchain_api.txs_id_seq OWNED BY stacks_blockchain_api.txs.id;


--
-- Name: zonefiles; Type: TABLE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE TABLE stacks_blockchain_api.zonefiles (
    id integer NOT NULL,
    name text NOT NULL,
    zonefile text NOT NULL,
    zonefile_hash text NOT NULL,
    tx_id bytea,
    index_block_hash bytea
);


ALTER TABLE stacks_blockchain_api.zonefiles OWNER TO stacks;

--
-- Name: zonefiles_id_seq; Type: SEQUENCE; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE SEQUENCE stacks_blockchain_api.zonefiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stacks_blockchain_api.zonefiles_id_seq OWNER TO stacks;

--
-- Name: zonefiles_id_seq; Type: SEQUENCE OWNED BY; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER SEQUENCE stacks_blockchain_api.zonefiles_id_seq OWNED BY stacks_blockchain_api.zonefiles.id;


--
-- Name: burnchain_rewards id; Type: DEFAULT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.burnchain_rewards ALTER COLUMN id SET DEFAULT nextval('stacks_blockchain_api.burnchain_rewards_id_seq'::regclass);


--
-- Name: contract_logs id; Type: DEFAULT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.contract_logs ALTER COLUMN id SET DEFAULT nextval('stacks_blockchain_api.contract_logs_id_seq'::regclass);


--
-- Name: event_observer_requests id; Type: DEFAULT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.event_observer_requests ALTER COLUMN id SET DEFAULT nextval('stacks_blockchain_api.event_observer_requests_id_seq'::regclass);


--
-- Name: faucet_requests id; Type: DEFAULT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.faucet_requests ALTER COLUMN id SET DEFAULT nextval('stacks_blockchain_api.faucet_requests_id_seq'::regclass);


--
-- Name: ft_events id; Type: DEFAULT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.ft_events ALTER COLUMN id SET DEFAULT nextval('stacks_blockchain_api.ft_events_id_seq'::regclass);


--
-- Name: mempool_txs id; Type: DEFAULT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.mempool_txs ALTER COLUMN id SET DEFAULT nextval('stacks_blockchain_api.mempool_txs_id_seq'::regclass);


--
-- Name: microblocks id; Type: DEFAULT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.microblocks ALTER COLUMN id SET DEFAULT nextval('stacks_blockchain_api.microblocks_id_seq'::regclass);


--
-- Name: miner_rewards id; Type: DEFAULT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.miner_rewards ALTER COLUMN id SET DEFAULT nextval('stacks_blockchain_api.miner_rewards_id_seq'::regclass);


--
-- Name: names id; Type: DEFAULT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.names ALTER COLUMN id SET DEFAULT nextval('stacks_blockchain_api.names_id_seq'::regclass);


--
-- Name: namespaces id; Type: DEFAULT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.namespaces ALTER COLUMN id SET DEFAULT nextval('stacks_blockchain_api.namespaces_id_seq'::regclass);


--
-- Name: nft_events id; Type: DEFAULT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.nft_events ALTER COLUMN id SET DEFAULT nextval('stacks_blockchain_api.nft_events_id_seq'::regclass);


--
-- Name: pgmigrations id; Type: DEFAULT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.pgmigrations ALTER COLUMN id SET DEFAULT nextval('stacks_blockchain_api.pgmigrations_id_seq'::regclass);


--
-- Name: pox2_events id; Type: DEFAULT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.pox2_events ALTER COLUMN id SET DEFAULT nextval('stacks_blockchain_api.pox2_events_id_seq'::regclass);


--
-- Name: pox3_events id; Type: DEFAULT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.pox3_events ALTER COLUMN id SET DEFAULT nextval('stacks_blockchain_api.pox3_events_id_seq'::regclass);


--
-- Name: pox4_events id; Type: DEFAULT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.pox4_events ALTER COLUMN id SET DEFAULT nextval('stacks_blockchain_api.pox4_events_id_seq'::regclass);


--
-- Name: principal_stx_txs id; Type: DEFAULT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.principal_stx_txs ALTER COLUMN id SET DEFAULT nextval('stacks_blockchain_api.principal_stx_txs_id_seq'::regclass);


--
-- Name: reward_slot_holders id; Type: DEFAULT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.reward_slot_holders ALTER COLUMN id SET DEFAULT nextval('stacks_blockchain_api.reward_slot_holders_id_seq'::regclass);


--
-- Name: smart_contracts id; Type: DEFAULT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.smart_contracts ALTER COLUMN id SET DEFAULT nextval('stacks_blockchain_api.smart_contracts_id_seq'::regclass);


--
-- Name: stx_events id; Type: DEFAULT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.stx_events ALTER COLUMN id SET DEFAULT nextval('stacks_blockchain_api.stx_events_id_seq'::regclass);


--
-- Name: stx_lock_events id; Type: DEFAULT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.stx_lock_events ALTER COLUMN id SET DEFAULT nextval('stacks_blockchain_api.stx_lock_events_id_seq'::regclass);


--
-- Name: subdomains id; Type: DEFAULT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.subdomains ALTER COLUMN id SET DEFAULT nextval('stacks_blockchain_api.subdomains_id_seq'::regclass);


--
-- Name: token_offering_locked id; Type: DEFAULT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.token_offering_locked ALTER COLUMN id SET DEFAULT nextval('stacks_blockchain_api.token_offering_locked_id_seq'::regclass);


--
-- Name: txs id; Type: DEFAULT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.txs ALTER COLUMN id SET DEFAULT nextval('stacks_blockchain_api.txs_id_seq'::regclass);


--
-- Name: zonefiles id; Type: DEFAULT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.zonefiles ALTER COLUMN id SET DEFAULT nextval('stacks_blockchain_api.zonefiles_id_seq'::regclass);


--
-- Name: blocks blocks_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.blocks
    ADD CONSTRAINT blocks_pkey PRIMARY KEY (index_block_hash);


--
-- Name: burnchain_rewards burnchain_rewards_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.burnchain_rewards
    ADD CONSTRAINT burnchain_rewards_pkey PRIMARY KEY (id);


--
-- Name: chain_tip chain_tip_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.chain_tip
    ADD CONSTRAINT chain_tip_pkey PRIMARY KEY (id);


--
-- Name: config_state config_state_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.config_state
    ADD CONSTRAINT config_state_pkey PRIMARY KEY (id);


--
-- Name: contract_logs contract_logs_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.contract_logs
    ADD CONSTRAINT contract_logs_pkey PRIMARY KEY (id);


--
-- Name: event_observer_requests event_observer_requests_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.event_observer_requests
    ADD CONSTRAINT event_observer_requests_pkey PRIMARY KEY (id);


--
-- Name: faucet_requests faucet_requests_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.faucet_requests
    ADD CONSTRAINT faucet_requests_pkey PRIMARY KEY (id);


--
-- Name: ft_events ft_events_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.ft_events
    ADD CONSTRAINT ft_events_pkey PRIMARY KEY (id);


--
-- Name: mempool_txs mempool_txs_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.mempool_txs
    ADD CONSTRAINT mempool_txs_pkey PRIMARY KEY (id);


--
-- Name: microblocks microblocks_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.microblocks
    ADD CONSTRAINT microblocks_pkey PRIMARY KEY (id);


--
-- Name: miner_rewards miner_rewards_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.miner_rewards
    ADD CONSTRAINT miner_rewards_pkey PRIMARY KEY (id);


--
-- Name: names names_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.names
    ADD CONSTRAINT names_pkey PRIMARY KEY (id);


--
-- Name: namespaces namespaces_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.namespaces
    ADD CONSTRAINT namespaces_pkey PRIMARY KEY (id);


--
-- Name: nft_custody_unanchored nft_custody_unanchored_unique; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.nft_custody_unanchored
    ADD CONSTRAINT nft_custody_unanchored_unique UNIQUE (asset_identifier, value);


--
-- Name: nft_custody nft_custody_unique; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.nft_custody
    ADD CONSTRAINT nft_custody_unique UNIQUE (asset_identifier, value);


--
-- Name: nft_events nft_events_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.nft_events
    ADD CONSTRAINT nft_events_pkey PRIMARY KEY (id);


--
-- Name: pgmigrations pgmigrations_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.pgmigrations
    ADD CONSTRAINT pgmigrations_pkey PRIMARY KEY (id);


--
-- Name: pox2_events pox2_events_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.pox2_events
    ADD CONSTRAINT pox2_events_pkey PRIMARY KEY (id);


--
-- Name: pox3_events pox3_events_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.pox3_events
    ADD CONSTRAINT pox3_events_pkey PRIMARY KEY (id);


--
-- Name: pox4_events pox4_events_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.pox4_events
    ADD CONSTRAINT pox4_events_pkey PRIMARY KEY (id);


--
-- Name: pox_state pox_state_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.pox_state
    ADD CONSTRAINT pox_state_pkey PRIMARY KEY (id);


--
-- Name: principal_stx_txs principal_stx_txs_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.principal_stx_txs
    ADD CONSTRAINT principal_stx_txs_pkey PRIMARY KEY (id);


--
-- Name: reward_slot_holders reward_slot_holders_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.reward_slot_holders
    ADD CONSTRAINT reward_slot_holders_pkey PRIMARY KEY (id);


--
-- Name: smart_contracts smart_contracts_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.smart_contracts
    ADD CONSTRAINT smart_contracts_pkey PRIMARY KEY (id);


--
-- Name: stx_events stx_events_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.stx_events
    ADD CONSTRAINT stx_events_pkey PRIMARY KEY (id);


--
-- Name: stx_lock_events stx_lock_events_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.stx_lock_events
    ADD CONSTRAINT stx_lock_events_pkey PRIMARY KEY (id);


--
-- Name: subdomains subdomains_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.subdomains
    ADD CONSTRAINT subdomains_pkey PRIMARY KEY (id);


--
-- Name: token_offering_locked token_offering_locked_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.token_offering_locked
    ADD CONSTRAINT token_offering_locked_pkey PRIMARY KEY (id);


--
-- Name: txs txs_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.txs
    ADD CONSTRAINT txs_pkey PRIMARY KEY (id);


--
-- Name: subdomains unique_fqs_tx_id_index_block_hash_microblock_hash; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.subdomains
    ADD CONSTRAINT unique_fqs_tx_id_index_block_hash_microblock_hash UNIQUE (fully_qualified_subdomain, tx_id, index_block_hash, microblock_hash);


--
-- Name: microblocks unique_microblock_hash; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.microblocks
    ADD CONSTRAINT unique_microblock_hash UNIQUE (microblock_hash);


--
-- Name: names unique_name_tx_id_index_block_hash_microblock_hash_event_index; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.names
    ADD CONSTRAINT unique_name_tx_id_index_block_hash_microblock_hash_event_index UNIQUE (name, tx_id, index_block_hash, microblock_hash, event_index);


--
-- Name: zonefiles unique_name_zonefile_hash_tx_id_index_block_hash; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.zonefiles
    ADD CONSTRAINT unique_name_zonefile_hash_tx_id_index_block_hash UNIQUE (name, zonefile_hash, tx_id, index_block_hash);


--
-- Name: namespaces unique_namespace_id_tx_id_index_block_hash_microblock_hash; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.namespaces
    ADD CONSTRAINT unique_namespace_id_tx_id_index_block_hash_microblock_hash UNIQUE (namespace_id, tx_id, index_block_hash, microblock_hash);


--
-- Name: principal_stx_txs unique_principal_tx_id_index_block_hash_microblock_hash; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.principal_stx_txs
    ADD CONSTRAINT unique_principal_tx_id_index_block_hash_microblock_hash UNIQUE (principal, tx_id, index_block_hash, microblock_hash);


--
-- Name: mempool_txs unique_tx_id; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.mempool_txs
    ADD CONSTRAINT unique_tx_id UNIQUE (tx_id);


--
-- Name: txs unique_tx_id_index_block_hash_microblock_hash; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.txs
    ADD CONSTRAINT unique_tx_id_index_block_hash_microblock_hash UNIQUE (tx_id, index_block_hash, microblock_hash);


--
-- Name: zonefiles zonefiles_pkey; Type: CONSTRAINT; Schema: stacks_blockchain_api; Owner: stacks
--

ALTER TABLE ONLY stacks_blockchain_api.zonefiles
    ADD CONSTRAINT zonefiles_pkey PRIMARY KEY (id);


--
-- Name: blocks_block_hash_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX blocks_block_hash_index ON stacks_blockchain_api.blocks USING hash (block_hash);


--
-- Name: blocks_block_height_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX blocks_block_height_index ON stacks_blockchain_api.blocks USING btree (block_height DESC);


--
-- Name: blocks_burn_block_hash_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX blocks_burn_block_hash_index ON stacks_blockchain_api.blocks USING hash (burn_block_hash);


--
-- Name: blocks_burn_block_height_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX blocks_burn_block_height_index ON stacks_blockchain_api.blocks USING btree (burn_block_height DESC);


--
-- Name: blocks_index_block_hash_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX blocks_index_block_hash_index ON stacks_blockchain_api.blocks USING hash (index_block_hash);


--
-- Name: burnchain_rewards_burn_block_hash_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX burnchain_rewards_burn_block_hash_index ON stacks_blockchain_api.burnchain_rewards USING hash (burn_block_hash);


--
-- Name: burnchain_rewards_burn_block_height_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX burnchain_rewards_burn_block_height_index ON stacks_blockchain_api.burnchain_rewards USING btree (burn_block_height DESC);


--
-- Name: burnchain_rewards_reward_recipient_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX burnchain_rewards_reward_recipient_index ON stacks_blockchain_api.burnchain_rewards USING hash (reward_recipient);


--
-- Name: contract_logs_block_height_microblock_sequence_tx_index_event_i; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX contract_logs_block_height_microblock_sequence_tx_index_event_i ON stacks_blockchain_api.contract_logs USING btree (block_height DESC, microblock_sequence DESC, tx_index DESC, event_index DESC);


--
-- Name: contract_logs_contract_identifier_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX contract_logs_contract_identifier_index ON stacks_blockchain_api.contract_logs USING btree (contract_identifier);


--
-- Name: contract_logs_event_index_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX contract_logs_event_index_index ON stacks_blockchain_api.contract_logs USING btree (event_index);


--
-- Name: contract_logs_index_block_hash_canonical_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX contract_logs_index_block_hash_canonical_index ON stacks_blockchain_api.contract_logs USING btree (index_block_hash, canonical);


--
-- Name: contract_logs_microblock_hash_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX contract_logs_microblock_hash_index ON stacks_blockchain_api.contract_logs USING btree (microblock_hash);


--
-- Name: contract_logs_tx_id_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX contract_logs_tx_id_index ON stacks_blockchain_api.contract_logs USING btree (tx_id);


--
-- Name: faucet_requests_address_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX faucet_requests_address_index ON stacks_blockchain_api.faucet_requests USING hash (address);


--
-- Name: ft_events_block_height_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX ft_events_block_height_index ON stacks_blockchain_api.ft_events USING btree (block_height DESC);


--
-- Name: ft_events_event_index_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX ft_events_event_index_index ON stacks_blockchain_api.ft_events USING btree (event_index);


--
-- Name: ft_events_index_block_hash_canonical_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX ft_events_index_block_hash_canonical_index ON stacks_blockchain_api.ft_events USING btree (index_block_hash, canonical);


--
-- Name: ft_events_microblock_hash_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX ft_events_microblock_hash_index ON stacks_blockchain_api.ft_events USING btree (microblock_hash);


--
-- Name: ft_events_recipient_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX ft_events_recipient_index ON stacks_blockchain_api.ft_events USING btree (recipient);


--
-- Name: ft_events_sender_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX ft_events_sender_index ON stacks_blockchain_api.ft_events USING btree (sender);


--
-- Name: ft_events_tx_id_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX ft_events_tx_id_index ON stacks_blockchain_api.ft_events USING btree (tx_id);


--
-- Name: mempool_digest_digest_unique_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE UNIQUE INDEX mempool_digest_digest_unique_index ON stacks_blockchain_api.mempool_digest USING btree (digest);


--
-- Name: mempool_txs_contract_call_contract_id_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX mempool_txs_contract_call_contract_id_index ON stacks_blockchain_api.mempool_txs USING btree (contract_call_contract_id);


--
-- Name: mempool_txs_nonce_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX mempool_txs_nonce_index ON stacks_blockchain_api.mempool_txs USING btree (nonce);


--
-- Name: mempool_txs_receipt_time_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX mempool_txs_receipt_time_index ON stacks_blockchain_api.mempool_txs USING btree (receipt_time DESC);


--
-- Name: mempool_txs_sender_address_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX mempool_txs_sender_address_index ON stacks_blockchain_api.mempool_txs USING btree (sender_address);


--
-- Name: mempool_txs_smart_contract_contract_id_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX mempool_txs_smart_contract_contract_id_index ON stacks_blockchain_api.mempool_txs USING btree (smart_contract_contract_id);


--
-- Name: mempool_txs_sponsor_address_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX mempool_txs_sponsor_address_index ON stacks_blockchain_api.mempool_txs USING btree (sponsor_address);


--
-- Name: mempool_txs_token_transfer_recipient_address_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX mempool_txs_token_transfer_recipient_address_index ON stacks_blockchain_api.mempool_txs USING btree (token_transfer_recipient_address);


--
-- Name: mempool_txs_type_id_fee_rate_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX mempool_txs_type_id_fee_rate_index ON stacks_blockchain_api.mempool_txs USING btree (type_id, fee_rate) WHERE (pruned = false);


--
-- Name: mempool_txs_type_id_receipt_block_height_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX mempool_txs_type_id_receipt_block_height_index ON stacks_blockchain_api.mempool_txs USING btree (type_id, receipt_block_height) WHERE (pruned = false);


--
-- Name: mempool_txs_type_id_tx_size_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX mempool_txs_type_id_tx_size_index ON stacks_blockchain_api.mempool_txs USING btree (type_id, tx_size) WHERE (pruned = false);


--
-- Name: microblocks_block_height_microblock_sequence_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX microblocks_block_height_microblock_sequence_index ON stacks_blockchain_api.microblocks USING btree (block_height DESC, microblock_sequence DESC);


--
-- Name: microblocks_microblock_hash_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX microblocks_microblock_hash_index ON stacks_blockchain_api.microblocks USING hash (microblock_hash);


--
-- Name: microblocks_parent_index_block_hash_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX microblocks_parent_index_block_hash_index ON stacks_blockchain_api.microblocks USING hash (parent_index_block_hash);


--
-- Name: miner_rewards_index_block_hash_canonical_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX miner_rewards_index_block_hash_canonical_index ON stacks_blockchain_api.miner_rewards USING btree (index_block_hash, canonical);


--
-- Name: miner_rewards_mature_block_height_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX miner_rewards_mature_block_height_index ON stacks_blockchain_api.miner_rewards USING btree (mature_block_height DESC);


--
-- Name: miner_rewards_miner_address_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX miner_rewards_miner_address_index ON stacks_blockchain_api.miner_rewards USING btree (miner_address);


--
-- Name: miner_rewards_recipient_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX miner_rewards_recipient_index ON stacks_blockchain_api.miner_rewards USING btree (recipient);


--
-- Name: names_index_block_hash_canonical_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX names_index_block_hash_canonical_index ON stacks_blockchain_api.names USING btree (index_block_hash, canonical);


--
-- Name: names_namespace_id_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX names_namespace_id_index ON stacks_blockchain_api.names USING btree (namespace_id);


--
-- Name: names_registered_at_microblock_sequence_tx_index_event_index_in; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX names_registered_at_microblock_sequence_tx_index_event_index_in ON stacks_blockchain_api.names USING btree (registered_at DESC, microblock_sequence DESC, tx_index DESC, event_index DESC);


--
-- Name: namespaces_index_block_hash_canonical_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX namespaces_index_block_hash_canonical_index ON stacks_blockchain_api.namespaces USING btree (index_block_hash, canonical);


--
-- Name: namespaces_ready_block_microblock_sequence_tx_index_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX namespaces_ready_block_microblock_sequence_tx_index_index ON stacks_blockchain_api.namespaces USING btree (ready_block DESC, microblock_sequence DESC, tx_index DESC);


--
-- Name: nft_custody_block_height_microblock_sequence_tx_index_event_ind; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX nft_custody_block_height_microblock_sequence_tx_index_event_ind ON stacks_blockchain_api.nft_custody USING btree (block_height DESC, microblock_sequence DESC, tx_index DESC, event_index DESC);


--
-- Name: nft_custody_recipient_asset_identifier_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX nft_custody_recipient_asset_identifier_index ON stacks_blockchain_api.nft_custody USING btree (recipient, asset_identifier);


--
-- Name: nft_custody_unanchored_block_height_microblock_sequence_tx_inde; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX nft_custody_unanchored_block_height_microblock_sequence_tx_inde ON stacks_blockchain_api.nft_custody_unanchored USING btree (block_height DESC, microblock_sequence DESC, tx_index DESC, event_index DESC);


--
-- Name: nft_custody_unanchored_recipient_asset_identifier_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX nft_custody_unanchored_recipient_asset_identifier_index ON stacks_blockchain_api.nft_custody_unanchored USING btree (recipient, asset_identifier);


--
-- Name: nft_custody_unanchored_value_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX nft_custody_unanchored_value_index ON stacks_blockchain_api.nft_custody_unanchored USING btree (value);


--
-- Name: nft_custody_value_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX nft_custody_value_index ON stacks_blockchain_api.nft_custody USING btree (value);


--
-- Name: nft_events_asset_identifier_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX nft_events_asset_identifier_index ON stacks_blockchain_api.nft_events USING btree (asset_identifier);


--
-- Name: nft_events_asset_identifier_value_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX nft_events_asset_identifier_value_index ON stacks_blockchain_api.nft_events USING btree (asset_identifier, value);


--
-- Name: nft_events_block_height_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX nft_events_block_height_index ON stacks_blockchain_api.nft_events USING btree (block_height DESC);


--
-- Name: nft_events_event_index_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX nft_events_event_index_index ON stacks_blockchain_api.nft_events USING btree (event_index);


--
-- Name: nft_events_index_block_hash_canonical_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX nft_events_index_block_hash_canonical_index ON stacks_blockchain_api.nft_events USING btree (index_block_hash, canonical);


--
-- Name: nft_events_microblock_hash_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX nft_events_microblock_hash_index ON stacks_blockchain_api.nft_events USING btree (microblock_hash);


--
-- Name: nft_events_recipient_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX nft_events_recipient_index ON stacks_blockchain_api.nft_events USING btree (recipient);


--
-- Name: nft_events_sender_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX nft_events_sender_index ON stacks_blockchain_api.nft_events USING btree (sender);


--
-- Name: nft_events_tx_id_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX nft_events_tx_id_index ON stacks_blockchain_api.nft_events USING btree (tx_id);


--
-- Name: pox2_events_block_height_microblock_sequence_tx_index_event_ind; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox2_events_block_height_microblock_sequence_tx_index_event_ind ON stacks_blockchain_api.pox2_events USING btree (block_height DESC, microblock_sequence DESC, tx_index DESC, event_index DESC);


--
-- Name: pox2_events_burnchain_unlock_height_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox2_events_burnchain_unlock_height_index ON stacks_blockchain_api.pox2_events USING btree (burnchain_unlock_height);


--
-- Name: pox2_events_delegate_to_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox2_events_delegate_to_index ON stacks_blockchain_api.pox2_events USING btree (delegate_to);


--
-- Name: pox2_events_delegator_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox2_events_delegator_index ON stacks_blockchain_api.pox2_events USING btree (delegator);


--
-- Name: pox2_events_index_block_hash_canonical_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox2_events_index_block_hash_canonical_index ON stacks_blockchain_api.pox2_events USING btree (index_block_hash, canonical);


--
-- Name: pox2_events_microblock_hash_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox2_events_microblock_hash_index ON stacks_blockchain_api.pox2_events USING btree (microblock_hash);


--
-- Name: pox2_events_name_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox2_events_name_index ON stacks_blockchain_api.pox2_events USING btree (name);


--
-- Name: pox2_events_pox_addr_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox2_events_pox_addr_index ON stacks_blockchain_api.pox2_events USING btree (pox_addr);


--
-- Name: pox2_events_stacker_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox2_events_stacker_index ON stacks_blockchain_api.pox2_events USING btree (stacker);


--
-- Name: pox2_events_tx_id_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox2_events_tx_id_index ON stacks_blockchain_api.pox2_events USING btree (tx_id);


--
-- Name: pox2_events_unlock_burn_height_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox2_events_unlock_burn_height_index ON stacks_blockchain_api.pox2_events USING btree (unlock_burn_height);


--
-- Name: pox3_events_block_height_microblock_sequence_tx_index_event_ind; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox3_events_block_height_microblock_sequence_tx_index_event_ind ON stacks_blockchain_api.pox3_events USING btree (block_height DESC, microblock_sequence DESC, tx_index DESC, event_index DESC);


--
-- Name: pox3_events_burnchain_unlock_height_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox3_events_burnchain_unlock_height_index ON stacks_blockchain_api.pox3_events USING btree (burnchain_unlock_height);


--
-- Name: pox3_events_delegate_to_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox3_events_delegate_to_index ON stacks_blockchain_api.pox3_events USING btree (delegate_to);


--
-- Name: pox3_events_delegator_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox3_events_delegator_index ON stacks_blockchain_api.pox3_events USING btree (delegator);


--
-- Name: pox3_events_index_block_hash_canonical_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox3_events_index_block_hash_canonical_index ON stacks_blockchain_api.pox3_events USING btree (index_block_hash, canonical);


--
-- Name: pox3_events_microblock_hash_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox3_events_microblock_hash_index ON stacks_blockchain_api.pox3_events USING btree (microblock_hash);


--
-- Name: pox3_events_name_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox3_events_name_index ON stacks_blockchain_api.pox3_events USING btree (name);


--
-- Name: pox3_events_pox_addr_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox3_events_pox_addr_index ON stacks_blockchain_api.pox3_events USING btree (pox_addr);


--
-- Name: pox3_events_stacker_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox3_events_stacker_index ON stacks_blockchain_api.pox3_events USING btree (stacker);


--
-- Name: pox3_events_tx_id_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox3_events_tx_id_index ON stacks_blockchain_api.pox3_events USING btree (tx_id);


--
-- Name: pox3_events_unlock_burn_height_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox3_events_unlock_burn_height_index ON stacks_blockchain_api.pox3_events USING btree (unlock_burn_height);


--
-- Name: pox4_events_block_height_microblock_sequence_tx_index_event_ind; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox4_events_block_height_microblock_sequence_tx_index_event_ind ON stacks_blockchain_api.pox4_events USING btree (block_height DESC, microblock_sequence DESC, tx_index DESC, event_index DESC);


--
-- Name: pox4_events_burnchain_unlock_height_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox4_events_burnchain_unlock_height_index ON stacks_blockchain_api.pox4_events USING btree (burnchain_unlock_height);


--
-- Name: pox4_events_delegate_to_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox4_events_delegate_to_index ON stacks_blockchain_api.pox4_events USING btree (delegate_to);


--
-- Name: pox4_events_delegator_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox4_events_delegator_index ON stacks_blockchain_api.pox4_events USING btree (delegator);


--
-- Name: pox4_events_index_block_hash_canonical_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox4_events_index_block_hash_canonical_index ON stacks_blockchain_api.pox4_events USING btree (index_block_hash, canonical);


--
-- Name: pox4_events_microblock_hash_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox4_events_microblock_hash_index ON stacks_blockchain_api.pox4_events USING btree (microblock_hash);


--
-- Name: pox4_events_name_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox4_events_name_index ON stacks_blockchain_api.pox4_events USING btree (name);


--
-- Name: pox4_events_pox_addr_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox4_events_pox_addr_index ON stacks_blockchain_api.pox4_events USING btree (pox_addr);


--
-- Name: pox4_events_stacker_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox4_events_stacker_index ON stacks_blockchain_api.pox4_events USING btree (stacker);


--
-- Name: pox4_events_tx_id_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox4_events_tx_id_index ON stacks_blockchain_api.pox4_events USING btree (tx_id);


--
-- Name: pox4_events_unlock_burn_height_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX pox4_events_unlock_burn_height_index ON stacks_blockchain_api.pox4_events USING btree (unlock_burn_height);


--
-- Name: principal_stx_txs_block_height_microblock_sequence_tx_index_ind; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX principal_stx_txs_block_height_microblock_sequence_tx_index_ind ON stacks_blockchain_api.principal_stx_txs USING btree (block_height DESC, microblock_sequence DESC, tx_index DESC);


--
-- Name: principal_stx_txs_tx_id_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX principal_stx_txs_tx_id_index ON stacks_blockchain_api.principal_stx_txs USING btree (tx_id);


--
-- Name: reward_slot_holders_burn_block_hash_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX reward_slot_holders_burn_block_hash_index ON stacks_blockchain_api.reward_slot_holders USING hash (burn_block_hash);


--
-- Name: reward_slot_holders_burn_block_height_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX reward_slot_holders_burn_block_height_index ON stacks_blockchain_api.reward_slot_holders USING btree (burn_block_height DESC);


--
-- Name: smart_contracts_contract_id_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX smart_contracts_contract_id_index ON stacks_blockchain_api.smart_contracts USING btree (contract_id);


--
-- Name: smart_contracts_index_block_hash_canonical_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX smart_contracts_index_block_hash_canonical_index ON stacks_blockchain_api.smart_contracts USING btree (index_block_hash, canonical);


--
-- Name: smart_contracts_microblock_hash_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX smart_contracts_microblock_hash_index ON stacks_blockchain_api.smart_contracts USING btree (microblock_hash);


--
-- Name: stx_events_block_height_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX stx_events_block_height_index ON stacks_blockchain_api.stx_events USING btree (block_height DESC);


--
-- Name: stx_events_event_index_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX stx_events_event_index_index ON stacks_blockchain_api.stx_events USING btree (event_index);


--
-- Name: stx_events_index_block_hash_canonical_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX stx_events_index_block_hash_canonical_index ON stacks_blockchain_api.stx_events USING btree (index_block_hash, canonical);


--
-- Name: stx_events_microblock_hash_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX stx_events_microblock_hash_index ON stacks_blockchain_api.stx_events USING btree (microblock_hash);


--
-- Name: stx_events_recipient_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX stx_events_recipient_index ON stacks_blockchain_api.stx_events USING btree (recipient);


--
-- Name: stx_events_sender_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX stx_events_sender_index ON stacks_blockchain_api.stx_events USING btree (sender);


--
-- Name: stx_events_tx_id_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX stx_events_tx_id_index ON stacks_blockchain_api.stx_events USING btree (tx_id);


--
-- Name: stx_lock_events_block_height_microblock_sequence_tx_index_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX stx_lock_events_block_height_microblock_sequence_tx_index_index ON stacks_blockchain_api.stx_lock_events USING btree (block_height DESC, microblock_sequence DESC, tx_index DESC);


--
-- Name: stx_lock_events_contract_name_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX stx_lock_events_contract_name_index ON stacks_blockchain_api.stx_lock_events USING btree (contract_name);


--
-- Name: stx_lock_events_index_block_hash_canonical_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX stx_lock_events_index_block_hash_canonical_index ON stacks_blockchain_api.stx_lock_events USING btree (index_block_hash, canonical);


--
-- Name: stx_lock_events_locked_address_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX stx_lock_events_locked_address_index ON stacks_blockchain_api.stx_lock_events USING btree (locked_address);


--
-- Name: stx_lock_events_microblock_hash_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX stx_lock_events_microblock_hash_index ON stacks_blockchain_api.stx_lock_events USING btree (microblock_hash);


--
-- Name: stx_lock_events_tx_id_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX stx_lock_events_tx_id_index ON stacks_blockchain_api.stx_lock_events USING btree (tx_id);


--
-- Name: stx_lock_events_unlock_height_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX stx_lock_events_unlock_height_index ON stacks_blockchain_api.stx_lock_events USING btree (unlock_height DESC);


--
-- Name: subdomains_block_height_microblock_sequence_tx_index_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX subdomains_block_height_microblock_sequence_tx_index_index ON stacks_blockchain_api.subdomains USING btree (block_height DESC, microblock_sequence DESC, tx_index DESC);


--
-- Name: subdomains_index_block_hash_canonical_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX subdomains_index_block_hash_canonical_index ON stacks_blockchain_api.subdomains USING btree (index_block_hash, canonical);


--
-- Name: subdomains_name_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX subdomains_name_index ON stacks_blockchain_api.subdomains USING btree (name);


--
-- Name: subdomains_owner_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX subdomains_owner_index ON stacks_blockchain_api.subdomains USING btree (owner);


--
-- Name: token_offering_locked_address_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX token_offering_locked_address_index ON stacks_blockchain_api.token_offering_locked USING hash (address);


--
-- Name: txs_block_height_microblock_sequence_tx_index_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX txs_block_height_microblock_sequence_tx_index_index ON stacks_blockchain_api.txs USING btree (block_height DESC, microblock_sequence DESC, tx_index DESC);


--
-- Name: txs_coinbase_alt_recipient_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX txs_coinbase_alt_recipient_index ON stacks_blockchain_api.txs USING btree (coinbase_alt_recipient);


--
-- Name: txs_contract_call_contract_id_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX txs_contract_call_contract_id_index ON stacks_blockchain_api.txs USING btree (contract_call_contract_id);


--
-- Name: txs_index_block_hash_canonical_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX txs_index_block_hash_canonical_index ON stacks_blockchain_api.txs USING btree (index_block_hash, canonical);


--
-- Name: txs_microblock_hash_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX txs_microblock_hash_index ON stacks_blockchain_api.txs USING btree (microblock_hash);


--
-- Name: txs_sender_address_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX txs_sender_address_index ON stacks_blockchain_api.txs USING btree (sender_address);


--
-- Name: txs_smart_contract_contract_id_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX txs_smart_contract_contract_id_index ON stacks_blockchain_api.txs USING btree (smart_contract_contract_id);


--
-- Name: txs_sponsor_address_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX txs_sponsor_address_index ON stacks_blockchain_api.txs USING btree (sponsor_address);


--
-- Name: txs_token_transfer_recipient_address_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX txs_token_transfer_recipient_address_index ON stacks_blockchain_api.txs USING btree (token_transfer_recipient_address);


--
-- Name: txs_type_id_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX txs_type_id_index ON stacks_blockchain_api.txs USING btree (type_id);


--
-- Name: zonefiles_zonefile_hash_index; Type: INDEX; Schema: stacks_blockchain_api; Owner: stacks
--

CREATE INDEX zonefiles_zonefile_hash_index ON stacks_blockchain_api.zonefiles USING btree (zonefile_hash);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- Name: SCHEMA stacks_blockchain_api; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA stacks_blockchain_api TO stacks;


--
-- PostgreSQL database dump complete
--

