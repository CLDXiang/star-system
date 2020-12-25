import { length, coordinateCenterNormal } from './canvas';

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  xPercentage: number,
  yPercentage: number,
  radiusPercentage: number,
  color?: string,
) => {
  ctx.save();

  if (color) {
    ctx.fillStyle = color;
  }
  ctx.arc(
    ...coordinateCenterNormal(xPercentage, yPercentage),
    length(radiusPercentage),
    0,
    2 * Math.PI,
  );
  ctx.fill();

  ctx.restore();
};
