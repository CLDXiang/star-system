import { length, coordinateCenterNormal } from './canvas';

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  xPercentage: number,
  yPercentage: number,
  radiusPercentage: number,
  style?: {
    color?: string;
    stroke?: boolean;
    patternImg?: HTMLImageElement;
  },
): void => {
  ctx.save();

  if (style?.color) {
    if (style?.stroke) {
      ctx.strokeStyle = style.color;
    } else {
      ctx.fillStyle = style.color;
    }
  } else if (style?.patternImg) {
    // https://stackoverflow.com/questions/13960564/resize-an-imagewith-javascript-for-use-inside-a-canvas-createpattern
    const patternCanvas = document.createElement('canvas');
    const pCtx = patternCanvas.getContext('2d');
    if (pCtx) {
      const size = length(radiusPercentage * 2);
      patternCanvas.width = size;
      patternCanvas.height = size;
      pCtx.drawImage(
        style.patternImg,
        0,
        0,
        style.patternImg.width,
        style.patternImg.height,
        0,
        0,
        size,
        size,
      );
      const pattern = ctx.createPattern(patternCanvas, 'repeat-x');
      if (pattern) {
        ctx.fillStyle = pattern;
      }
    }
  }

  ctx.beginPath();
  ctx.arc(
    ...coordinateCenterNormal(xPercentage, yPercentage),
    length(radiusPercentage),
    0,
    2 * Math.PI,
  );
  if (style?.stroke) {
    ctx.stroke();
  } else if (style?.patternImg) {
    // https://stackoverflow.com/questions/7698949/moving-the-start-position-of-canvas-pattern
    ctx.save();
    const [xCenter, yCenter] = coordinateCenterNormal(
      xPercentage - radiusPercentage * 2,
      yPercentage + radiusPercentage * 2,
    );
    ctx.translate(xCenter, yCenter);
    ctx.fill();
    ctx.restore();
  } else {
    ctx.fill();
  }

  ctx.restore();
};
