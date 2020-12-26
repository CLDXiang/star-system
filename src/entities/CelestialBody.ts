interface CelestialBodyConstructor {
  radius: number;
  rotationDirection?: number;
  rotationAngle?: number;
  rotationVelocity: [number, number];
  color: string;
  patternSrc?: string;
}

export default abstract class CelestialBody {
  constructor({
    radius,
    rotationDirection = 0,
    rotationAngle = 0,
    rotationVelocity,
    color,
    patternSrc,
  }: CelestialBodyConstructor) {
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
  protected radius: number;

  /** self rotation direction: rotation angle of texture */
  protected rotationDirection: number;

  /** current rotation angle: pixels in the texture image indeed */
  protected rotationAngle: number;

  /** of [rotationAngle, rotationDirection] */
  protected rotationVelocity: [number, number];

  protected color: string;

  protected patternImg: HTMLImageElement | null = null;

  protected rotate(
    rotationAngleIncrement: number,
    rotationDirectionIncrement: number,
  ): void {
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

  abstract draw(ctx: CanvasRenderingContext2D): void;
}
