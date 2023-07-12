import React, { useEffect, useRef } from "react";

import useWindowDimensions from "../../../utils/utils";
import { SCanvas } from "./styled";

export const PlaygroundCanvas = () => {
  const canvasRef = useRef(null);

  const { height, width } = useWindowDimensions();
  const canvasWidth = (width * 70) / 100;
  const canvasHeight = (height * 70) / 100;

  const colors = [
    "#f6ffe8",
    "#8a9b6e",
    "#354733",
    "#f3f3fb",
    "#926e9c",
    "#48304f",
  ];

  useEffect(() => {
    const canvas: any = canvasRef.current;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

    const draw: FrameRequestCallback = () => {
      // //rect
      // ctx.fillStyle = "rgb(200, 0, 0)";
      // ctx.fillRect(10, 10, 50, 50);
      // ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
      // ctx.fillRect(30, 30, 50, 50);
      // ctx.strokeStyle = "#fff";
      // ctx.strokeRect(30, 30, 30, 30);
      // ctx.clearRect(20, 20, 10, 10);
      // //rect
      // ctx.fillRect(25, 25, 225, 225);
      // ctx.clearRect(100, 100, 75, 75);
      // ctx.strokeRect(112.5, 112.5, 50, 50);
      // // path
      // ctx.beginPath();
      // ctx.moveTo(100, 200);
      // ctx.lineTo(300, 300);
      // ctx.lineTo(300, 100);
      // ctx.fill();

      // // Filled triangle
      // ctx.beginPath();
      // ctx.moveTo(25, 25);
      // ctx.lineTo(105, 25);
      // ctx.lineTo(25, 105);
      // ctx.fill();

      // // Stroked triangle
      // ctx.beginPath();
      // ctx.moveTo(125, 125);
      // ctx.lineTo(125, 45);
      // ctx.lineTo(45, 125);
      // ctx.closePath();
      // ctx.stroke();

      // //arc
      // ctx.beginPath();
      // ctx.arc(200, 200, 100, 0, Math.PI);
      // ctx.fill();

      // //cubic and quadratic curves
      // ctx.beginPath();
      // ctx.moveTo(200, 200);
      // ctx.quadraticCurveTo(400, 150, 300, 300);
      // ctx.moveTo(300, 300);
      // ctx.bezierCurveTo(50, 400, 300, 600, 400, 400);
      // ctx.stroke();

      ctx.clearRect(0, 0, width, height);
      ctx.save();

      const time = new Date();

      ctx.translate(time.getSeconds() / 20, time.getSeconds() / 20);

      ctx.beginPath();
      ctx.arc(
        Math.floor(Math.random() * canvasWidth),
        Math.floor(Math.random() * canvasHeight),
        Math.floor(Math.random() * (70 - 10 + 1) + 10),
        0,
        Math.PI * 2,
        false
      );
      ctx.fill();

      // ctx.rotate(
      //   ((2 * Math.PI) / 6) * new Date().getSeconds() +
      //     ((2 * Math.PI) / 6000) * new Date().getMilliseconds()
      // );

      // for (let i = 0; i <= Math.floor(Math.random() * (15 - 5 + 1) + 5); i++) {
      //   ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];

      //   ctx.beginPath();
      //   ctx.arc(
      //     Math.floor(Math.random() * canvasWidth),
      //     Math.floor(Math.random() * canvasHeight),
      //     Math.floor(Math.random() * (70 - 10 + 1) + 10),
      //     0,
      //     Math.PI * 2,
      //     false
      //   );
      //   ctx.fill();
      // }

      // ctx.restore();
      // window.requestAnimationFrame(draw);
    };

    // draw();

    window.requestAnimationFrame(draw);
  }, [width, height, canvasWidth, canvasHeight, colors]);

  return (
    <SCanvas
      ref={canvasRef}
      alt="PlaygroundCanvas"
      width={canvasWidth}
      height={canvasHeight}
    ></SCanvas>
  );
};
