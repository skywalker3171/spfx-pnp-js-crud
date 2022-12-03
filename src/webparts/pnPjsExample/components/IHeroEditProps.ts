export interface IHeroEditProps {
  onClick: (heroname: string, superpower: string, heroState: string, heroId: string) => void;
  heroname: string;
  superpower: string;
  heroState: string;
  heroId: string;
}