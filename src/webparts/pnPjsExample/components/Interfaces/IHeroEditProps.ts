export interface IHeroEditProps {
  onClick: (Title: string, Power: string, color:string, HeroState: string, ID: number) => {};
    ID: number;
    Title: string;
    Color: string;
    Power: string;
    HeroState: string;
}