import { drawCircle } from '../utils/shapes';

interface StarConstructor {
  radius: number;
  rotationDirection?: number;
  rotationAngle?: number;
  rotationVelocity: [number, number];
  color: string;
  patternSrc?: string;
}

// TODO: self rotation
export default class Star {
  constructor({
    radius,
    rotationDirection = 0,
    rotationAngle = 0,
    rotationVelocity,
    color,
    patternSrc,
  }: StarConstructor) {
    this.radius = radius;
    this.rotationDirection = rotationDirection;
    this.rotationAngle = rotationAngle;
    this.rotationVelocity = rotationVelocity;
    this.color = color;
    if (patternSrc) {
      this.patternImg = new Image();
      this.patternImg.src = patternSrc;

      // self rotation
      setInterval(() => {
        this.rotate(
          this.rotationVelocity[0] / 30,
          this.rotationVelocity[1] / 30,
        ); // 30 FPS
      }, 33);
    }
  }

  /** 0 ~ 100 */
  private radius: number;

  /** self rotation direction: rotation angle of texture */
  private rotationDirection: number;

  /** current rotation angle: pixels in the texture image indeed */
  private rotationAngle: number;

  /** of [rotationAngle, rotationDirection] */
  private rotationVelocity: [number, number];

  private color: string;

  private patternImg: HTMLImageElement | null = null;

  private rotate(
    rotationAngleIncrement: number,
    rotationDirectionIncrement: number,
  ) {
    if (!this.patternImg) {
      return;
    }
    this.rotationAngle += rotationAngleIncrement;
    this.rotationDirection += rotationDirectionIncrement;
    // FIXME: better be the width of pattern
    if (this.rotationAngle >= Number.MAX_SAFE_INTEGER / 2) {
      this.rotationAngle -= Number.MAX_SAFE_INTEGER / 2;
    }
    if (this.rotationDirection >= 2 * Math.PI) {
      this.rotationDirection -= 2 * Math.PI;
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
