import { IResponseHeroItem } from "../interfaces";

export interface IHeroLineProps {
  handleDelete: (Id : number)=> void;
  handleChange: (Id : number)=> void;

  // Title: string;
  // Power: string;
  // Color: string;
  // HeroId: string;

  car : IResponseHeroItem //{
  //   Title: string;
  // Power: string;
  // Color: string;
  // HeroId: string;
  // }
}