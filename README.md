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




