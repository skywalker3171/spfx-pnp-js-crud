import * as React from 'react';
import {  useState, useEffect, FC } from 'react';
//import styles from './PnPjsHero.module.scss';

import { SPFI  } from '@pnp/sp'; 
import { getSP } from '../pnpjsConfig';
import { IHeroAppProps } from './Interfaces/IHeroAppProps';
import { IResponseHeroItem } from './Interfaces/IResponseHero';
//import { Logger, LogLevel } from '@pnp/logging';
//import { Caching, ICachingProps  } from "@pnp/queryable";
import { IItemAddResult, IItemUpdateResult } from '@pnp/sp/items/types';

//import HeroLine from './HeroLine';
import HeroEdit from './HeroEdit';

import { DetailsList } from '@fluentui/react/lib/DetailsList'; //, Selection, IColumn //DetailsListLayoutMode
import { Button } from '@fluentui/react-components'; 
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
    Power: string;
    Color: string;
    ID: number;
}

export const HeroApp: FC<IHeroAppProps> = props => {
//export const HeroApp = (props : IHeroAppProps) => {
  //LOG_SOURCE: any;
  _sp: SPFI;
  //private myiar: IItemAddResult;

  const _columns = [
    { key: 'column1', name: 'Title', fieldName: 'Title', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column2', name: 'Power', fieldName: 'Power', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column3', name: 'Color', fieldName: 'Color', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column4', name: '', fieldName: '', minWidth: 100, maxWidth: 200, isResizable: true, 
      onRender: (item: IResponseHeroItem) => (
        <Button appearance="primary" onClick={() => handleDelete(item.ID)}>Delete</Button>
    ),},
    { key: 'column5', name: '', fieldName: '', minWidth: 100, maxWidth: 200, isResizable: true, 
      onRender: (item: IResponseHeroItem) => (
        <Button appearance="primary" onClick={() => handleChange(item.ID)}>Change</Button>
    ),},
    
  ];

  useEffect(() => {
    console.log(`Using Effect`);
    _readAllHeroItems();
}, []);

  const [heroItems, setHeroItems] = useState(Array(1).fill({ Title: "Flash", Power: "Speed", Color: "Blue"}));
  const [heroState, setHeroState] = useState('');
  //const [items, setItems] = useState([]);
  const [Title, setTitle] = useState(null);
  const [Power, setPower] = useState(null);
  const [Color, setColor] = useState(null);
  const [ID, setID] = useState(null);
  const _sp = getSP();

  
  
  const handleclick = async (heroname: string, superpower: string, color: string, heroState: string, Id: number) => {
    
    if (heroState == 'Add') {
     setHeroItems(heroItems.concat({
        Title: heroname,
        Power: superpower,
        Color: color,
        ID: 0
      })); 
      
      await _createItem(heroname, superpower, color, Id);
      
      setID(0);
      setTitle('');
      setPower('');  
      setColor('');
    }
    else {
      setHeroItems(heroItems.map((i: IResponseHeroItem) => (i.ID == Id ? Object.assign({}, i, {
        Title: heroname,
        Power: superpower,
        Color: color,
        ID: Id
      }) : i))); 
      
      await _updateTitle(heroname, superpower, color, Id);
      
      setID(0);
      setTitle('');
      setPower('');  
      setColor('');
      setHeroState('Add');
    }
    
    return {};
  }

  const handleDelete = (Id: number) => {
    console.log('handleDelete itmes: '+ heroItems.length);
    setHeroItems(heroItems.filter((obj) => {return obj.ID !== Id;}));
    _deleteTitle(Id);
  }

  const handleChange = (Id: number) => {  
    console.log('handleChange itmes: '+ heroItems.length);
    setTitle(heroItems.filter((obj) => {return obj.ID == Id;})[0].Title);
    setPower(heroItems.filter((obj) => {return obj.ID == Id;})[0].Power);
    setColor(heroItems.filter((obj) => {return obj.ID == Id;})[0].Color);
    setID(Id);
    setHeroState('Change');
  }
  
 
    const _readAllHeroItems = async (): Promise<void> => {
    try {
      //const spCache = spfi(_sp).using(Caching(cacheProps));
      //_sp.using(Caching(cacheProps));

      console.log('started _readAllHeroItems');
      const response: IResponseHeroItem[] = await _sp.web.lists
        .getByTitle("Demolist")
        .items
        .select("Id", "Title", "Color", "Power")();

      // use map to convert IResponseItem[] into our internal object IFile[]
      const items: IResponseHeroItem[] = response.map((item: IResponseHeroItem) => {
        return {
          ID: item.ID,
          //HeroId: item.ID,
          Title: item.Title || "Unknown",
          Color: item.Color,
          Power: item.Power
        };
      });

      // Add the items to the state
      setHeroItems(items);
      console.log('state set');
      console.log('state itmes: '+ heroItems.length);
    } catch (err) {
      //Logger.write(`${LOG_SOURCE} (_readAllFilesSize) - ${JSON.stringify(err)} - `, LogLevel.Error);
    }
  }

   const _createItem = async (Title: string, Power: string, Color: string, HeroId: number): Promise<void> => {
    try {
      const iar: IItemAddResult = await _sp.web.lists.getByTitle("Demolist").items.add({
        Title: Title,
        Power: Power,
        Color: Color
        //HeroID: HeroId
      });
      
      console.log(iar);
      await _readAllHeroItems();

    } catch (err) {
      console.warn(err);
      //Logger.write(`${LOG_SOURCE} (_createItem) - ${JSON.stringify(err)} - `, LogLevel.Error);
    }
  }

  const _updateTitle = async (Title: string, Power: string, Color: string, ID: number): Promise<void> => {
    
    try {  
      const iar: IItemUpdateResult = await _sp.web.lists.getByTitle("Demolist").items.getById(ID).update({
        Title: Title,
        Power: Power,
        Color: Color,
        //HeroID: HeroId
      });

      console.log(iar);
      await _readAllHeroItems();
    } catch (err) {
      //Logger.write(`${LOG_SOURCE} (_updateTitles) - ${JSON.stringify(err)} - `, LogLevel.Error);
    }
  }

  const _deleteTitle = async (ID: number): Promise<void> => {
    try {
     
      await _sp.web.lists.getByTitle("Demolist").items.getById(ID).delete();
      await _readAllHeroItems();
    } catch (err) {
      //Logger.write(`${LOG_SOURCE} (_updateTitles) - ${JSON.stringify(err)} - `, LogLevel.Error);
    }
  } 

  return (
    <div>  
      {/* <label>W T F 2</label>   */}        
        <HeroEdit Title={Title}
            HeroState={heroState}
            Power={Power}
            Color={Color}
            ID={+ID}
            Id={+ID}
            onClick={handleclick}>
        </HeroEdit> 
      
      <DetailsList
        items={heroItems}
        columns={_columns}
        setKey="set"
        /* layoutMode={DetailsListLayoutMode.justified} */
        //selection={_selection}
        selectionPreservedOnEmptyClick={true}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="select row"
        //onItemInvoked={_onItemInvoked}
      /> 
    </div>
);
}



