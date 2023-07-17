import React, { useEffect, useRef } from "react";
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

  const { height, width } = useWindowDimensions();

  const canvasWidth = (width * 70) / 100;
  const canvasHeight = (height * 60) / 100;

  const imgSrc = useSelector(selectImg);

  useEffect(() => {
    const canvas: any = canvasRef.current;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    const img = new Image();
    // img.crossOrigin = "anonymous";
    img.src = imgSrc;
    let imgWidth = 0;
    let imgHeight = 0;

    img.addEventListener("load", () => {
      imgWidth = img.width;
      imgHeight = img.height;

      if (img.height > canvas.height || img.width > canvas.width) {
        if (img.height > canvas.height) {
          imgHeight = canvas.height;
          imgWidth = (canvas.height / img.height) * img.width;
        }

        if (imgWidth > canvas.width) {
          imgWidth = canvas.width;
          imgHeight = (canvas.width / img.width) * img.height;
        }
        ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
        // dispatch(updateSize({ width: imgWidth, height: imgHeight }));
      } else {
        ctx.drawImage(img, 0, 0);
        // dispatch(updateSize({ width: img.width, height: img.height }));
      }

      const imgData = ctx.getImageData(0, 0, imgWidth, imgHeight).data;
      const canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;

      const canvasRgbArr = buildRgb(canvasData);
      const rgbArr = buildRgb(imgData);

      // console.log(imgData);
      // console.log(buildRgb(imgData));
      //   console.log(quantization(buildRgb(imgData), 1));

      const colorsRgb = quantization(rgbArr, 2);
      const filter = findBiggestColorRange(rgbArr) + "-filter";

      const colorsIndex = colorsRgb.map(({ r, g, b }) => {
        let index = canvasRgbArr.findIndex((el) => {
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
            index = canvasRgbArr.findIndex((el) => {
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
            index = canvasRgbArr.findIndex((el) => {
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

      const finalColorsRgb = colorsIndex.map((index) => canvasRgbArr[index]);

      const colorsHex = finalColorsRgb.map((color) =>
        rgbToHex(color.r, color.g, color.b)
      );

      const colorsCoords = colorsIndex.map((index) => {
        return {
          x: index % canvasWidth,
          y: Math.floor(index / canvasWidth),
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
      //   const pixels = [];

      //   for (let i = 0; i < 8; ++i) {
      //     const pixel = ctx.getImageData(
      //       Math.floor(Math.random() * imgWidth),
      //       Math.floor(Math.random() * imgHeight),
      //       1,
      //       1
      //     );
      //     const data = pixel.data;

      //     pixels.push(rgbToHex(data[0], data[1], data[2]));
      //   }

      dispatch(addColors(colorsHex));
    });
  }, [canvasWidth, canvasHeight, width, height, imgSrc, dispatch]);

  return (
    <SCanvas
      ref={canvasRef}
      alt="PlaygroundCanvas"
      width={canvasWidth}
      height={canvasHeight}
    ></SCanvas>
  );
};
