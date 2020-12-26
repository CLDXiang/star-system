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
    patternRotation?: number;
    patternPosition?: number;
  },
): void => {
  ctx.save();

  if (style?.color) {
    if (style?.stroke) {
      ctx.strokeStyle = style.color;
    } else {
      ctx.fillStyle = style.color;
    }
  }
  if (style?.patternImg && style.patternImg.width && style.patternImg.height) {
    // https://stackoverflow.com/questions/13960564/resize-an-imagewith-javascript-for-use-inside-a-canvas-createpattern
    const patternCanvas = document.createElement('canvas');
    const pCtx = patternCanvas.getContext('2d');
    if (pCtx) {
      const size = length(radiusPercentage * 2);
      patternCanvas.width =
        (size * style.patternImg.width) / style.patternImg.height;
      patternCanvas.height = size;
      pCtx.drawImage(
        style.patternImg,
        0,
        0,
        style.patternImg.width,
        style.patternImg.height,
        0,
        0,
        patternCanvas.width,
        patternCanvas.height,
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
  } else if (
    style?.patternImg &&
    style.patternImg.width &&
    style.patternImg.height
  ) {
    // https://stackoverflow.com/questions/7698949/moving-the-start-position-of-canvas-pattern
    ctx.save();
    const radius = radiusPercentage * 2;
    const pos = style?.patternPosition ?? 0;
    const rotation = style?.patternRotation ?? 0;
    const rotationRadius = (radius ** 2 + (pos + radius) ** 2) ** 0.5;
    const refAngle = Math.atan((radius + pos) / radius) - rotation;

    const [xOffset, yOffset] = coordinateCenterNormal(
      xPercentage - rotationRadius * Math.sin(refAngle),
      yPercentage + rotationRadius * Math.cos(refAngle),
    );
    ctx.translate(xOffset, yOffset);
    if (style?.patternRotation) {
      ctx.rotate(style.patternRotation);
    }
    ctx.fill();
    ctx.restore();
  } else {
    ctx.fill();
  }

  ctx.restore();
};
