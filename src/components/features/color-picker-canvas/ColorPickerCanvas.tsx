import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addColors,
  selectImg,
} from "../../../store/features/color-picker/colorPickerSlice";
// import image from "../../../assets/imgs/image1.jpg";
import useWindowDimensions, {
  buildRgb,
  findBiggestColorRange,
  quantization,
  rgbToHex,
} from "../../../utils/utils";
import { SCanvas } from "./styled";

export const ColorPickerCanvas = () => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();

  const imgSrc = useSelector(selectImg);

  const { height, width } = useWindowDimensions();

  const targetWidth =
    window.innerHeight > window.innerWidth
      ? (width * 80) / 100
      : (width * 60) / 100;
  const targetHeight = (height * 50) / 100;

  const img = new Image();
  // img.crossOrigin = "anonymous";
  img.src = imgSrc;

  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);

  img.addEventListener("load", () => {
    setCanvasSize();
  });

  const setCanvasSize = () => {
    if (img.height > targetHeight || img.width > targetWidth) {
      setCanvasWidth(targetWidth);
      setCanvasHeight((targetWidth / img.width) * img.height);
    } else {
      setCanvasWidth(img.width);
      setCanvasHeight(img.height);
    }
  };

  useEffect(() => {
    const canvas: any = canvasRef.current;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    const img = new Image();
    // img.crossOrigin = "anonymous";
    img.src = imgSrc;

    img.addEventListener("load", () => {
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const rgbArr = buildRgb(imgData);

      const colorsRgb = quantization([...rgbArr], 2);
      const filter = findBiggestColorRange(rgbArr) + "-filter";

      console.log(rgbArr);
      console.log(filter);

      colorsRgb.forEach((color) => {
        console.log(
          rgbArr.findIndex((el) => {
            if (el.r === color.r && el.g === color.g && el.b === color.b) {
              return true;
            }
            return false;
          })
        );
      });

      const colorsIndex = colorsRgb.map(({ r, g, b }) => {
        let index = rgbArr.findIndex((el) => {
          if (el.r === r && el.g === g && el.b === b) {
            return true;
          }
          return false;
        });

        if (index === -1) {
          const filtered2ColorsMatch = rgbArr.filter(
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
            const filtered1ColorMatch = rgbArr.filter(
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

            const newColor = filtered1ColorMatch[0];
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

      const finalColorsRgb = colorsIndex.map((index) => rgbArr[index]);

      console.log(colorsIndex);
      console.log(finalColorsRgb);
      console.log(Math.ceil((rgbArr.length - 1) / canvas.height), canvas.width);

      const colorsHex = finalColorsRgb.map(({ r, g, b }) => rgbToHex(r, g, b));

      const colorsCoords = colorsIndex.map((el) => {
        return {
          x: el % canvas.width,
          y: Math.ceil(el / canvas.width),
        };
      });

      colorsCoords.forEach((el, index) => {
        ctx.beginPath();
        ctx.arc(el.x, el.y, 18, 0, 2 * Math.PI);
        ctx.fillStyle = colorsHex[index];
        ctx.fill();

        ctx.beginPath();
        ctx.arc(el.x, el.y, 18, 0, 2 * Math.PI);
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();
      });

      // //random
      // const pixels = [];

      // for (let i = 0; i < 8; ++i) {
      //   const pixel = ctx.getImageData(
      //     Math.floor(Math.random() * imgWidth),
      //     Math.floor(Math.random() * imgHeight),
      //     1,
      //     1
      //   );
      //   const data = pixel.data;

      //   pixels.push(rgbToHex(data[0], data[1], data[2]));
      // }

      dispatch(addColors(colorsHex));
    });
  }, [
    width,
    height,
    imgSrc,
    dispatch,
    targetHeight,
    targetWidth,
    canvasHeight,
    canvasWidth,
  ]);

  return (
    <SCanvas
      ref={canvasRef}
      alt="PlaygroundCanvas"
      width={canvasWidth || targetWidth}
      height={canvasHeight || targetHeight}
    ></SCanvas>
  );
};
