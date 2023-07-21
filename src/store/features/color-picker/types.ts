export interface IState {
  img: string | File;
  colors: [] | string[];
}

export type IAddColorsAction = string[];
export interface IChangeColorAction {
  index: number;
  color: string;
}
