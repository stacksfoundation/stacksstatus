# Stacks Status

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://mit-license.org/)
[![Pull Requests Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)

This repository contains the code for the [**Stacks Blockchain Status Page**](https://status.stacks.org/) code used by the [Stacks Foundation](https://www.stacks.org) to display blockchain metrics.
This is a next.js react app that reads [Stacks Blockchain API](https://github.com/hirosystems/stacks-blockchain-api) data from a postgres database to display chainstate data.

## Getting Started

- PostgreSQL is a **required** dependency with a [Stacks Blockchain API](https://github.com/hirosystems/stacks-blockchain-api) instance writing chainstate data.
  - https://github.com/hirosystems/stacks-blockchain-api?tab=readme-ov-file#quick-start
- [Vercel cron](https://vercel.com/docs/cron-jobs) is used for updating mempool txs

### Clone this repo and enter its directory

```bash
# Clone this repo and enter its directory
git clone https://github.com/stacksfoundation/stacksstatus && cd stacksstatus
```

### Create .env file

```bash
cp .env.local.example .env
```

### Edit .env file,

set `DATABASE_URL` to your Stacks Blockchain API database instance.
ex:

```
DATABASE_URL="postgresql://user:pass@localhost:5432/stacks_blockchain_api?schema=stacks_blockchain_api"
```

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Run production server

```bash
npm run build && npm run prismamigrate && npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

### Environment Variables

| Name           | Description                                                                           | Default Value                                                                              |
| -------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `NODE_ENV`     | Sets the node environment                                                             | `development`                                                                              |
| `DATABASE_URL` | Postgresql connection URI                                                             | `postgresql://user:pass@localhost:5432/stacks_blockchain_api?schema=stacks_blockchain_api` |
| `CRON_SECRET`  | Auth key to refresh mempool data via [vercel cron](https://vercel.com/docs/cron-jobs) | `secret`                                                                                   |
