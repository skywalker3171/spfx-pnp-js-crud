import * as React from 'react';
import {  useRef, FC } from 'react';
import { IHeroEditProps } from './Interfaces/IHeroEditProps';
//import styles from './PnPjsHero.module.scss';
//import styles from './fluentUi9Demo.module.scss';

import { TextField } from '@fluentui/react/lib/TextField';
import { Stack } from '@fluentui/react/lib/Stack';

import { Button } from '@fluentui/react-components';
//import { Label } from 'office-ui-fabric-react';

export interface IWTFState {
      Title: string,
      Power: string,
      Color: string,
      HeroState: string,
      Id: number
  }

const HeroEdit: FC<IHeroEditProps & IWTFState> = props => {
  //const [Title, setTitle] = useState(props.Title);
  //const [Power, setPower] = useState(props.Power);
  //const [HeroState, setHeroState] = useState(props.HeroState);
  //const HeroState = props.HeroState;
  //const [Color, setColor] = useState(props.Color);
  //const [Id, setId] = useState(props.ID);
  const stackTokens = useRef({
    childrenGap: 50
  });
  /* const iconProps = useRef({
    iconName: 'Calendar'
  }); */
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
  //const onClick = props.onClick;
  /* const handleChangeHero = (value: string) => {
    setTitle(value);
  };
  const handleChangePower = (value: string) => {
    setPower(value);
  };
  const handleChangeColor = (value: string) => {
    setColor(value);
  }; */
  
  return <div style={{
    paddingLeft: 20
  }}>
      <Stack horizontal tokens={stackTokens.current} styles={stackStyles.current}>
      <Stack {...columnProps.current}>
        {/* <TextField label="Name" name="heroname" value={Title} onChange={(e) => handleChangeHero((e.target as HTMLInputElement).value)}  />
        <TextField label="Color" name="Color" value={Color} onChange={(e) => handleChangeColor((e.target as HTMLInputElement).value)} /> */}
        <Button style={{
          padding: 10
        }} appearance="primary" /* onClick={() => onClick(Title, Power, Color, HeroState, props.Id)} */>Save</Button>     
      </Stack>
      <Stack {...columnProps.current}>
        {/* <TextField label="Power" name="superpower" value={Power} onChange={(e) => handleChangePower((e.target as HTMLInputElement).value)} /> */}
        <TextField label="ID" name="ID" value={props.Id.toString()} />
      </Stack>
    </Stack>
      </div>;
};

export default HeroEdit;