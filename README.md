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
# or
yarn dev
# or
pnpm dev
# or
bun dev
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

## Run tests
Testing is a first-class citizen here

```bash
npm run test
```

## Deploy
Joe help!

## Resources
### Project-specific
`TODO`
* JIRA
* Mocks
* what else what else what else?

### Technical
* [NextJS docs](https://nextjs.org/docs)

## Technical notes and deferred decisions

* From [Benefits chooser](https://github.com/JosephGasiorekUSDS/verify-nextjs/pull/15), the notion of program constants and type definitions for them. Asking the question of using oo inheritance to customize by state?
* From [Add income fixes](https://github.com/JosephGasiorekUSDS/verify-nextjs/pull/16/files), let's get with DF translation folks to learn some best practices (Kate can facilitate)
* From [Read and sign](https://github.com/JosephGasiorekUSDS/verify-nextjs/pull/18/files), 
	- design review "process"
	- router tests as own test type
	- todo for kate: look over truss components and defaults and learn how to customize
	- make * the default for required fields
* From [Confirmation](https://github.com/JosephGasiorekUSDS/verify-nextjs/pull/20/files)
	- image storage paradigm (a decision to defer until we know more about state needs with external forms/images/assets)
	- default layout-type page inside nextjs?
* from building the readme document:
	- having both components translations and Page notions inside of the same directory feels confusing. I wonder if there's a way to make these more clear. I tried to note what each each directory in the `app` directory was up above but we should keep an eye on this and see how easy it is to understand overtime --kate
