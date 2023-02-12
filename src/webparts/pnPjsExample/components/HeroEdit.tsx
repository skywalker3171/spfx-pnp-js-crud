import * as React from 'react';
import { IHeroEditProps } from './Interfaces/IHeroEditProps';
//import styles from './PnPjsHero.module.scss';
//import styles from './fluentUi9Demo.module.scss';

import { TextField } from '@fluentui/react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';

import { Button } from '@fluentui/react-components';
//import { Label } from 'office-ui-fabric-react';

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

  stackTokens = { childrenGap: 50 };
  iconProps = { iconName: 'Calendar' };
  stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
  columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

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
      <div style={{paddingLeft:20}}>
      <Stack horizontal tokens={this.stackTokens} styles={this.stackStyles}>
      <Stack {...this.columnProps}>
        <TextField label="Name" name="heroname" value={this.state.Title} onChange={this.handleChangeHero}/>
        <TextField label="Color" name="Color" value={this.state.Color} onChange={this.handleChangeColor}/>
        <Button style={{padding:10}} appearance="primary" onClick={() => this.onClick(this.state.Title, this.state.Power, this.state.Color, this.state.HeroState, this.state.Id)}>Save</Button>     
      </Stack>
      <Stack {...this.columnProps}>
        <TextField label="Power"  name="superpower" value={this.state.Power} onChange={this.handleChangePower}/>
        <TextField label="ID" name="ID" value={this.state.Id.toString()}/>
      </Stack>
    </Stack>
      </div>
    );
  }

  
}

export default HeroEdit;