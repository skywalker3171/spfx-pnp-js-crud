import * as React from 'react';
import HeroEdit from './HeroEdit';
import styles from './PnPjsExample.module.scss';

import { Caching, ICachingProps  } from "@pnp/queryable";
import { IHeroAppProps } from './IHeroAppProps';
import { IResponseHeroItem } from './interfaces';
import { Logger, LogLevel } from '@pnp/logging';
import HeroLine from './HeroLine';
import { SPFI, spfi  } from '@pnp/sp';
import { getSP } from '../pnpjsConfig';

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
    heroState: string;
    heroName: string;
    heroId: string;
    superpower: string;
}

export default class HeroApp extends React.Component<IHeroAppProps, IIPnPjsExampleState> {
  LOG_SOURCE: any;
  private _sp: SPFI;

  constructor(props: any) {
    super(props);
    this.state = {
      heroItems: Array(1).fill({ Title: "Fiat", Power: "500", Color: "white", HeroId: Math.random().toString(36).substr(2, 9) }),
      items: [],
      errors: [],
      heroState: null,
      heroName: null,
      superpower: null,
      heroId: null
    };

    this._sp = getSP();
  }

  handleclick (heroname: string, superpower: string, heroState: string, Id: string) {
    //alert('Hello Click')
    // if (this.state.heroState == 'Add') {
    //   this.setState({
    //     heroes: this.state.heroes.concat({
    //       name: heroname,
    //       power: superpower,
    //       color: "blue",
    //       Id: Math.random().toString(36).substr(2, 9)
    //     }),
    //     heroName: '',
    //     superpower: '',
    //     heroId: ''
    //   });

      
    //   this.createItem(heroname);
    // }
    // else {
    //   //alert(Id)
    //   this.setState({
    //     heroes: this.state.heroes.map((car: { Id: string; }) => (car.Id === Id ? Object.assign({}, car, {
    //       name: heroname,
    //       power: superpower,
    //       color: "yellow",
    //       Id: Id
    //     }) : car)),
    //     heroState: 'Add',
    //     heroName: '',
    //     superpower: '',
    //     heroId: ''
    //   });
    // }
  }

  

  handleDelete(Id: string) {
    //this.setState((prevState: { heroes: any[]; }) => ({ heroes: prevState.heroes.filter((car: { Id: string; }) => car.Id !== Id) }));
  }

  handleChange(Id: string) {  
    // this.setState({
    //   heroName: this.state.heroes.filter((car: { Id: string; }) => car.Id == Id)[0].name,
    //   superpower: this.state.heroes.filter((car: { Id: string; }) => car.Id == Id)[0].power,
    //   heroState: 'Edit',
    //   heroId: Id
    // });
  }

  render() {
    console.log('started render');
    return (
        <div className={styles.reactCrud}>
            <HeroEdit heroname={this.state.heroName}
                onClick={(heroname, superpower, heroState, Id) => this.handleclick(heroname, superpower, heroState, Id)}
                heroState={this.state.heroState}
                superpower={this.state.superpower}
                heroId={this.state.heroId}>
            </HeroEdit>

            <div className={styles.container}>
                {this.state.heroItems.map((i: IResponseHeroItem) => {
                    return <HeroLine car={i}
                        handleDelete={(Id: string) => this.handleDelete(Id)}
                        handleChange={(Id: string) => this.handleChange(Id)} >
                    </HeroLine>;
                })}

                {this.state.heroItems.map((item: IResponseHeroItem, idx:number) => {
                    return (
                        <tr key={idx}>
                            <td>{item.Title}</td>
                            <td>{item.Color}</td>
                            <td>{item.Power}</td>
                            <td>{item.HeroId}</td>
                        </tr>
                    );
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
          HeroId: item.HeroId,
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

