import React, { useEffect, useMemo, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  addColors,
  changeColor,
  selectImg,
} from "../../../store/features/color-picker/colorPickerSlice";
import useWindowDimensions, {
  buildRgb,
  calculateColorsIndexes,
  checkDarkColor,
  rgbToHex,
} from "../../../utils/utils";
import { SCanvas } from "./styled";
import { ICircle, IColor, ICoords } from "./types";

export const ColorPickerCanvas: React.FC = () => {
  const canvasRef = useRef(null);
  const dispatch = useAppDispatch();
  const imgSrc = useAppSelector(selectImg);
  const { height, width } = useWindowDimensions();

  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);

  const targetWidth: number =
    height > width ? (width * 80) / 100 : (width * 60) / 100;
  const targetHeight: number = (height * 50) / 100;

  const img = useMemo(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    if (typeof imgSrc === "string") {
      img.src = imgSrc;
    } else {
      let reader = new FileReader();

      reader.readAsDataURL(imgSrc);

      reader.onload = function () {
        img.src = reader.result as string;
      };
    }
    return img;
  }, [imgSrc]);

  img.addEventListener("load", () => {
    setCanvasSize();
  });

  const setCanvasSize = () => {
    if (img.width >= targetWidth && img.width > img.height) {
      setCanvasWidth(targetWidth);
      setCanvasHeight((targetWidth / img.width) * img.height);
      return;
    }
    if (img.height >= targetHeight && img.width <= img.height) {
      setCanvasHeight(targetHeight);
      setCanvasWidth((targetHeight / img.height) * img.width);
      return;
    } else {
      setCanvasWidth(img.width);
      setCanvasHeight(img.height);
    }
  };

  useEffect(() => {
    if (!canvasWidth) return;

    const canvas: any = canvasRef.current;

    if (!canvas) return;

    const ctx: CanvasRenderingContext2D = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

    const imgData: Uint8ClampedArray = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    ).data;
    const rgbArr: IColor[] = buildRgb(imgData);

    const colorsIndex = calculateColorsIndexes(rgbArr);

    const finalColorsRgb: IColor[] = colorsIndex.map((index) => rgbArr[index]);

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
      ctx.strokeStyle = checkDarkColor(el.color, 230) ? "#ffffff" : "#aaaaaa";
      ctx.stroke();
    });

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const bounding = canvas.getBoundingClientRect();
      let x, y;

      if (e.type === "touchstart") {
        const event = e as TouchEvent;
        x = Math.floor(event.touches[0].clientX - bounding.left);
        y = Math.floor(event.touches[0].clientY - bounding.top);
      } else {
        const event = e as MouseEvent;
        x = Math.floor(event.clientX - bounding.left);
        y = Math.floor(event.clientY - bounding.top);
      }

      let target: any = null;

      circles.forEach((el) => {
        if (
          el.x - el.radius < x &&
          x < el.x + el.radius &&
          el.y - el.radius < y &&
          y < el.y + el.radius
        ) {
          target = structuredClone(el);
        }

        if (!target) {
          return;
        }

        function moveAt(x: number, y: number) {
          target.x = x;
          target.y = y;
        }

        function onMouseMove(e: MouseEvent | TouchEvent) {
          e.stopPropagation();

          const bounding = canvas.getBoundingClientRect();

          let x, y;

          if (e.type === "touchmove") {
            const event = e as TouchEvent;
            x = Math.floor(event.touches[0].clientX - bounding.left);
            y = Math.floor(event.touches[0].clientY - bounding.top);
          } else {
            const event = e as MouseEvent;
            x = Math.floor(event.clientX - bounding.left);
            y = Math.floor(event.clientY - bounding.top);
          }

          moveAt(x, y);

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

          const pixel: ImageData = ctx.getImageData(x, y, 1, 1);
          const data: Uint8ClampedArray = pixel.data;
          const color: string = rgbToHex(data[0], data[1], data[2]);

          target.color = color;

          circles = [...circles].map((el) => {
            if (el.index === target?.index) {
              dispatch(changeColor({ index: target.index, color: color }));
              return target;
            }
            return el;
          });

          circles.forEach((el) => {
            ctx.beginPath();
            ctx.arc(el.x, el.y, el.radius, 0, 2 * Math.PI);
            ctx.fillStyle = el.color;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(el.x, el.y, el.radius, 0, 2 * Math.PI);
            ctx.strokeStyle = checkDarkColor(el.color, 230)
              ? "#ffffff"
              : "#aaaaaa";
            ctx.stroke();
          });
        }

        const handleMouseUp = (e: MouseEvent | TouchEvent) => {
          e.stopPropagation();

          canvas.removeEventListener("mousemove", onMouseMove);
          canvas.removeEventListener("mouseup", handleMouseUp);
          canvas.removeEventListener("touchmove", onMouseMove);
          canvas.removeEventListener("touchend", handleMouseUp);
        };

        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mouseup", handleMouseUp);
        canvas.addEventListener("touchmove", onMouseMove);
        canvas.addEventListener("touchend", handleMouseUp);
      });
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("touchstart", handleMouseDown);

    dispatch(addColors(colorsHex));

    // // TODO add random
    // const pixels = [];

    // for (let i = 0; i < 4; ++i) {
    //   const pixel = ctx.getImageData(
    //     Math.floor(Math.random() * canvasWidth),
    //     Math.floor(Math.random() * canvasHeight),
    //     1,
    //     1
    //   );
    //   const data = pixel.data;

    //   pixels.push(rgbToHex(data[0], data[1], data[2]));
    // }

    // console.log(pixels);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("touchstart", handleMouseDown);
    };
  }, [dispatch, canvasHeight, canvasWidth]);

  if (!canvasWidth) return;

  return (
    <SCanvas
      ref={canvasRef}
      alt="canvas"
      width={canvasWidth}
      height={canvasHeight}
    ></SCanvas>
  );
};
