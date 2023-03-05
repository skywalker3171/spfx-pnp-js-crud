import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'PnPjsExampleWebPartStrings';
//import PnPjsExample from './components/PnPjsExample';
//import { IPnPjsExampleProps } from './components/IPnPjsExampleProps';

import { getSP } from './pnpjsConfig';
//import { IFluentUi9DemoProps } from './components/IFluentUi9DemoProps';
//import FluentUi9Demo from './components/FluentUi9Demo';

import { HeroApp } from './components/HeroApp';
import { IHeroAppProps } from './components/Interfaces/IHeroAppProps';

import { FluentProvider, FluentProviderProps, teamsDarkTheme, teamsLightTheme, webLightTheme, webDarkTheme, Theme } from '@fluentui/react-components';


export interface IPnPjsExampleWebPartProps {
  description: string;
}

export enum AppMode {
  SharePoint, SharePointLocal, Teams, TeamsLocal
}

export interface IPnPjsExampleWebPartProps {
  listname: string;
}

export default class PnPjsExampleWebPart extends BaseClientSideWebPart<IPnPjsExampleWebPartProps> {

  private _isDarkTheme = false;
  //private _environmentMessage: string = '';
  private _appMode: AppMode = AppMode.SharePoint;
  private _theme: Theme = webLightTheme;

  protected async onInit(): Promise<void> {
    //this._environmentMessage = this._getEnvironmentMessage();
    super.onInit();

    //Initialize our _sp object that we can then use in other packages without having to pass around the context.
    //  Check out pnpjsConfig.ts for an example of a project setup file.
    getSP(this.context);
  }

  public render(): void {
    
    let heroAppProps: IHeroAppProps = {
      Title: '',
      Power: '',
      Color: '',
      HeroState: null,
      Id: '1',
      Listname: ''};
    
    const heroelement = HeroApp(heroAppProps); 

    const fluentElement3: React.ReactElement<FluentProviderProps> = React.createElement(
      FluentProvider,
      {
        theme : this._appMode === AppMode.Teams || this._appMode === AppMode.TeamsLocal ? 
                this._isDarkTheme ? teamsDarkTheme : teamsLightTheme : 
                this._isDarkTheme ? webDarkTheme : this._theme
      },
      heroelement
    );

    ReactDom.render([fluentElement3], this.domElement);
  }

  /* private _getEnvironmentMessage(): string {
    if (!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  } */

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;
    this.domElement.style.setProperty('--bodyText', semanticColors.bodyText);
    this.domElement.style.setProperty('--link', semanticColors.link);
    this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered);

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
                PropertyPaneTextField('description', {
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
