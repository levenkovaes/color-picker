import { IColor } from "../components/features/color-picker-canvas/types";
import {
  buildRgb,
  checkDarkColor,
  findBiggestColorRange,
  quantization,
  rgbToHex,
} from "./utils";

describe("rgbToHex", () => {
  test("converts black (0, 0, 0) to #000000", () => {
    expect(rgbToHex(0, 0, 0)).toBe("#000000");
  });

  test("converts white (255, 255, 255) to #ffffff", () => {
    expect(rgbToHex(255, 255, 255)).toBe("#ffffff");
  });

  test("converts red (255, 0, 0) to #ff0000", () => {
    expect(rgbToHex(255, 0, 0)).toBe("#ff0000");
  });

  test("converts green (0, 255, 0) to #00ff00", () => {
    expect(rgbToHex(0, 255, 0)).toBe("#00ff00");
  });

  test("converts blue (0, 0, 255) to #0000ff", () => {
    expect(rgbToHex(0, 0, 255)).toBe("#0000ff");
  });

  test("converts arbitrary color (173, 216, 230) to #add8e6", () => {
    expect(rgbToHex(173, 216, 230)).toBe("#add8e6");
  });

  test("converts arbitrary color (128, 64, 32) to #804020", () => {
    expect(rgbToHex(128, 64, 32)).toBe("#804020");
  });

  test("handles single-digit hex values (13, 9, 5) to #0d0905", () => {
    expect(rgbToHex(13, 9, 5)).toBe("#0d0905");
  });
});

describe("buildRgb", () => {
  test("extracts RGB values from image data", () => {
    const imageData = new Uint8ClampedArray([
      255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 255, 255,
    ]);
    const expectedOutput = [
      { r: 255, g: 0, b: 0 },
      { r: 0, g: 255, b: 0 },
      { r: 0, g: 0, b: 255 },
    ];
    expect(buildRgb(imageData)).toEqual(expectedOutput);
  });

  test("returns an empty array for empty input", () => {
    expect(buildRgb(new Uint8ClampedArray([]))).toEqual([]);
  });
});

describe("checkDarkColor", () => {
  test("identifies black (#000000) as dark", () => {
    expect(checkDarkColor("#000000")).toBeTruthy();
  });

  test("identifies white (#ffffff) as not dark", () => {
    expect(checkDarkColor("#ffffff")).toBeFalsy();
  });

  test("identifies dark gray (#333333) as dark", () => {
    expect(checkDarkColor("#333333")).toBeTruthy();
  });

  test("identifies light gray (#cccccc) as not dark", () => {
    expect(checkDarkColor("#cccccc")).toBeFalsy();
  });

  test("identifies red (#ff0000) as dark", () => {
    expect(checkDarkColor("#ff0000")).toBeTruthy();
  });

  test("identifies red (#ff0000) as not dark with lower threshold", () => {
    expect(checkDarkColor("#ff0000", 50)).toBeFalsy();
  });

  test("identifies blue (#0000ff) as dark", () => {
    expect(checkDarkColor("#0000ff")).toBeTruthy();
  });

  test("identifies a custom threshold (100) for dark color", () => {
    expect(checkDarkColor("#777777", 100)).toBeFalsy();
  });
});

describe("findBiggestColorRange", () => {
  test("returns 'r' when red has the biggest range", () => {
    const colors: IColor[] = [
      { r: 10, g: 50, b: 50 },
      { r: 200, g: 50, b: 50 },
      { r: 100, g: 50, b: 50 },
    ];
    expect(findBiggestColorRange(colors)).toBe("r");
  });

  test("returns 'g' when green has the biggest range", () => {
    const colors: IColor[] = [
      { r: 50, g: 10, b: 50 },
      { r: 50, g: 200, b: 50 },
      { r: 50, g: 100, b: 50 },
    ];
    expect(findBiggestColorRange(colors)).toBe("g");
  });

  test("returns 'b' when blue has the biggest range", () => {
    const colors: IColor[] = [
      { r: 50, g: 50, b: 10 },
      { r: 50, g: 50, b: 200 },
      { r: 50, g: 50, b: 100 },
    ];
    expect(findBiggestColorRange(colors)).toBe("b");
  });

  test("returns 'r' when multiple colors have the same max range (prefers r > g > b)", () => {
    const colors: IColor[] = [
      { r: 10, g: 10, b: 50 },
      { r: 200, g: 200, b: 50 },
      { r: 100, g: 100, b: 50 },
    ];
    expect(findBiggestColorRange(colors)).toBe("r");
  });

  test("handles a single color correctly", () => {
    const colors: IColor[] = [{ r: 100, g: 100, b: 100 }];
    expect(findBiggestColorRange(colors)).toBe("r"); // Default when all ranges are 0
  });

  test("handles an empty array", () => {
    const colors: IColor[] = [];
    expect(findBiggestColorRange(colors)).toBe("r");
  });
});

describe("quantization", () => {
  test("returns a single averaged color when max depth is reached", () => {
    const colors: IColor[] = [
      { r: 10, g: 20, b: 30 },
      { r: 40, g: 50, b: 60 },
    ];
    expect(quantization(colors, 4)).toEqual([{ r: 25, g: 35, b: 45 }]);
  });

  test("returns an empty array when input is empty", () => {
    expect(quantization([], 0)).toEqual([]);
  });

  test("splits colors into two groups and continues recursion", () => {
    const colors: IColor[] = [
      { r: 10, g: 10, b: 10 },
      { r: 20, g: 20, b: 20 },
      { r: 30, g: 30, b: 30 },
      { r: 40, g: 40, b: 40 },
    ];
    expect(quantization(colors, 2).length).toBe(1);
  });
});
