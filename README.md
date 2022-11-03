This repository contains the code for the [**Stacks Blockchain Status Page**](https://status.stacks.org/) code used by the [Stacks Foundation](https://www.stacks.org)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) (Vercel).

## Getting Started

* PostgreSQL is a required dependency

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

You can start editing the page by modifying [`pages/index.js`](pages/index.js). The page auto-updates as you edit the file.


## Adding more checks
In folder `./status_checks`, each json file defines an API request to [stacksonchain](https://stacksonchain.com). 
To add a new check, copy/paste an existing file and modify the query (be sure to set `"disabled": false` to enable the check). 


## Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

