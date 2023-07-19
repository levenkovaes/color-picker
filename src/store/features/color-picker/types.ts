export interface IState {
  img: string;
  colors: [] | string[];
}

export type IAddColorsAction = string[];
export interface IChangeColorAction {
  index: number;
  color: string;
}
