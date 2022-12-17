export interface IHeroEditProps {
  onClick: (Title: string, Power: string, color:string, HeroState: string, ID: number) => void;
    ID: number;
    Title: string;
    Color: string;
    Power: string;
    HeroState: string;
}