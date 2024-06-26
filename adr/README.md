# Architecture design records

## Table of contents
1. [Making PDFs for self-attestation](2024-06-making-pdfs.md)

## Anticipated decisions to be made
From from the initial readme page:

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
	- pdfs (first ADR in progress)
* from building the readme document:
	- having both components translations and Page notions inside of the same directory feels confusing. I wonder if there's a way to make these more clear. I tried to note what each each directory in the `app` directory was up above but we should keep an eye on this and see how easy it is to understand overtime --kate
* from [SNAP recommended deduction](https://github.com/JosephGasiorekUSDS/verify-nextjs/pull/27/files)
	- how do we want to share information with people (discussion for whole team). relates to DF's notions of "bite," "snack," and "meal"