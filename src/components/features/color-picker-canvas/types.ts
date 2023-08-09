export interface IColor {
  r: number;
  g: number;
  b: number;
}

export type ICoords = {
  x: number;
  y: number;
}[];

export interface ICircle {
  color: string;
  radius: number;
  x: number;
  y: number;
  index: number;
}
