import { drawCircle } from '../utils/shapes';
import { BASIC_ANGULAR_VELOCITY } from '../utils/config';
import CelestialBody from './CelestialBody';

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

export default class Planet extends CelestialBody {
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
    super({
      radius,
      rotationDirection,
      rotationAngle,
      rotationVelocity,
      color,
      patternSrc,
    });
    this.orbitRadius = orbitRadius;
    this.revolutionAngle = revolutionAngle;
    this.revolutionVelocity = BASIC_ANGULAR_VELOCITY * orbitRadius ** -1.5; // Kepler's third law of planetary motion

    setInterval(() => {
      this.move(this.revolutionVelocity / 30); // 30 FPS
    }, 33);
  }

  /** 0 ~ 100 */
  private orbitRadius: number;

  /** 0 ~ 2 * Math.PI */
  private revolutionAngle: number;

  /** revolution angular velocity */
  private revolutionVelocity: number;

  private move(angle: number) {
    this.revolutionAngle += angle;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    drawCircle(ctx, 0, 0, this.orbitRadius, {
      color: '#fff1',
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
        shadow: this.orbitRadius,
      },
    );
  }
}
