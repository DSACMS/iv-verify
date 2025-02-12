# Income Verfication as a Service - Digital Ledger Intervention

## About the Project
Income Verification as a Service (IVaaS) is a platform to aid in verifying income across means based benefit programs. It comprises multiple interventions to meet the needs of different income earner types. Background and context on the project can be found here

This repo is specific to the Digital Ledger intervention. The digital ledger is in the proof-of-concept stage. It is a mobile-first self guided applicaiton to be used by individuals who are self-employed to aid in creating business income and expenses ledgers, to be used for income verification. 

This application is uses:
* NextJS
* React
* USWDS react components
* Deployment to cloud.gov

## Core Team
An up-to-date list of core team members can be found in [MAINTAINERS.md](MAINTAINERS.md). At this time, the project is still building the core team and defining roles and responsibilities. We are eagerly seeking individuals who would like to join the community and help us define and fill these roles.

## Documentation index
- [Assumptions](#assumptions)
- [Repository structure](#repository-structure)
- [Development](#development)
- [Deploy](#deploy)
- [Resources](#resources)

## Assumptions
Accessibility, unit testing, and translation are being built in from the ground up. We want to make sound decisions that allow this app to scale, but understand that we also want to make a few decisions as possible at this early stage. We are still learning about this problem space, but we are sure that accessibility, testing, and translation are important.

## Repository structure
This application uses NextJS's default file structure. You can learn more about this from [NextJS](https://nextjs.org/docs/getting-started/project-structure). 

### `adr`
Architecture design records are in this directory.

### `app`
Next has a style where routing is determined by file structure. You'll find all of the application files inside of the `app` directory.
* `[locale]`: where the pages live
* `api`: looks like api endpoints with some automagic nextjs things
	- `POST /export`
	- `GET /sitemap`
* `components`: reused components in the application
* `i18n`: translation keys

### `lib`
`features` contains our redux stores, which is our data structure in this local-storage-focused app. You'll notice below that there's a question about Store default values and other data structure thoughts below in our notes and decisions but for now this is where we're keeping our data structures. As things become more complicated we will want to revisit our decisions in this area.

### `public`
Where any public assets are stored.

### `scripts`
Tooling and scripts to make the repository run smoothly and correctly.


## Branching model
This project follows [trunk-based development](https://trunkbaseddevelopment.com/), which means:

* Make small changes in [short-lived feature branches](https://trunkbaseddevelopment.com/short-lived-feature-branches/) and merge to `main` frequently.
* Be open to submitting multiple small pull requests for a single ticket (i.e. reference the same ticket across multiple pull requests).
* Treat each change you merge to `main` as immediately deployable to production. Do not merge changes that depend on subsequent changes you plan to make, even if you plan to make those changes shortly.
* Ticket any unfinished or partially finished work.
* Tests should be written for changes introduced, and adhere to the text percentage threshold determined by the project.

This project uses **continuous deployment** using [Github Actions](https://github.com/features/actions) which is configured in the [./github/worfklows](.github/workflows) directory.

Pull-requests are merged to `main`.

## Development

### Starting the application locally
##### Prerequisite steps
1. Install [node.js](https://nodejs.org/en/download/package-manager). For example, installing version 20 using brew:
    ```bash
    brew install node@20
    ```
1. Clone this repo to your local workspace. For example, using github cli:
    ```bash
    gh repo clone DSACMS/iv-verify
    ```
    
##### Steps
1. Change into the repo's directory.
    ```bash
    cd iv-verify
    ```
1. Install dependencies.
    ```bash
    npm install
    ```
1. Run the development server.
    ```bash
    npm run dev
    ```
1. Open [http://localhost:3000/](http://localhost:3000/) with your browser to access the application.

### Running the application in a docker container

##### Prerequisite steps
1. Install [docker](https://www.docker.com/get-started/). 
1. Clone this repo to your local workspace. For example, using github cli:
    ```bash
    gh repo clone DSACMS/iv-verify
    ```
##### Steps to build the image
1. Change into the repo's directory.
    ```bash
    cd iv-verify
    ```
1. Do a clean install of the project.
    ```bash
    npm ci
    ```
1. Build the project.
    ```bash
    npm run build
    ```
1. Build the image. For example, with no stated tag:
    ```bash
    docker build -t iv-verify .
    ```
##### Steps to start the image
1. With an image built from above, start the image. The command below maps the external port to 3000.
    ```bash
    docker run -p 3000:3000 iv-verify
    ``` 
1. Open [http://localhost:3000/](http://localhost:3000/) with your browser to access the application.

##### Chromium architecture check in the Dockerfile
The [Dockerfile](./Dockerfile) contains logic checking to determine whether or not the server building the image uses ARM64 architecture. This is done because ARM64 does not include the Chromium open-source browser and Chromium is a dependency for some testing libraries used by the application. Without Chromium, the `npm install` step fails when building the image. 
As a result, the Dockerfile sets the `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD` environment variable to `false` if the server machine is ARM64. This will result in Chromium be downloaded during the npm install which will allow the image build to proceed successfully. For additional references, see https://github.com/puppeteer/puppeteer/issues/7740.

## Tests and linting

To run tests:
```bash
npm run test
```

To check the test coverage:
```bash
npm run coverage
```

This application uses the linter in NextJS and is executed as part of the pull request checks and you cannot merge without all checks passing. 
To run the linter locally:
```bash
npm run lint
```

## Deploy

This section refers to deploying to a cloud.gov sandbox environment.

### Set up your cloud.gov sandbox environment
The following steps only need to be done once per person. Once you have set up your sandbox environment, you will be able to deploy the application to it and access it publically.

#### Sign up for an account
Before being able to deploy into cloud.gov, you will need to sign up for a sandbox account on the platform. Only federal employees and contractors with a qualified US federal government email may obtain free sandbox space. To register, go to the [sign up page](https://account.fr.cloud.gov/signup). You will need access to your email and an authenticator app (such as Google Authenticator, 1password, Microsoft Authenticator, or Authy).

#### Download the Cloud Foundry CLI

Refer to the [Getting Started - Setting up the command line](https://cloud.gov/docs/getting-started/setup/#set-up-the-command-line) documentation on cloud.gov. The instructions will step through how to set up the Cloud Foundry command line interface and authenticate to your cloud.gov instance.

#### Establish the application in your sandbox
Here is how to migrate from one deployment namespace to another. We'll need to run a manual deployment to set up the namespace before setting up the gh action to reflect the new location. 

1. In the new owner's repo, `npm i && npm run build` if you haven't already
2. Edit the `manifest.yml` to create the name you want. I've been using `verify-ledger-prototype`
2. `cf push [name-in-manifest]`

Reference: https://cloud.gov/docs/services/cloud-gov-service-account/#how-to-create-an-instance

#### Create a service account for your deployments

To create a service account to use for deployments, first create a service instance associated with your 
   ```bash
   cf create-service cloud-gov-service-account space-deployer [name-in-manifest]

   # For example:
   cf create-service cloud-gov-service-account space-deployer verify-ledger-prototype
   ```

Next, create a service account and bind it to your service instance.
   ```bash
   cf create-service-key [name-in-manifest] [your-key-name]
   
   # For example:
   cf create-service-key verify-ledger-prototype ledger-service-key
   ```

Generate the service key for the account.
   ```bash
   cf service-key [name-in-manifest] [your-key-name]
    
   # For example:
   cf service-key verify-ledger-prototype ledger-service-key
   ```

The command will output a username and password that you will use for deploying the application. You will be prompted for your credentials when using the sandbox deployment workflow.

    {
        "credentials": {
            "password": "oYasdfliaweinasfdliecVfake/",
            "username": "fakebeed-aabb-1234-feha0987654321000"
        }
    }

### Deploy to the cloud.gov sandbox environment
The repository has a workflow for building and deploying the application to a cloud.gov sandbox.

1. Go to https://github.com/DSACMS/iv-verify/actions/workflows/deploy-to-sandbox.yml.
1. Click "Run Workflow" button on the right.
1. Fill out the following three fields:

    | Field | Required | Description |
    | --- | --- | --- |
    | Cloud.gov service account username  | Yes | The user name of service account of the sandbox owner's space. |
    | Cloud.gov service account password | Yes | The password of service account of the sandbox owner's space. |
    | Application name    | No | The name of the application as it is defined in the owner's sandbox space. If no value is given, then the value in the manifest.yml is used. |
1. Click the "Run Workflow" button in the dialog to start the processing.


#### Deployment resources
- [Set secrets for gh actions](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-an-environment)
- [`space-deployer` docs](https://cloud.gov/docs/services/cloud-gov-service-account/)

## Resources
### Project-specific
* JIRA
* Designs

### Technical
* [NextJS docs](https://nextjs.org/docs)

## Contributing

Thank you for considering contributing to an Open Source project of the US Government! For more information about our contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Codeowners

The contents of this repository are managed by **the US Digital Service**. Those responsible for the code and documentation in this repository can be found in [CODEOWNERS.md](CODEOWNERS.md).

## Community

The iv-verify team is taking a community-first and open source approach to the product development of this tool. We believe government software should be made in the open and be built and licensed such that anyone can download the code, run it themselves without paying money to third parties or using proprietary software, and use it as they will.

We know that we can learn from a wide variety of communities, including those who will use or will be impacted by the tool, who are experts in technology, or who have experience with similar technologies deployed in other spaces. We are dedicated to creating forums for continuous conversation and feedback to help shape the design and development of the tool.

We also recognize capacity building as a key part of involving a diverse open source community. We are doing our best to use accessible language, provide technical and process documents, and offer support to community members with a wide variety of backgrounds and skillsets. 

### Community Guidelines

Principles and guidelines for participating in our open source community are can be found in [COMMUNITY_GUIDELINES.md](COMMUNITY_GUIDELINES.md). Please read them before joining or starting a conversation in this repo or one of the channels listed below. All community members and participants are expected to adhere to the community guidelines and code of conduct when participating in community spaces including: code repositories, communication channels and venues, and events. 

## Governance
<!-- TODO: Make a short statement about how the project is governed (formally, or informally) and link to the GOVERNANCE.md file.-->

Information about how the iv-verify community is governed may be found in [GOVERNANCE.md](GOVERNANCE.md).

## Feedback

If you have ideas for how we can improve or add to our capacity building efforts and methods for welcoming people into our community, please let us know at iv-verify@cms.hhs.gov. If you would like to comment on the tool itself, please let us know by filing an **issue on our GitHub repository.**

## Glossary

Information about terminology and acronyms used in this documentation may be found in [GLOSSARY.md](GLOSSARY.md).

## Policies

### Open Source Policy

We adhere to the [CMS Open Source
Policy](https://github.com/CMSGov/cms-open-source-policy). If you have any
questions, just [shoot us an email](mailto:opensource@cms.hhs.gov).

### Security and Responsible Disclosure Policy

*Submit a vulnerability:* Unfortunately, we cannot accept secure submissions via
email or via GitHub Issues. Please use our website to submit vulnerabilities at
[https://hhs.responsibledisclosure.com](https://hhs.responsibledisclosure.com).
HHS maintains an acknowledgements page to recognize your efforts on behalf of
the American public, but you are also welcome to submit anonymously.

For more information about our Security, Vulnerability, and Responsible Disclosure Policies, see [SECURITY.md](SECURITY.md).

## Public domain

This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/) as indicated in [LICENSE](LICENSE).

All contributions to this project will be released under the CC0 dedication. By submitting a pull request or issue, you are agreeing to comply with this waiver of copyright interest.
