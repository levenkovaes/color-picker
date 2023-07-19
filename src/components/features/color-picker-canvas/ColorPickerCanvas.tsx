import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addColors,
  selectImg,
} from "../../../store/features/color-picker/colorPickerSlice";
// import image from "../../../assets/imgs/image1.jpg";
import useWindowDimensions, {
  buildRgb,
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

      //   console.log(buildRgb(imgData));
      //   console.log(quantization(buildRgb(imgData), 1));

      const colors = quantization(buildRgb(imgData), 1).map((color) =>
        rgbToHex(color.r, color.g, color.b)
      );

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

      dispatch(addColors(colors));
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
