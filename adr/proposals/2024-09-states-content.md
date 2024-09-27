# State Configuration: Content

## Status

Proposed

## Context

iv-verify was designed to support multiple states and benefits. While there is a lot of overlap in the information requested of the end user there are a number of items that are specific to a particular state such as:
 - Copy: Specific text could be required by certain states
 - Numbers/Values: Standard deduction % will be different by state
 - URLs: Linking the user to documentation will be different by state
 - Flow Logic: Some states may require certain screens which will need to be done by configuration

There are three decisions that are proposed in this ADR: Storage of configuration, storage of state specific copy, and routing between configurations. _This ADR addresses content storage. The other two are in another ADR since this one will be decided a little later._

### Storage of state specific copy

Copy used in iv-verify shouuld be configurable by state. Additionally all copy should be able to be translated by the iv-verify i18n system. The decision of how to store the state specific copy is to either store the text in the same file with different keys or in separate files with the same key. In both options a change needs to be made to the `t()` function to look up state specific copy if it exists.

From Tom Dooner ([in PR comment](https://github.com/DSACMS/iv-verify/pull/61#discussion_r1774131228)): We have a site_translation helper that overrides our t function by looking for a .nyc or .ma suffix for the given string, based on which site the user is viewing at the time. It falls back to a .default suffix if the site ID doesn't exist. (e.g.) It works pretty well - I recommend the pattern!

#### Separate file - different keys

In this option the text for state specific copy would be stored together. The `/app/i18n/locales/en/translation.json` file would have keys like: `add_expense_amount_field` and then state specific overrides like: `add_expense_amount_field__or` where "or" is the state key for Oregon. The `t()` function would keep track of which state configuration is being used and look up the state specific key if that doesn't exist it would fallback to the regular key.

#### Separate files - same key

In this option the text for the state specific copy is stored in spearate files such as `/app/i18n/locales/en/or.json`. This file would include keys such as `add_expense_amount_field` that overwrite the values in the `/app/i18n/locales/en/translation.json` file. The `t()` function would first look to the state configuration file before looking to the fallback file. This functionality does not exist in the i18n next infrastructure and would need to be developed.

## Decision
This decision will be held for a little bit as we work on our translation workflows since we won't have an additional state for the foreseeable future. We should prioritize supporting translation over multi-state config at this time. 

The recommendations are as follows:

#### Copy storage

Copy should be stored in the same file but with different keys. This is the easiest option to get up and running.

## Consequences

...