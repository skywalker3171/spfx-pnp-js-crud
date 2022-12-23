import * as React from 'react';
import { IHeroEditProps } from './Interfaces/IHeroEditProps';
import styles from './PnPjsHero.module.scss';

export interface IWTFState {
      Title: string,
      Power: string,
      Color: string,
      HeroState: string,
      Id: number
  }

class HeroEdit extends React.Component<IHeroEditProps, IWTFState> {
  //private LOG_SOURCE = "🅿PnPjsExample";
  //private LIBRARY_NAME = "Documents";
  //private _sp: SPFI;

  onClick: (heroname: string, superpower: string, color: string, heroState: string, heroId: number) => void;
  constructor(props: IHeroEditProps) {
    super(props);
    this.state = {
      Title: props.Title,
      Power: props.Power,
      HeroState: props.HeroState,
      Color: props.Color,
      Id: props.ID
    };

    this.handleChangeHero = this.handleChangeHero.bind(this);
    this.handleChangePower = this.handleChangePower.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.onClick = this.props.onClick.bind(this);
  }

  handleChangeHero(event: any) : void{
    this.setState({ Title: event.target.value });
  }

  
  handleChangePower(event: any) : void{
    this.setState({ Power: event.target.value });
  }

   handleChangeColor(event: any) : void{
     this.setState({ Color: event.target.value });
   }

  componentWillReceiveProps(nextProps: IHeroEditProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    this.setState({ 
        HeroState: nextProps.HeroState,
        Id: nextProps.ID,
        Title: nextProps.Title, 
        Power: nextProps.Power,
        Color: nextProps.Color});
  }

  render() {
    return (    
      <div className={styles.container2}>
        <div className={`ms-Grid-row ${styles.row}`}>
          <div className='ms-Grid-col ms-u-sm4 block'>
            Name <br />
            <input type="text" placeholder="Superhero" name="heroname" value={this.state.Title} onChange={this.handleChangeHero} />
          </div>
          <div className='ms-Grid-col ms-u-sm4 block'>
            Power<br />
            <input type="text" placeholder="Superpower" name="superpower" value={this.state.Power} onChange={this.handleChangePower} />
          </div>
          <div className='ms-Grid-col ms-u-sm2 block'>
            <label> </label>
          </div>
          <div className='ms-Grid-col ms-u-sm2 block'>
            <a href="#" className={`${styles.button} `} onClick={() => this.onClick(this.state.Title, this.state.Power, this.state.Color, this.state.HeroState, this.state.Id)}>
              <span className={styles.label}>Save</span>
            </a>
          </div>
        </div>

        <div className={`ms-Grid-row ${styles.row}`}>
          <div className='ms-Grid-col ms-u-sm4 block'>
            Color<br />
            <label>
              <input type="text" placeholder="Color" name="Color" value={this.state.Color} onChange={this.handleChangeColor} />
            </label>
          </div>
          <div className='ms-Grid-col ms-u-sm3 block'>
            <br />
            <label>ID: {this.state.Id} Mode: {this.state.HeroState}</label>
           </div>
          
        </div>
      </div>
    );
  }

  
}

export default HeroEdit;