import * as React from 'react';
import { IHeroLineProps } from './IHeroLineProps'
import styles from './PnPjsExample.module.scss';

class HeroLine extends React.Component<IHeroLineProps, any> {
    handleDelete: any;
    handleChange: any;

    constructor(props: any) {
        super(props);
        this.state = {
          stepNumber: 0,
          xIsNext: true,
          //heroState: this.props.heroState
        };

        this.handleDelete = this.props.handleDelete.bind(this);
        this.handleChange = this.props.handleChange.bind(this);
      }

    render() {
        return (
          // <tr className="top-buffer">
            <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row2}`}>
            <div className='ms-Grid-col ms-u-sm1 block'>
            <label className="md-1">{this.props.car.HeroId}</label>
            </div>
            <div className='ms-Grid-col ms-u-sm3 block'>
            <label className="md-1">{this.props.car.Title}</label>
            </div>
            <div className='ms-Grid-col ms-u-sm1 block'>
            <label className="md-1">{this.props.car.Color}</label>
            </div>  
            <div className='ms-Grid-col ms-u-sm3 block'>
            <label className="md-1">{this.props.car.Power}</label>
            </div>           
            <div className='ms-Grid-col ms-u-sm2 block'>
            <a href="#" className={`${styles.button}`} onClick={() => this.handleDelete(this.props.car.HeroId)}>
              <span className={styles.label}>Delete</span>
            </a>
          </div>
          <div className='ms-Grid-col ms-u-sm2 block'>
          <a href="#" className={`${styles.button}`} onClick={() => this.handleChange(this.props.car.HeroId)}>
              <span className={styles.label}>Change</span>
            </a>    
          </div>  
          </div>  
          );
        }
  }

  export default HeroLine;