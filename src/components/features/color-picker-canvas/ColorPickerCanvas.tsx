import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addColors,
  changeColor,
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
import { ICircle, IColor, ICoords } from "./types";

export const ColorPickerCanvas = () => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();

  const imgSrc = useSelector(selectImg);

  const { height, width } = useWindowDimensions();

  const targetWidth: number =
    window.innerHeight > window.innerWidth
      ? (width * 80) / 100
      : (width * 60) / 100;
  const targetHeight: number = (height * 50) / 100;

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = imgSrc;

  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);

  img.addEventListener("load", () => {
    setCanvasSize();
  });

  const setCanvasSize = () => {
    if (img.width >= targetWidth && img.width >= img.height) {
      setCanvasWidth(targetWidth);
      setCanvasHeight((targetWidth / img.width) * img.height);
      return;
    }
    if (img.height >= targetHeight && img.width < img.height) {
      setCanvasHeight(targetHeight);
      setCanvasWidth((targetHeight / img.height) * img.width);
      return;
    } else {
      setCanvasWidth(img.width);
      setCanvasHeight(img.height);
    }
  };

  useEffect(() => {
    if (!canvasWidth || !canvasHeight) return;

    const canvas: any = canvasRef.current;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imgSrc;

    img.addEventListener("load", () => {
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

      const imgData: Uint8ClampedArray = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      ).data;
      const rgbArr: IColor[] = buildRgb(imgData);

      const colorsRgb: IColor[] = quantization([...rgbArr], 2);
      const filter: string = findBiggestColorRange(rgbArr) + "-filter";

      const colorsIndex: number[] = colorsRgb.map(({ r, g, b }) => {
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

      const finalColorsRgb: IColor[] = colorsIndex.map(
        (index) => rgbArr[index]
      );

      const colorsHex: string[] = finalColorsRgb.map(({ r, g, b }) =>
        rgbToHex(r, g, b)
      );

      const colorsCoords: ICoords = colorsIndex.map((el) => {
        return {
          x: el % canvas.width,
          y: Math.ceil(el / canvas.width),
        };
      });

      let circles: ICircle[] = [];

      colorsCoords.forEach((coord, index) => {
        circles.push({
          color: colorsHex[index],
          radius: 18,
          x: coord.x,
          y: coord.y,
          index: index,
        });
      });

      circles.forEach((el) => {
        ctx.beginPath();
        ctx.arc(el.x, el.y, el.radius, 0, 2 * Math.PI);
        ctx.fillStyle = el.color;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(el.x, el.y, el.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();
      });

      canvas.addEventListener("mousedown", (e: MouseEvent) => {
        e.preventDefault();

        let target: ICircle;

        circles.forEach((el) => {
          if (
            el.x - el.radius < e.offsetX &&
            e.offsetX < el.x + el.radius &&
            el.y - el.radius < e.offsetY &&
            e.offsetY < el.y + el.radius
          ) {
            target = el;
          }

          if (!target) return;

          function moveAt(x: number, y: number) {
            target.x = x;
            target.y = y;
          }

          function onMouseMove(e: MouseEvent) {
            const bounding = canvas.getBoundingClientRect();
            const x = Math.floor(e.clientX - bounding.left);
            const y = Math.floor(e.clientY - bounding.top);

            moveAt(x, y);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

            const pixel: ImageData = ctx.getImageData(x, y, 1, 1);
            const data: Uint8ClampedArray = pixel.data;
            const color: string = rgbToHex(data[0], data[1], data[2]);

            // console.log(target);

            dispatch(changeColor({ index: target.index, color: color }));

            target.color = color;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

            circles.forEach((el) => {
              ctx.beginPath();
              ctx.arc(el.x, el.y, el.radius, 0, 2 * Math.PI);
              ctx.fillStyle = el.color;
              ctx.fill();

              ctx.beginPath();
              ctx.arc(el.x, el.y, el.radius, 0, 2 * Math.PI);
              ctx.strokeStyle = "#ffffff";
              ctx.stroke();
            });
          }

          canvas.addEventListener("mousemove", onMouseMove);
          canvas.addEventListener("mouseup", () => {
            canvas.removeEventListener("mousemove", onMouseMove);
          });
        });
      });

      // colorsCoords.forEach((el, index) => {
      //   ctx.beginPath();
      //   ctx.arc(el.x, el.y, 18, 0, 2 * Math.PI);
      //   ctx.fillStyle = colorsHex[index];
      //   ctx.fill();

      //   ctx.beginPath();
      //   ctx.arc(el.x, el.y, 18, 0, 2 * Math.PI);
      //   ctx.strokeStyle = "#ffffff";
      //   ctx.stroke();
      // });

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
  }, [imgSrc, dispatch, targetHeight, targetWidth, canvasHeight, canvasWidth]);

  return (
    <SCanvas
      ref={canvasRef}
      alt="PlaygroundCanvas"
      width={canvasWidth || targetWidth}
      height={canvasHeight || targetHeight}
    ></SCanvas>
  );
};
