<<<<<<< HEAD
# spfx-pnp-js-example

## Summary

Short summary on functionality and used technologies.

[picture of the solution in action, if possible]

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.16.1-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

> Any special pre-requisites?

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| folder name | Author details (name, company, twitter alias with link) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.1     | March 10, 2021   | Update comment  |
| 1.0     | January 29, 2021 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

> Include any additional steps as needed.

## Features

Description of the extension that expands upon high-level summary above.

This extension illustrates the following concepts:

- topic 1
- topic 2
- topic 3

> Notice that better pictures and documentation will increase the sample usage and the value you are providing for others. Thanks for your submissions advance.

> Share your web part with others through Microsoft 365 Patterns and Practices program to get visibility and exposure. More details on the community, open-source projects and other activities from http://aka.ms/m365pnp.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
=======
![image](https://user-images.githubusercontent.com/23434451/218325264-9f89026d-eeb0-43da-ac36-678ab01f88f9.png)

Follow the steps in Microsoft learn Build your first SharePoint client side webpart and check you Webpart is functioning correctly with the workbench.<br/>

The toolchain configuration used in this example:<br/>

Node version: v.14.15.1<br/>
NPM version: 6.14.8<br/>
SharePoint framework version: 1.16.0<br/>
PnP version: 3.9.0<br/>
The UI in this post will be developed with Office-Fabric, although fluent is better and will be included in a future post. As a React newbie I chose to split my webpart in three components:

HeroApp is the container App for the Other two components<br/>
HeroEdit is the Edit form for the three fields and has a submit button<br/>
HeroLine prints out a line for each List item and contains two buttons<br/>

For each of the three components the Props are defined in a seperate interface file. HeroEditProps and HeroLineProps declare their add, change and delete functions which are defined in HeroApp and passed down.<br/>

IResponseHero.ts contains the structure for an item that is returned from a SharePoint list, Demolist. Please note that the interfaces are plain Typescript and the components are TSX. A TSX file is a TypeScript (.TS) file written using JSX React syntax.




>>>>>>> f5308cfce13dfa1aa1554ae1f35cee26afc3b37d
