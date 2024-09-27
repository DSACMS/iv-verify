# State Configuration: Config and user access

## Status

Accepted

## Context

iv-verify was designed to support multiple states and benefits. While there is a lot of overlap in the information requested of the end user there are a number of items that are specific to a particular state such as:
 - Copy: Specific text could be required by certain states
 - Numbers/Values: Standard deduction % will be different by state
 - URLs: Linking the user to documentation will be different by state
 - Flow Logic: Some states may require certain screens which will need to be done by configuration

There are three decisions that are proposed in this ADR: Storage of configuration, storage of state specific copy, and routing between configurations.

### Storage of configuration

Storing of state specific values, urls, and logic variables should be stored on a state by state basis. The two options being evaluated are storage in a database, separate service, or configuration file.

#### Storage in database

The main benefit of storing configuration in a database is that it can be updated without a new deploy. In this solution a configuration table would be created with each row consisting of the configuration for the state. The drawback to storing configuration in the database is that because iv-verify does not currently use a database it would require standing up the infrastucture.

#### Storage in a separate service

This option allows for all configuration to be separated from the iv-verify service and put in it's own configuration service.


#### Storage of configuration in file

This option would see the configuration put in a json or yaml file that is bundled with the app code on deploy. The advantages of this solution is that there is version control for all configuration changes and it does not require standing up a database or separate service. The downside is that to make a configuration change a new deploy would have to be done.

For reference, CBV stores their config file [here](https://github.com/DSACMS/iv-cbv-payroll/blob/main/app/config/site-config.yml)

### Routing between configurations

Once an end user arrives on iv-verify they need to be able to start an application for a particular state. Which state a user is using can be configured in either the URL or in a Cookie.

#### URL

In this option the URL for the ledger add screen goes from https://verify-prototype.app.cloud.gov/ledger/income/add to https://verify-prototype.app.cloud.gov/or/ledger/income/add where "or" is the state configuration key (OR for Oregon). This option makes it very clear which flow you are in and can make testing easier. The downside is that it requires a bit of work to modify the URLRouter to generate the URLs correctly to navigate between screens.

#### Cookie

In this option the URL for the ledger add screen states the same but when the user initiates the flow a cookie is set to indicate which flow the user is in. Both the client and server will have access to this cookie to navigate the user down the flow. The downside to this solution is that is not visibly clear which flow a user is unless the UI is modified to say so.

## Decision

The accepted approaches are as follows:

### Storage

Configuration should be stored in files for iv-verify. This requires the least upfront work and provides version control for configuration changes. iv-verify is not at the point where making configuration changes without a deploy is necessary.

### Routing

Routing should be handled through the URL. This option may require additional up front work as the URLs will need to be altered but it does create a clear system for indicating which configuration is being used. As iv-verify currently utalizes a high degree of static rendering which can be easier done on by URL.

## Consequences

...