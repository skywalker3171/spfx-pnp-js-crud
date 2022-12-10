import * as React from 'react';
//import { SPFI } from "@pnp/sp";
import { IHeroEditProps } from './Interfaces/IHeroEditProps';
import styles from './PnPjsExample.module.scss';
//import { IItemAddResult } from '@pnp/sp/items/types';

export interface IWTFState {
    Title: string,
      Power: string,
      HeroState: string,
      HeroId: string,
      Color: string,
      Id: number
  }

class HeroEdit extends React.Component<IHeroEditProps, IWTFState> {
  //private LOG_SOURCE = "🅿PnPjsExample";
  //private LIBRARY_NAME = "Documents";
  //private _sp: SPFI;

  onClick: (heroname: string, superpower: string, heroState: string, heroId: number) => void;
  constructor(props: IHeroEditProps) {
    super(props);
    this.state = {
      Title: props.Title,
      Power: props.Power,
      HeroState: props.HeroState,
      HeroId: props.ID.toString(),
      Color: props.Color,
      Id: props.ID
    };

    this.handleChangeHero = this.handleChangeHero.bind(this);
    this.handleChangePower = this.handleChangePower.bind(this);
    this.onClick = this.props.onClick.bind(this);
  }

  handleChangeHero(event: any) : void{
    this.setState({ Title: event.target.value });
  }

  
  handleChangePower(event: any) : void{
    this.setState({ Power: event.target.value });
  }

  componentWillReceiveProps(nextProps: IHeroEditProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    this.setState({ 
        HeroState: nextProps.HeroState,
        Id: nextProps.HeroId,
        Title: nextProps.Title, 
        Power: nextProps.Power });
  }


  render() {
    return (    
      <div className={styles.container}>
        <div className={`ms-Grid-row ${styles.row}`}>
          <div className='ms-Grid-col ms-u-sm1 block'>
            <label>Name </label>
            </div>
            <div className='ms-Grid-col ms-u-sm3 block'>
            <input type="text" placeholder="Superhero" name="heroname" value={this.state.Title} onChange={this.handleChangeHero} />
          </div>
          <div className='ms-Grid-col ms-u-sm1 block'>
            <label>Power</label>
            </div>
            <div className='ms-Grid-col ms-u-sm3 block'>
            <input type="text" placeholder="Superpower" name="superpower" value={this.state.Power} onChange={this.handleChangePower} />
          </div>
          <div className='ms-Grid-col ms-u-sm2 block'>
            <label> </label>
          </div>
          <div className='ms-Grid-col ms-u-sm2 block'>
            <a href="#" className={`${styles.button} `} onClick={() => this.onClick(this.state.Title, this.state.Power, this.state.HeroState, this.state.Id)}>
              <span className={styles.label}>Save</span>
            </a>
          </div>
        </div>

        <div className={`ms-Grid-row ${styles.row}`}>
          <div className='ms-Grid-col ms-u-sm1 block'>
            <label>
              Color
            </label>
            </div>
            <div className='ms-Grid-col ms-u-sm3 block'>
            <label>
              <input type="text" placeholder="Color" name="Color" value={this.state.Color} />
            </label>
          </div>
          <div className='ms-Grid-col ms-u-sm1 block'>
            <label>
              ID
            </label>
          </div>
          <div className='ms-Grid-col ms-u-sm3 block'>
              <input type="text" placeholder="Id" name="Id" value={this.state.Id} />
          </div>
          
        </div>
      </div>
    );
  }

  
}

export default HeroEdit;