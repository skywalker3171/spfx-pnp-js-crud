import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import { getSP } from './pnpjsConfig';
import * as strings from 'PnPjsExampleWebPartStrings';
// import PnPjsExample from './components/PnPjsExample';
import HeroApp from './components/HeroApp';
// import { IPnPjsExampleProps } from './components/Interfaces/IPnPjsExampleProps';
import { IHeroAppProps } from './components/Interfaces/IHeroAppProps';

export interface IPnPjsExampleWebPartProps {
  listname: string;
}

export default class PnPjsExampleWebPart extends BaseClientSideWebPart<IPnPjsExampleWebPartProps> {

  // private _isDarkTheme: boolean = false;
  // private _environmentMessage: string = '';

  public render(): void {
    const heroelement: React.ReactElement<IHeroAppProps> = React.createElement(
      HeroApp,
      {
        Title: null,
        Power: null,
        Color: null,
        HeroState: null,
        Listname: this.properties.listname,
        Id: null
      }
    );

    ReactDom.render([heroelement], this.domElement);
  }

  public handleclick(heroname: string, superpower: string, heroState: string, Id: number) : void {
    alert('Hello Click: ' + heroname + superpower + heroState + Id);   
  }

  /**
* Initialize the web part.
*/
public async onInit(): Promise<void> {
  // this._environmentMessage = await this._getEnvironmentMessage();

  await super.onInit();

  //Initialize our _sp object that we can then use in other packages without having to pass around the context.
  // Check out pnpjsConfig.ts for an example of a project setup file.
  getSP(this.context);
}

  

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    //this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('listname', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
