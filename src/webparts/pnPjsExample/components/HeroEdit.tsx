import * as React from 'react';
import {  useState, useEffect, useRef, FC } from 'react';
import { IHeroEditProps } from './Interfaces/IHeroEditProps';
//import styles from './PnPjsHero.module.scss';
//import styles from './fluentUi9Demo.module.scss';

import { TextField } from '@fluentui/react/lib/TextField';
import { Stack } from '@fluentui/react/lib/Stack';

import { Button } from '@fluentui/react-components';
import { Label } from 'office-ui-fabric-react';
//import { Label } from 'office-ui-fabric-react';

export interface IWTFState {
      Title: string,
      Power: string,
      Color: string,
      HeroState: string,
      Id: number
  }

const HeroEdit: FC<IHeroEditProps & IWTFState> = props => {
  const [Title, setTitle] = useState(props.Title);
  const [Power, setPower] = useState(props.Power);
  const [Color, setColor] = useState(props.Color);

  useEffect(() => {
    console.log(`Using Effect in HeroEdit with ID: ` + props.ID.toString());
    setTitle(props.Title);
    setPower(props.Power);
    setColor(props.Color);
}, [props]);

  
  const stackTokens = useRef({
    childrenGap: 50
  });

  const stackStyles = useRef({
    root: {
      width: 650
    }
  });
  const columnProps = useRef({
    tokens: {
      childrenGap: 15
    },
    styles: {
      root: {
        width: 300
      }
    }
  });
  
  const handleChangeHero = (value: string) => {
    setTitle(value);
  };
  const handleChangePower = (value: string) => {
    setPower(value);
  };
  const handleChangeColor = (value: string) => {
    setColor(value);
  };
  
  return (<div style={{
    paddingLeft: 20
  }}>
      <Stack horizontal tokens={stackTokens.current} styles={stackStyles.current}>
      <Stack {...columnProps.current}>
        <TextField label="Name" name="heroname" value={Title} onChange={(e) => handleChangeHero((e.target as HTMLInputElement).value)}  />
        <TextField label="Color" name="Color" value={Color} onChange={(e) => handleChangeColor((e.target as HTMLInputElement).value)} />
        <Button style={{
          padding: 10
        }} appearance="primary" onClick={() => props.onClick(Title, Power, Color, props.HeroState, props.Id)}>Save</Button> 
      </Stack>
      <Stack {...columnProps.current}>
        <TextField label="Power" name="superpower" value={Power} onChange={(e) => handleChangePower((e.target as HTMLInputElement).value)} />
        <TextField readOnly={true} label="ID" name="ID" value={props.Id.toString()} />
        <Label>State: {props.HeroState.toString()} </Label>
      </Stack>
    </Stack>
      </div>);
};

export default HeroEdit;