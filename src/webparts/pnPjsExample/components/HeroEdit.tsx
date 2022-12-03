import * as React from 'react';
import { IHeroEditProps } from './IHeroEditProps';
import styles from './PnPjsExample.module.scss';

export interface IWTFState {
    heroname: string,
      superpower: string,
      heroState: string,
      heroId: string,
      color: string,
      Id: string
  }

class HeroEdit extends React.Component<IHeroEditProps, IWTFState> {
  onClick: (heroname: string, superpower: string, heroState: string, heroId: string) => void;
  constructor(props: IHeroEditProps) {
    super(props);
    this.state = {
      heroname: props.heroname,
      superpower: props.superpower,
      heroState: props.heroState,
      heroId: props.heroId,
      color: "blue",
      Id: "12345"
    };

    //this.handleChangeHero = this.handleChangeHero.bind(this);
    //this.handleChangePower = this.handleChangePower.bind(this);
    //this.onClick = this.props.onClick.bind(this);
  }

  handleChangeHero(event: any) : void{
    this.setState({ heroname: event.target.value });
  }

  
  handleChangePower(event: any) : void{
    this.setState({ superpower: event.target.value });
  }

//   componentWillReceiveProps(nextProps: any) {
//     // You don't have to do this check first, but it can help prevent an unneeded render
//     this.setState({ heroState: nextProps.heroState });
//     this.setState({ heroId: nextProps.heroId });
//     this.setState({ heroname: nextProps.heroname });
//     this.setState({ superpower: nextProps.superpower });
//   }


  render() {
    return (    
      <div className={styles.container}>
        <div className={`ms-Grid-row ${styles.row}`}>
          <div className='ms-Grid-col ms-u-sm1 block'>
            <label>Name </label>
            </div>
            <div className='ms-Grid-col ms-u-sm3 block'>
            <input type="text" placeholder="Superhero" name="heroname" value={this.state.heroname} onChange={this.handleChangeHero} />
          </div>
          <div className='ms-Grid-col ms-u-sm1 block'>
            <label>Power</label>
            </div>
            <div className='ms-Grid-col ms-u-sm3 block'>
            <input type="text" placeholder="Superpower" name="superpower" value={this.state.superpower} onChange={this.handleChangePower} />
          </div>
          <div className='ms-Grid-col ms-u-sm2 block'>
            <label> </label>
          </div>
          <div className='ms-Grid-col ms-u-sm2 block'>
            <a href="#" className={`${styles.button} `} onClick={() => this.onClick(this.state.heroname, this.state.superpower, this.state.heroState, this.state.heroId)}>
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
              <input type="text" placeholder="Id" name="Id" value={this.state.color} />
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