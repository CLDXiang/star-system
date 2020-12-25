import { length, coordinateCenterNormal } from './canvas';

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  xPercentage: number,
  yPercentage: number,
  radiusPercentage: number,
  color?: string,
  stroke?: boolean,
): void => {
  ctx.save();

  if (color) {
    if (stroke) {
      ctx.strokeStyle = color;
    } else {
      ctx.fillStyle = color;
    }
  }
  ctx.beginPath();
  ctx.arc(
    ...coordinateCenterNormal(xPercentage, yPercentage),
    length(radiusPercentage),
    0,
    2 * Math.PI,
  );
  if (stroke) {
    ctx.stroke();
  } else {
    ctx.fill();
  }

  ctx.restore();
};
