import * as React from 'react';
import styles from './PnPjsExample.module.scss';
import { IPnPjsExampleProps } from './Interfaces/IPnPjsExampleProps';

// import interfaces
import { IFile, IResponseHeroItem, IResponseItem } from "./Interfaces/interfaces";

import { Caching, ICachingProps  } from "@pnp/queryable";
import { getSP } from "../pnpjsConfig";
import { SPFI, spfi } from "@pnp/sp";
import { Logger, LogLevel } from "@pnp/logging";
import { IItemUpdateResult } from "@pnp/sp/items";
import { IItemAddResult } from "@pnp/sp/items";
import { Label, PrimaryButton } from '@microsoft/office-ui-fabric-react-bundle';

export interface IAsyncAwaitPnPJsProps {
  Listname: string;
}

export interface IIPnPjsExampleState {
  heroItems: IResponseHeroItem[];
  items: IFile[];
  errors: string[];
}

const cacheProps: ICachingProps = {
  store: "session"
  };

export default class PnPjsExample extends React.Component<IPnPjsExampleProps, IIPnPjsExampleState> {
  private LOG_SOURCE = "🅿PnPjsExample";
  private LIBRARY_NAME = "Documents";
  private _sp: SPFI;

  constructor(props: IPnPjsExampleProps) {
    super(props);
    // set initial state
    this.state = {
      heroItems: [],
      items: [],
      errors: []
    };
    this._sp = getSP();
  }

  public componentDidMount(): void {
    // read all file sizes from Documents library
    this._readAllFilesSize();
    this._readAllItems();
  }

  public render(): React.ReactElement<IAsyncAwaitPnPJsProps> {
    // calculate total of file sizes
    return (
      <div className={styles.container + styles.pnPjsExample}>
        <Label>Welcome to PnP JS Version 3 Demo!</Label>
        <div className={`ms-Grid-row`}>
          <div className='ms-Grid-col ms-u-sm4 block'>
            <PrimaryButton onClick={this._updateTitles}>Update Item Titles</PrimaryButton>
          </div>
          <div className='ms-Grid-col ms-u-sm4 block'>
            <PrimaryButton onClick={this._createItem}>Add Item</PrimaryButton>
          </div>
        </div>
        <Label>List of documents:</Label>
        <table width="100%">
          <tr>
            <td><strong>Name</strong></td>
            <td><strong>Color</strong></td>
            <td><strong>Power</strong></td>
            <td><strong>Hero Id</strong></td>
          </tr>
          {this.state.heroItems.map((item, idx) => {
            return (
              <tr key={idx}>
                <td>{item.Title}</td>
                <td>{item.Color}</td>
                <td>{item.Power}</td>
                <td>{item.ID}</td>
              </tr>
            );
          })}         
        </table>
        <Label>Welcome to PnP JS Version 3 Demo! {this.props.environmentMessage}</Label>
      </div >
    );
  }

  private _readAllFilesSize = async (): Promise<void> => {
    try {
      // do PnP JS query, some notes:
      //   - .expand() method will retrive Item.File item but only Length property
      //   - .get() always returns a promise
      //   - await resolves proimises making your code act syncronous, ergo Promise<IResponseItem[]> becomes IResponse[]

      //Extending our sp object to include caching behavior, this modification will add caching to the sp object itself
      //this._sp.using(Caching("session"));

      //Creating a new sp object to include caching behavior. This way our original object is unchanged.
      const spCache = spfi(this._sp).using(Caching(cacheProps));

      const response: IResponseItem[] = await spCache.web.lists
        .getByTitle(this.LIBRARY_NAME)
        .items
        .select("Id", "Title", "FileLeafRef", "File/Length")
        .expand("File/Length")();

      // use map to convert IResponseItem[] into our internal object IFile[]
      const items: IFile[] = response.map((item: IResponseItem) => {
        return {
          Id: item.Id,
          Title: item.Title || "Unknown",
          Size: item.File?.Length || 0,
          Name: item.FileLeafRef
        };
      });

      // Add the items to the state
      this.setState({ items });
    } catch (err) {
      Logger.write(`${this.LOG_SOURCE} (_readAllFilesSize) - ${JSON.stringify(err)} - `, LogLevel.Error);
    }
  }

  private _readAllItems = async (): Promise<void> => {
    try {
      // do PnP JS query, some notes:
      //   - .expand() method will retrive Item.File item but only Length property
      //   - .get() always returns a promise
      //   - await resolves proimises making your code act syncronous, ergo Promise<IResponseItem[]> becomes IResponse[]

      //Extending our sp object to include caching behavior, this modification will add caching to the sp object itself
      //this._sp.using(Caching("session"));

      //Creating a new sp object to include caching behavior. This way our original object is unchanged.
      //const spCache = spfi(this._sp).using(Caching(cacheProps));

      const response: IResponseHeroItem[] = await this._sp.web.lists
        .getByTitle("Demolist")
        .items
        .select("Id", "Title", "Color", "Power", "HeroID")();

      // use map to convert IResponseItem[] into our internal object IFile[]
      const items: IResponseHeroItem[] = response.map((item: IResponseHeroItem) => {
        return {
          ID: item.ID,
          HeroId: item.ID,
          Id: item.ID,
          Title: item.Title || "Unknown",
          Color: item.Color,
          Power: item.Power
        };
      });

      // Add the items to the state
      this.setState({ heroItems: items });
    } catch (err) {
      Logger.write(`${this.LOG_SOURCE} (_readAllFilesSize) - ${JSON.stringify(err)} - `, LogLevel.Error);
    }
  }

  private _updateTitles = async (): Promise<void> => {
    try {
      //Will create a batch call that will update the title of each item
      //  in the library by adding `-Updated` to the end.
      const [batchedSP, execute] = this._sp.batched();

      //Clone items from the state
      const items = JSON.parse(JSON.stringify(this.state.items));

      let res: IItemUpdateResult[] = [];

      for (let i = 0; i < items.length; i++) {
        // you need to use .then syntax here as otherwise the application will stop and await the result
        batchedSP.web.lists
          .getByTitle(this.LIBRARY_NAME)
          .items
          .getById(items[i].Id)
          .update({ Title: `${items[i].Name}-Updated` })
          .then(r => res.push(r));
      }
      // Executes the batched calls
      await execute();

      // Results for all batched calls are available
      for (let i = 0; i < res.length; i++) {
        //If the result is successful update the item
        //NOTE: This code is over simplified, you need to make sure the Id's match
        const item = await res[i].item.select("Id, Title")<{ Id: number, Title: string }>();
        items[i].Name = item.Title;
      }

      //Update the state which rerenders the component
      this.setState({ items });
    } catch (err) {
      Logger.write(`${this.LOG_SOURCE} (_updateTitles) - ${JSON.stringify(err)} - `, LogLevel.Error);
    }
  }

  private _createItem = async (): Promise<void> => {
    try {
      const iar: IItemAddResult = await this._sp.web.lists.getByTitle("Demolist").items.add({
        Title: "Howdy Joey",
        Power: "Super Power",
        Color: "Green",
        HeroID: "12345"
      });
      
      console.log(iar);
    } catch (err) {
      Logger.write(`${this.LOG_SOURCE} (_createItem) - ${JSON.stringify(err)} - `, LogLevel.Error);
    }
  }

}