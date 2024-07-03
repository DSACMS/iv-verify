# Making PDFs for self-attestation

## Status

Proposed

## Personnel involved in decision
Kate Green, Joe Gasiorek, Yvette White

## Context
[PR](https://github.com/DSACMS/iv-verify/pull/28)

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
- Do we envision PDFs being a part of this System long-term or do we expect to phase it out? I expect that we will want to keep it like direct file kept the PDF option even though they had an API to submit to in MeF
- What are requirements for our pilot?
	+ do different benefits have different forms?
	+ how do we handle 0-n number of items?
	+ do we have all the information required?
	+ Are you only creating one pdf or will multiple need to be generated for multiple programs in the pilot
		* I would imagine there will be multiple pdfs generated throughout the entire income gathering processing.
	+ Are there size requirements for the file?
		* We should generate the pdf file in a manner that keeps the size as small as possible.
- What are requirements for the CBV pilot?
- Should there be a content designer to establish the layout of the pdf to make sure the layout is as readable and accessible as possible?
- Will we have different PDFs for English and Spanish? Or will we fill both languages in English?

### Technical
- Will we are following Nava's lead and rendering HTML and exporting to PDF or if for this pilot we are editing PDF files.
	+ Based on some slack conversations (`TODO` link them!), I think we are leaning toward the latter for our pilot. 
	+ I suggest we try something different than Nava to evaluate
- Will we store the files? Or will we only offer it for download and then deletion?
	+ suggest for the MVP that they're only only available for download so we don't have any server to muck around with
	+ long-term is this a S3 problem storing these PDFs? Or do we just store the data at a point in time to generate the PDF later on? It depends on scale and how often we want to generate PDFs and whether we expect the PDFs to change and we need to make them forward compatible
- What are PDF libraries that we can use?
- What is Nava doing?
	+ wicked_pdf
- How often do we expect to revise the forms? What is the maintenance burden?

### Decision-making criteria
- What are other trade-offs and decisions needed to be made around PDF?
- MVP requirements versus a full system
- Flexibility to eventually handle a complex ecosystem of states and forms
	+ multiple states requirements
	+ multiple forms
- Mobile first
	+ small file sizes
	+ efficient use of compute
- Accessibility: does it build accessible pdfs
- Can handle i18n

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
