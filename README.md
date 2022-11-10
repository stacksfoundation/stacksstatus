# Stacks Status
This repository contains the code for the [**Stacks Blockchain Status Page**](https://status.stacks.org/) code used by the [Stacks Foundation](https://www.stacks.org) to display blockchain metrics.
This is a next.js react app that reads locally stored metric data from a postgres database, and periodically will fetch data from [https://stacksonchain.com/](https://stacksonchain.com/) to refresh the displayed data. 


## Getting Started

* PostgreSQL is a required dependency
example with Docker:
```bash
$ docker run -d \
    --rm \
    --name postgres \
    -p 5432:5432 \
    -e POSTGRES_PASSWORD=postgres \
    -v /tmp/postgres_data:/var/lib/postgresql/data \
postgres:14-alpine
```

```bash
# Clone this repo and enter its directory
git clone https://github.com/stacksfoundation/stacksstatus && cd stacksstatus


# Create .env file
cp .env.local.example .env

# update .env file with DB connection options (HOST, USER, PASSWORD, etc) and apply migrations
npx prisma migrate dev --name init

# Install dependencies
npm install

# Run development server
npm run dev
# or
yarn dev

# Run production server
npm run build && npm run start
yarn build && yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Refreshing the data
There are 2 paths via the `/api` route to refresh the data, and 1 standalone script with not authentication

1. `/api/refresh` - this path is used with [upstash](upstash.com) [docs](https://docs.upstash.com/qstash/quickstarts/vercel-nextjs)
2. `/api/refresh_local` - this path is used with a local key defined below `API_SECRET_KEY`
3. `node lib/standalone_check.js` - [package.json](./package.json) will need to be set to `"type": "module"` to run this

To refresh the data, you can run a `curl` command like the following:
```bash
$ curl -sLw '\n' \
    --request POST \
    --url 'localhost:3000/api/refresh_local' \
    --header 'Authorization: Bearer secret'
```

With upstash:
```bash
$ curl -sL \
  --request POST \
  --url "https://qstash.upstash.io/v1/publish/<url of app>/api/refresh" \
 --header "Authorization: Bearer <refer to upstash docs>"
```


## Adding more checks
In folder `./status_checks`, each json file defines an API request to [stacksonchain](https://stacksonchain.com). 
To add a new check, copy/paste an existing file and modify the query (be sure to set `"disabled": false` to enable the check). 
Refer to the json schemas:
* [status_checks_array.schema.json](./status_checks_array.schema.json)
* [status_checks_string.schema.json](./status_checks_string.schema.json)


## Configuration

### Environment Variables

| Name                                   | Description                         | Default Value                                             |
| -------------------------------------- | ----------------------------------- | --------------------------------------------------------- |
| `NODE_ENV`                             | Sets the node environment           | `development`                                             |
| `DATABASE_URL`                         | Postgresql connection URI           | `postgresql://postgres:postgres@localhost:5432/postgres`  |
| `API_SECRET_KEY`                       | Key to refresh the data via POST    | `secret`                                                  |



