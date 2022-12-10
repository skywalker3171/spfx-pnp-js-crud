import * as React from 'react';
import HeroEdit from './HeroEdit';
import styles from './PnPjsExample.module.scss';

//import { Caching, ICachingProps  } from "@pnp/queryable";
import { IHeroAppProps } from './Interfaces/IHeroAppProps';
import { IResponseHeroItem } from './interfaces';
import { Logger, LogLevel } from '@pnp/logging';
import HeroLine from './HeroLine';
import { SPFI  } from '@pnp/sp'; //t5
import { getSP } from '../pnpjsConfig';
import { IItemAddResult } from '@pnp/sp/items/types';

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
    HeroId: string;
    Power: string;
    Color: string;
}

export default class HeroApp extends React.Component<IHeroAppProps, IIHeroAppState> {
  LOG_SOURCE: any;
  private _sp: SPFI;
  //private myiar: IItemAddResult;

  constructor(props: IHeroAppProps) {
    super(props);
    this.state = {
      heroItems: Array(1).fill({ Title: "Flash", Power: "Speed", Color: "white", HeroId: Math.random().toString(36).substr(2, 6) }),
      items: [],
      errors: [],
      HeroState: null,
      Title: null,
      Power: null,
      Color: null,
      HeroId: null
    };

    this._sp = getSP();
  }

  handleclick (heroname: string, superpower: string, color: string, heroState: string, Id: number) {
    
    if (this.state.HeroState == 'Add') {
      this.setState({
        heroItems: this.state.heroItems.concat({
          Title: heroname,
          Power: superpower,
          Color: color,
          HeroId: 123,
          ID:0
        }),
        Title: '',
        Power: '',
        HeroId: ''
      });

      this._createItem(heroname, superpower, color, Id);
    }
    else {
      this.setState({
        heroItems: this.state.heroItems.map((i: IResponseHeroItem) => (i.ID == Id ? Object.assign({}, i, {
          Title: heroname,
          Power: superpower,
          Color: color,
          HeroId: Id,
          Id: Id
        }) : i)),

        HeroState: 'Add',
        Title: '',
        Power: '',
        HeroId: ''
      });

      //this._readAllHeroItems();
    }
  }

  handleDelete(Id: number) {
    this.setState((prevState: { heroItems: any[]; }) => ({ heroItems: this.state.heroItems.filter((obj) => {return obj.HeroId !== Id;}) }));
  }

  handleChange(Id: number) {  
    this.setState({
      Title: this.state.heroItems.filter((obj) => {return obj.ID == Id;})[0].Title,
      Power: this.state.heroItems.filter((obj) => {return obj.ID == Id;})[0].Power,
      Color: this.state.heroItems.filter((obj) => {return obj.ID == Id;})[0].Color,
      HeroState: 'Edit',
      HeroId: Id.toString(),
    });
  }

  render() {
    console.log('started render');
    return (
        <div className={styles.reactCrud}>
          <input type="text" value={this.state.HeroState} />
            <HeroEdit Title={this.state.Title}
                HeroState={this.state.HeroState}
                Power={this.state.Power}
                Color={this.state.Color}
                HeroId={+this.state.HeroId}
                ID={+this.state.HeroId}
                onClick={(heroname: string, superpower: string, color: string, heroState: string, Id: number) => this.handleclick(heroname, superpower, color, heroState, Id)}>
            </HeroEdit>

            <div className={styles.container}>
                {this.state.heroItems.map((i: IResponseHeroItem) => {
                    return <HeroLine car={i}
                        handleDelete={(Id: number) => this.handleDelete(Id)}
                        handleChange={(Id: number) => this.handleChange(Id)}>
                    </HeroLine>;
                })}
            </div>
        </div>
    );
  }

  public componentDidMount(): void {
    // read all file sizes from Documents library
    console.log('started componentDidMount');
    this._readAllHeroItems();
    console.log('end componentDidMount');
  }

  private _readAllHeroItems = async (): Promise<void> => {
    try {
       //const spCache = spfi(this._sp).using(Caching(cacheProps));

       console.log('started _readAllHeroItems');
      const response: IResponseHeroItem[] = await this._sp.web.lists
        .getByTitle("Demolist")
        .items
        .select("Id", "Title", "Color", "Power", "HeroID")();

      // use map to convert IResponseItem[] into our internal object IFile[]
      const items: IResponseHeroItem[] = response.map((item: IResponseHeroItem) => {
        return {
          ID: item.ID,
          HeroId: item.ID,
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
        Color: Color,
        HeroID: HeroId
      });
      
      console.log(iar);
      await this._readAllHeroItems();

    } catch (err) {
      console.warn(err);
      //Logger.write(`${this.LOG_SOURCE} (_createItem) - ${JSON.stringify(err)} - `, LogLevel.Error);
    }
  }
}

