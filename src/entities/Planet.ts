import { drawCircle } from '../utils/shapes';
import { BASIC_ANGULAR_VELOCITY } from '../utils/config';

interface PlanetConstructor {
  orbitRadius: number;
  radius: number;
  rotationDirection?: number;
  rotationAngle?: number;
  rotationVelocity: [number, number];
  revolutionAngle: number;
  color: string;
  patternSrc?: string;
}

// TODO: self rotation
export default class Planet {
  constructor({
    orbitRadius,
    radius,
    rotationDirection = 0,
    rotationAngle = 0,
    rotationVelocity,
    revolutionAngle,
    color,
    patternSrc,
  }: PlanetConstructor) {
    this.orbitRadius = orbitRadius;
    this.radius = radius;
    this.rotationDirection = rotationDirection;
    this.rotationAngle = rotationAngle;
    this.rotationVelocity = rotationVelocity;
    this.revolutionAngle = revolutionAngle;
    this.color = color;
    this.revolutionVelocity = BASIC_ANGULAR_VELOCITY * orbitRadius ** -1.5; // Kepler's third law of planetary motion
    if (patternSrc) {
      this.patternImg = new Image();
      this.patternImg.src = patternSrc;
    }

    setInterval(() => {
      this.move(this.revolutionVelocity / 30); // 30 FPS
      this.rotate(this.rotationVelocity[0] / 30, this.rotationVelocity[1] / 30); // 30 FPS
    }, 33);
  }

  /** 0 ~ 100 */
  private orbitRadius: number;

  /** 0 ~ 100 */
  private radius: number;

  /** self rotation direction: rotation angle of texture */
  private rotationDirection: number;

  /** current rotation angle: pixels in the texture image indeed */
  private rotationAngle: number;

  /** of [rotationAngle, rotationDirection] */
  private rotationVelocity: [number, number];

  /** 0 ~ 2 * Math.PI */
  private revolutionAngle: number;

  /** revolution angular velocity */
  private revolutionVelocity: number;

  private color: string;

  private patternImg: HTMLImageElement | null = null;

  private move(angle: number) {
    this.revolutionAngle += angle;
  }

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
    drawCircle(ctx, 0, 0, this.orbitRadius, {
      color: '#fff',
      stroke: true,
    });

    drawCircle(
      ctx,
      this.orbitRadius * 2 * Math.cos(this.revolutionAngle),
      this.orbitRadius * 2 * Math.sin(this.revolutionAngle),
      this.radius,
      {
        color: this.color,
        patternImg: this.patternImg ?? undefined,
        patternPosition: this.rotationAngle,
        patternRotation: this.rotationDirection,
      },
    );
  }
}
