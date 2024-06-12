[![CI](https://github.com/JosephGasiorekUSDS/verify-nextjs/actions/workflows/build.yml/badge.svg)](https://github.com/JosephGasiorekUSDS/verify-nextjs/actions/workflows/build.yml)

## Getting Started
First, install the dependencies:
```bash
npm install
```

Next, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000/ledger/income/add](http://localhost:3000/ledger/income/add) with your browser to see the result.

Then disable `nextjs` telemetry by running your choice of:

```
npx next telemetry disable
yarn next telemetry disable
pnpm exec next telemetry disable
bun next telemetry disable
```

## Run Tests

```bash
npm run test
```
