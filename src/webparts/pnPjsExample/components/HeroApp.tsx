import * as React from 'react';
import HeroEdit from './HeroEdit';
import styles from './PnPjsExample.module.scss';

import { Caching, ICachingProps  } from "@pnp/queryable";
import { IHeroAppProps } from './Interfaces/IHeroAppProps';
import { IResponseHeroItem } from './interfaces';
import { Logger, LogLevel } from '@pnp/logging';
import HeroLine from './HeroLine';
import { SPFI, spfi  } from '@pnp/sp';
import { getSP } from '../pnpjsConfig';
import { IItemAddResult } from '@pnp/sp/items/types';

export interface IReactCrudWebPartProps {
  listName: string;
}

const cacheProps: ICachingProps = {
    store: "session"
};

export interface IIPnPjsExampleState {
    heroItems: IResponseHeroItem[];
    items: IResponseHeroItem[];
    errors: string[];
    HeroState: string;
    Title: string;
    HeroId: string;
    Power: string;
    Color: string;
}

export default class HeroApp extends React.Component<IHeroAppProps, IIPnPjsExampleState> {
  LOG_SOURCE: any;
  private _sp: SPFI;

  constructor(props: any) {
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

  handleclick (heroname: string, superpower: string, heroState: string, Id: number) {
    
    if (this.state.HeroState == 'Add') {
      alert('Hello Click - ADD ' + this.state.HeroState);
      this.setState({
        heroItems: this.state.heroItems.concat({
          Title: heroname,
          Power: superpower,
          Color: "blue",
          HeroId: Math.random(),
          ID: Math.random()
        }),
        Title: '',
        Power: '',
        HeroId: ''
      });

      alert(this.state.HeroState);
      this._createItem();
    }
    else {
      alert('Hello Click - change ' + Id);
      this.setState({
        heroItems: this.state.heroItems.map((i: IResponseHeroItem) => (i.ID == Id ? Object.assign({}, i, {
          Title: heroname,
          Power: superpower,
          Color: "yellow",
          HeroId: Id,
          Id: Id
        }) : i)),

        HeroState: 'Add',
        Title: '',
        Power: '',
        HeroId: ''
      });
      alert(this.state.HeroState);
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
      console.warn(err);
      //Logger.write(`${this.LOG_SOURCE} (_createItem) - ${JSON.stringify(err)} - `, LogLevel.Error);
    }
  }

  handleDelete(Id: number) {
    this.setState((prevState: { heroItems: any[]; }) => ({ heroItems: this.state.heroItems.filter((obj) => {return obj.HeroId !== Id;}) }));
  }

  handleChange(Id: number) {  
    alert(Id);
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
                onClick={(heroname: string, superpower: string, heroState: string, Id: number) => this.handleclick(heroname, superpower, heroState, Id)}>
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
       const spCache = spfi(this._sp).using(Caching(cacheProps));

       console.log('started _readAllHeroItems');
      const response: IResponseHeroItem[] = await spCache.web.lists
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
      console.log('state: '+ this.state.heroItems.length);
    } catch (err) {
      Logger.write(`${this.LOG_SOURCE} (_readAllFilesSize) - ${JSON.stringify(err)} - `, LogLevel.Error);
    }
  }
}

