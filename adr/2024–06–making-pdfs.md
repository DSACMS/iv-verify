# Making PDFs for self-attestation

## Status

Proposed

## Personnel involved in decision
Kate Green, Joe Gasiorek, Yvette White

## Context
[PR](https://github.com/JosephGasiorekUSDS/verify-nextjs/pull/28)

### Overview
In order to submit self attestation forms to states, we anticipate needing to generate a PDF with the users data. This may not be the primary means of submission, but we will probably need to retain this path indefinitely. We do anticipate some states having an API, but others will likely need to have a PDF path as well.

Because of this we need to explore many aspects of generating a PDF. These include:


### Assumptions
For this ADR we will assume:
* MVP requirements take precedence over long-term system requirements but want to gather both so we can make the best short term decisions with the long term in mind

[Image of System flow]
I expect this image to show the system components for MVP with proposed long term components.

### Questions

### Product
- do we envision PDFs being a part of this System long-term or do we expect to phase it out? I expect that we will want to keep it like direct file kept the PDF option even though they had an API to submit to in MeF
- what are requirements for our pilot?
	+ do different benefits have different forms?
	+ how do we handle 0-n number of items?
	+ do we have all the information required?
- what are requirements for the CBV pilot?
	+ 

### Technical
- Will we store the files? Or will we only offer it for download and then deletion?
	+ suggest for the MVP that they're only only available for download so we don't have any server to muck around with
	+ long-term is this a S3 problem storing these PDFs? Or do we just store the data at a point in time to generate the PDF later on? It depends on scale and how often we want to generate PDFs and whether we expect the PDFs to change and we need to make them forward compatible
- what are PDF libraries that we can use?
- what is Nava doing?
	+ wicked_pdf
- how often do we expect to revise the forms? What is the maintenance burden?

### Decision-making criteria
- what are other trade-offs and decisions needed to be made around PDF?
- MVP requirements versus a full system
- flexibility to eventually handle a complex ecosystem of states and forms
	+ multiple states requirements
	+ multiple forms
- mobile first
	+ small file sizes
	+ efficient use of compute
- accessibility: does it build accessible pdfs
- can handle i18n

### Resources
* [dev.to pdf review (2021)](https://dev.to/handdot/generate-a-pdf-in-js-summary-and-comparison-of-libraries-3k0p)
* [byby.dev review (2024)](https://byby.dev/js-pdf-libs)

## Decisions

### Technical

#### Tooling

#### System architecture changes

### Product

#### Layout of document and iterating over it

#### Sharing a pdf service across all products/pilots

### Deferred
* Storage concerns (post-MVP)

## Consequences
