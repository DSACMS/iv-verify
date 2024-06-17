# Making PDFs for self-attestation

## Status

Proposed

## Context
[PR](https://github.com/JosephGasiorekUSDS/verify-nextjs/pull/28)
In order to submit self attestation forms to states, we anticipate needing to generate a PDF with the users data. This may not be the primary means of submission, but we will probably need to retain this path indefinitely. We do anticipate some states having an API, but others will likely need to have a PDF path as well.

Because of this we need to explore many aspects of generating a PDF. These include:
- technical decisions
- State requirements
- user constraints
- privacy and security measures
- Number of forms, what's on the forms
- handling large amounts of income Lines on a ledger

Kate's notes:
- Will we store the files? Or will we only offer it for download and then deletion?
	+ suggest for the MVP that they're only only available for download so we don't have any server to muck around with
	+ long-term is this a S3 problem storing these PDFs? Or do we just store the data at a point in time to generate the PDF later on? It depends on scale and how often we want to generate PDFs and whether we expect the PDFs to change and we need to make them forward compatible
- are there any other PDF libraries we want to explore?
- what are other trade-offs and decisions needed to be made around PDF?
- do we envision PDFs being a part of this System long-term or do we expect to phase it out? I expect that we will want to keep it like direct file kept the PDF option even though they had an API to submit to in MeF

From Joe:
- what is Nava doing?
- what are requirements?
	+ do different benefits have different forms?
	+ how do we handle 0-n number of items?
	+ do we have all the information required?

## Decision

What is the change that we're proposing and/or doing?

## Consequences

What becomes easier or more difficult to do because of this change?