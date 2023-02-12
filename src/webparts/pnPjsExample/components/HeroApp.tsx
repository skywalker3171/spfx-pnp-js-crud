import * as React from 'react';
//import styles from './PnPjsHero.module.scss';

import { SPFI  } from '@pnp/sp'; 
import { getSP } from '../pnpjsConfig';
import { IHeroAppProps } from './Interfaces/IHeroAppProps';
import { IResponseHeroItem } from './Interfaces/IResponseHero';
import { Logger, LogLevel } from '@pnp/logging';
//import { Caching, ICachingProps  } from "@pnp/queryable";
import { IItemAddResult, IItemUpdateResult } from '@pnp/sp/items/types';

//import HeroLine from './HeroLine';
import HeroEdit from './HeroEdit';

import { DetailsList, DetailsListLayoutMode} from '@fluentui/react/lib/DetailsList'; //, Selection, IColumn 
import { Button } from '@fluentui/react-components';
export interface IReactCrudWebPartProps {
  listName: string;
}

// const cacheProps: ICachingProps = {
//     store: "session"
// };

export interface IIHeroAppState {
    heroItems: IResponseHeroItem[];
    items: IResponseHeroItem[];
    errors: string[];
    HeroState: string;
    Title: string;
    Power: string;
    Color: string;
    ID: number;
}

export default class HeroApp extends React.Component<IHeroAppProps, IIHeroAppState> {
  LOG_SOURCE: any;
  private _sp: SPFI;
  //private myiar: IItemAddResult;

  _columns = [
    { key: 'column1', name: 'Title', fieldName: 'Title', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column2', name: 'Power', fieldName: 'Power', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column3', name: 'Color', fieldName: 'Color', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column4', name: '', fieldName: '', minWidth: 100, maxWidth: 200, isResizable: true, 
      onRender: (item: IResponseHeroItem) => (
        <Button appearance="primary" onClick={() => this.handleDelete(item.ID)}>Delete</Button>
    ),},
    { key: 'column5', name: '', fieldName: '', minWidth: 100, maxWidth: 200, isResizable: true, 
      onRender: (item: IResponseHeroItem) => (
        <Button appearance="primary" onClick={() => this.handleChange(item.ID)}>Change</Button>
    ),},
    
  ];

  constructor(props: IHeroAppProps) {
    super(props);
    this.state = {
      heroItems: Array(1).fill({ Title: "Flash", Power: "Speed", Color: "Blue"}),
      items: [],
      errors: [],
      HeroState: null,
      Title: null,
      Power: null,
      Color: null,
      ID: 0,
    };

    this._sp = getSP();
  }

  public componentDidMount(): void {
    // read all file sizes from Documents library
    console.log('started componentDidMount');
    this._readAllHeroItems();
    console.log('end componentDidMount');
  }

  handleclick (heroname: string, superpower: string, color: string, heroState: string, Id: number) {
    
    if (this.state.HeroState == 'Add') {
      this.setState({
        heroItems: this.state.heroItems.concat({
          Title: heroname,
          Power: superpower,
          Color: color,
          ID: 0
        }),
        Title: '',
        Power: '',
      });

      this._createItem(heroname, superpower, color, Id);
    }
    else {
      this.setState({
        heroItems: this.state.heroItems.map((i: IResponseHeroItem) => (i.ID == Id ? Object.assign({}, i, {
          Title: heroname,
          Power: superpower,
          Color: color,
          ID: Id
        }) : i)),

        HeroState: 'Add',
        Title: '',
        Power: '',
      });

      this._updateTitle(heroname, superpower, color, Id);
    }
  }

  handleDelete(Id: number) {
    this.setState((prevState: { heroItems: any[]; }) => ({ heroItems: this.state.heroItems.filter((obj) => {return obj.ID !== Id;}) }));
    this._deleteTitle(Id);
  }

  handleChange(Id: number) {  
    this.setState({
      Title: this.state.heroItems.filter((obj) => {return obj.ID == Id;})[0].Title,
      Power: this.state.heroItems.filter((obj) => {return obj.ID == Id;})[0].Power,
      Color: this.state.heroItems.filter((obj) => {return obj.ID == Id;})[0].Color,
      HeroState: 'Edit',
      ID: Id
    });
  }

  render() {
    console.log('started render');
    return (
        <div>  
            {/* <label>{this.props.Listname}</label>       */}
            <HeroEdit Title={this.state.Title}
                HeroState={this.state.HeroState}
                Power={this.state.Power}
                Color={this.state.Color}
                ID={+this.state.ID}
                onClick={(heroname: string, superpower: string, color: string, heroState: string, Id: number) => this.handleclick(heroname, superpower, color, heroState, Id)}>
            </HeroEdit>

           
          <DetailsList
            items={this.state.heroItems}
            columns={this._columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            //selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="select row"
            //onItemInvoked={this._onItemInvoked}
          />
        </div>
    );
  }
 

  private _readAllHeroItems = async (): Promise<void> => {
    try {
      //const spCache = spfi(this._sp).using(Caching(cacheProps));
      //this._sp.using(Caching(cacheProps));

      console.log('started _readAllHeroItems');
      const response: IResponseHeroItem[] = await this._sp.web.lists
        .getByTitle("Demolist")
        .items
        .select("Id", "Title", "Color", "Power")();

      // use map to convert IResponseItem[] into our internal object IFile[]
      const items: IResponseHeroItem[] = response.map((item: IResponseHeroItem) => {
        return {
          ID: item.ID,
          //HeroId: item.ID,
          Title: item.Title || "Unknown",
          Color: item.Color,
          Power: item.Power
        };
      });

      // Add the items to the state
      this.setState({ heroItems: items });
      console.log('state set');
      console.log('state itmes: '+ this.state.heroItems.length);
    } catch (err) {
      Logger.write(`${this.LOG_SOURCE} (_readAllFilesSize) - ${JSON.stringify(err)} - `, LogLevel.Error);
    }
  }

  private _createItem = async (Title: string, Power: string, Color: string, HeroId: number): Promise<void> => {
    try {
      const iar: IItemAddResult = await this._sp.web.lists.getByTitle("Demolist").items.add({
        Title: Title,
        Power: Power,
        Color: Color
        //HeroID: HeroId
      });
      
      console.log(iar);
      await this._readAllHeroItems();

    } catch (err) {
      console.warn(err);
      //Logger.write(`${this.LOG_SOURCE} (_createItem) - ${JSON.stringify(err)} - `, LogLevel.Error);
    }
  }

  private _updateTitle = async (Title: string, Power: string, Color: string, ID: number): Promise<void> => {
    
    try {  
      const iar: IItemUpdateResult = await this._sp.web.lists.getByTitle("Demolist").items.getById(ID).update({
        Title: Title,
        Power: Power,
        Color: Color,
        //HeroID: HeroId
      });

      console.log(iar);
      await this._readAllHeroItems();
    } catch (err) {
      Logger.write(`${this.LOG_SOURCE} (_updateTitles) - ${JSON.stringify(err)} - `, LogLevel.Error);
    }
  }

  private _deleteTitle = async (ID: number): Promise<void> => {
    try {
     
      await this._sp.web.lists.getByTitle("Demolist").items.getById(ID).delete();
      await this._readAllHeroItems();
    } catch (err) {
      Logger.write(`${this.LOG_SOURCE} (_updateTitles) - ${JSON.stringify(err)} - `, LogLevel.Error);
    }
  }
}

