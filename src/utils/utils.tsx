import { useEffect, useState } from "react";

import { IColor } from "../components/features/color-picker-canvas/types";
import { IWindowDimensions } from "./types";

function getWindowDimensions(): IWindowDimensions {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState<IWindowDimensions>(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

function componentToHex(c: number) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export const buildRgb = (imageData: Uint8ClampedArray) => {
  const rgbValues = [];
  for (let i = 0; i < imageData.length; i += 4) {
    const rgb = {
      r: imageData[i],
      g: imageData[i + 1],
      b: imageData[i + 2],
    };
    rgbValues.push(rgb);
  }
  return rgbValues;
};

const findBiggestColorRange = (rgbValues: IColor[]) => {
  let rMin = Number.MAX_VALUE;
  let gMin = Number.MAX_VALUE;
  let bMin = Number.MAX_VALUE;

  let rMax = Number.MIN_VALUE;
  let gMax = Number.MIN_VALUE;
  let bMax = Number.MIN_VALUE;

  rgbValues.forEach((pixel) => {
    rMin = Math.min(rMin, pixel.r);
    gMin = Math.min(gMin, pixel.g);
    bMin = Math.min(bMin, pixel.b);

    rMax = Math.max(rMax, pixel.r);
    gMax = Math.max(gMax, pixel.g);
    bMax = Math.max(bMax, pixel.b);
  });

  const rRange = rMax - rMin;
  const gRange = gMax - gMin;
  const bRange = bMax - bMin;

  const biggestRange = Math.max(rRange, gRange, bRange);
  if (biggestRange === rRange) {
    return "r";
  } else if (biggestRange === gRange) {
    return "g";
  } else {
    return "b";
  }
};

const quantization = (rgbValues: IColor[], depth: number): IColor[] => {
  const MAX_DEPTH = 4;
  if (depth === MAX_DEPTH || rgbValues.length === 0) {
    const color = rgbValues.reduce(
      (prev, curr) => {
        prev.r += curr.r;
        prev.g += curr.g;
        prev.b += curr.b;

        return prev;
      },
      {
        r: 0,
        g: 0,
        b: 0,
      }
    );

    color.r = Math.round(color.r / rgbValues.length);
    color.g = Math.round(color.g / rgbValues.length);
    color.b = Math.round(color.b / rgbValues.length);
    return [color];
  }

  const componentToSortBy = findBiggestColorRange(rgbValues);
  rgbValues.sort((p1, p2) => {
    return p1[componentToSortBy] - p2[componentToSortBy];
  });

  const mid = rgbValues.length / 2;
  return [
    ...quantization(rgbValues.slice(0, mid), depth + 1),
    ...quantization(rgbValues.slice(mid + 1), depth + 1),
  ];
};

export const checkDarkColor = (c: string, lightness: number = 60) => {
  const color = c.substring(1);
  const rgb = parseInt(color, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  if (luma < lightness) {
    return true;
  }

  return false;
};

export const calculateColorsIndexes = (rgbArr: IColor[]): number[] => {
  const colorsRgb: IColor[] = quantization([...rgbArr], 2);
  const filter: string = findBiggestColorRange(rgbArr) + "-filter";

  return colorsRgb.map(({ r, g, b }) => {
    let index = rgbArr.findIndex((el) => {
      if (el.r === r && el.g === g && el.b === b) {
        return true;
      }
      return false;
    });

    if (index === -1) {
      const filtered2ColorsMatch: IColor[] = rgbArr.filter(
        ({ r: red, g: green, b: blue }) =>
          (red === r && green === g) ||
          (red === r && blue === b) ||
          (green === g && blue === b)
      );

      if (filtered2ColorsMatch.length > 0) {
        const newColor = filtered2ColorsMatch[0];
        index = rgbArr.findIndex((el) => {
          if (
            el.r === newColor.r &&
            el.g === newColor.g &&
            el.b === newColor.b
          ) {
            return true;
          }
          return false;
        });
      }

      if (filtered2ColorsMatch.length === 0) {
        const filtered1ColorMatch: IColor[] = rgbArr.filter(
          ({ r: red, g: green, b: blue }) => {
            switch (filter) {
              case "r-filter":
                return red === r;
              case "g-filter":
                return green === g;
              case "b-filter":
                return blue === b;
              default:
                return red === r;
            }
          }
        );

        const newColor: IColor = filtered1ColorMatch[0];
        index = rgbArr.findIndex((el) => {
          if (
            el.r === newColor.r &&
            el.g === newColor.g &&
            el.b === newColor.b
          ) {
            return true;
          }
          return false;
        });
      }
    }

    return index;
  });
};
