export interface IHeroEditProps {
  onClick: (Title: string, Power: string, heroState: string, ID: number) => void;
    ID: number;
    HeroId: number;
    Title: string;
    Color: string;
    Power: string;
    HeroState: string;
}