# Stacks Status

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://mit-license.org/)
[![Pull Requests Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)

This repository contains the code for the [**Stacks Blockchain Status Page**](https://status.stacks.org/) code used by the [Stacks Foundation](https://www.stacks.org) to display blockchain metrics.
This is a next.js react app that reads locally stored metric data from a postgres database, and periodically will fetch data from [https://stacksonchain.com/](https://stacksonchain.com/) to refresh the displayed data.

## Getting Started

- PostgreSQL is a required dependency
  example with Docker:

```bash
$ docker run -d \
    --rm \
    --name postgres \
    -p 5432:5432 \
    -e POSTGRES_PASSWORD=postgres \
    -v ./postgres_data:/var/lib/postgresql/data \
postgres:15-alpine
```

```bash
# Clone this repo and enter its directory
git clone https://github.com/stacksfoundation/stacksstatus && cd stacksstatus


# Create .env file
cp .env.local.example .env

# Install dependencies

# Run development server
yarn dev

# Run production server
yarn build && yarn prismamigrate && yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Refreshing the data

## Adding more checks

In folder `./status_checks`, each json file defines an API request to [stacksonchain](https://stacksonchain.com).
To add a new check, copy/paste an existing file and modify the query (be sure to set `"disabled": false` to enable the check).
Refer to the json schemas:

- [status_checks_array.schema.json](./status_checks_array.schema.json)
- [status_checks_string.schema.json](./status_checks_string.schema.json)

## Configuration

### Environment Variables

| Name             | Description                      | Default Value                                            |
| ---------------- | -------------------------------- | -------------------------------------------------------- |
| `NODE_ENV`       | Sets the node environment        | `development`                                            |
| `DATABASE_URL`   | Postgresql connection URI        | `postgresql://postgres:postgres@localhost:5432/postgres` |
| `API_SECRET_KEY` | Key to refresh the data via POST | `secret`                                                 |
