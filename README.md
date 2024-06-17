[![CI](https://github.com/JosephGasiorekUSDS/verify-nextjs/actions/workflows/build.yml/badge.svg)](https://github.com/JosephGasiorekUSDS/verify-nextjs/actions/workflows/build.yml)

# Income verification
This application is uses:
* NextJS
* React
* USWDS react components
* Deployment to cloud.gov

## Assumptions
Accessibility, unit testing, and translation are being built in from the ground up. We want to make sound decisions that allow this app to scale, but understand that we also want to make a few decisions as possible at this early stage. We are still learning about this problem space, but we are sure that accessibility, testing, and translation are important.

## Getting started
First, install the dependencies:
```bash
npm install
```

Next, run the development server:

```bash
npm run dev
```

Then disable `nextjs` telemetry by running your choice of:

```bash
npx next telemetry disable
```

Open [http://localhost:3000/ledger/income/add](http://localhost:3000/ledger/income/add) with your browser to see the result.

## Development

### Document structure
This application uses NextJS's default file structure. You can learn more about this from [NextJS](https://nextjs.org/docs/getting-started/project-structure). 

#### `app`
Next has a style where routing is determined by file structure. You'll find all of the application files inside of the `app` directory.
* `components`: lots of code that are not USWDS components but are larger patterns in the application
* `i18n`: translation keys
* `ledger`
* [Probably goes away soon? --kate] `sample`
* `statement`

#### `lib`
`features` contains our redux stores, which is our data structure in this local-storage-focused app. You'll notice below that there's a question about Store default values and other data structure thoughts below in our notes and decisions but for now this is where we're keeping our data structures. As things become more complicated we will want to revisit our decisions in this area.

#### `public`
Where any public assets are stored.

## Tests and linting
Testing is a first-class citizen here

```bash
# to run tests
npm run test
# to check coverage
npm run coverage
# to lint
npm run lint
```

## Deploy
1. Go to https://github.com/JosephGasiorekUSDS/verify-nextjs/actions/workflows/deploy.yml
1. Click "Run Workflow" button on the right
1. Click "Run Workflow" in the dialog that appears

## Resources
### Project-specific
`TODO`
* JIRA
* Mocks
* what else what else what else?

### Technical
* [NextJS docs](https://nextjs.org/docs)

## Technical notes and deferred decisions

Moved to [ADR](/adr) directory