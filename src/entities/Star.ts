import { length } from '../utils/canvas';
import { drawCircle } from '../utils/shapes';

interface StarConstructor {
  radius: number;
  rotationDirection: number;
  rotationAngle?: number;
  rotationVelocity: number;
  color: string;
  patternSrc?: string;
}

// TODO: self rotation
export default class Star {
  constructor({
    radius,
    rotationDirection,
    rotationAngle = 0,
    rotationVelocity,
    color,
    patternSrc,
  }: StarConstructor) {
    this.rotationDirection = rotationDirection;
    this.rotationAngle = rotationAngle;
    this.rotationVelocity = rotationVelocity;
    this.radius = radius;
    this.color = color;
    if (patternSrc) {
      this.patternImg = new Image();
      this.patternImg.src = patternSrc;

      // self rotation
      setInterval(() => {
        this.rotate(this.rotationVelocity / 30); // 30 FPS
      }, 33);
    }
  }

  /** 0 ~ 100 */
  private radius: number;

  /** self rotation direction: rotation angle of texture */
  private rotationDirection: number;

  /** current rotation angle: pixels in the texture image indeed */
  private rotationAngle: number;

  /** how many pixels */
  private rotationVelocity: number;

  private color: string;

  private patternImg: HTMLImageElement | null = null;

  private rotate(angle: number) {
    if (!this.patternImg) {
      return;
    }
    this.rotationAngle += angle;
    // FIXME: better be the width of pattern
    if (this.rotationAngle >= Number.MAX_SAFE_INTEGER / 2) {
      this.rotationAngle -= Number.MAX_SAFE_INTEGER / 2;
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    drawCircle(
      ctx,
      0,
      0,
      this.radius,
      this.patternImg
        ? {
            patternImg: this.patternImg,
            patternPosition: this.rotationAngle,
            patternRotation: this.rotationDirection,
          }
        : { color: this.color },
    );
  }
}
