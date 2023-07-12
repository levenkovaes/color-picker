import React, { useEffect, useRef } from "react";

import useWindowDimensions from "../../../utils/utils";
import { SCanvas } from "./styled";

export const PlaygroundCanvas = () => {
  const canvasRef = useRef(null);

  const { height, width } = useWindowDimensions();
  const canvasWidth = width;
  const canvasHeight = height;
  // const canvasWidth = (width * 70) / 100;
  // const canvasHeight = (height * 70) / 100;

  useEffect(() => {
    const colors = [
      "#f6ffe8",
      "#8a9b6e",
      "#354733",
      "#f3f3fb",
      "#926e9c",
      "#48304f",
    ];

    const canvas: any = canvasRef.current;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

    function Ball(this: any) {
      this.radius = Math.floor(Math.random() * (70 - 10 + 1) + 10);
      this.x = Math.floor(
        Math.random() * (canvasWidth - this.radius - this.radius + 1) +
          this.radius
      );
      this.y = Math.floor(
        Math.random() * (canvasHeight - this.radius - this.radius + 1) +
          this.radius
      );
      this.vx = Math.floor(Math.random() * (4 - -4 + 1) + -4) || 2;
      this.vy = Math.floor(Math.random() * (4 - -4 + 1) + -4) || 2;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      };
    }
    // const ball = new (Ball as any)();
    console.log(canvas.width);

    let ballArr: any = [];

    for (
      let i = 0;
      i <=
      Math.floor(
        Math.random() * (canvas.width / 35 - canvas.width / 100 + 1) +
          canvas.width / 100
      );
      i++
    ) {
      ballArr.push(new (Ball as any)());
    }

    const draw: FrameRequestCallback = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      ballArr.forEach((ball: any) => {
        ball.draw();
        ball.x += ball.vx;
        ball.y += ball.vy;
        if (
          ball.y + ball.vy + ball.radius > canvas.height ||
          ball.y + ball.vy - ball.radius < 0
        ) {
          ball.vy = -ball.vy;
        }
        if (
          ball.x + ball.vx + ball.radius > canvas.width ||
          ball.x + ball.vx - ball.radius < 0
        ) {
          ball.vx = -ball.vx;
        }
      });

      window.requestAnimationFrame(draw);

      // ctx.fill(circle);

      // ctx.beginPath();
      // ctx.arc(
      //   Math.floor(Math.random() * canvasWidth),
      //   Math.floor(Math.random() * canvasHeight),
      //   Math.floor(Math.random() * (70 - 10 + 1) + 10),
      //   0,
      //   Math.PI * 2,
      //   false
      // );
      // ctx.fill();

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

      // window.requestAnimationFrame(draw);
    };

    // draw();

    window.requestAnimationFrame(draw);
  }, [width, height, canvasWidth, canvasHeight]);

  return (
    <SCanvas
      ref={canvasRef}
      alt="PlaygroundCanvas"
      width={canvasWidth}
      height={canvasHeight}
    ></SCanvas>
  );
};
