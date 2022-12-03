import { IResponseHeroItem } from "./interfaces";

export interface IHeroLineProps {
  handleDelete: (Id : string)=> void;
  handleChange: (Id : string)=> void;

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