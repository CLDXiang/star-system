import { drawCircle } from '../utils/shapes';

interface PlanetConstructor {
  orbitRadius: number;
  radius: number;
  angle: number;
  color: string;
}

export default class Planet {
  constructor({ orbitRadius, radius, angle, color }: PlanetConstructor) {
    this.orbitRadius = orbitRadius;
    this.radius = radius;
    this.angle = angle;
    this.color = color;
  }

  /** 0 ~ 100 */
  private orbitRadius: number;

  /** 0 ~ 100 */
  private radius: number;

  /** 0 ~ 2 * Math.PI */
  private angle: number;

  private color: string;

  draw(ctx: CanvasRenderingContext2D): void {
    drawCircle(ctx, 0, 0, this.orbitRadius, '#fff', true);
    drawCircle(
      ctx,
      this.orbitRadius * 2 * Math.cos(this.angle),
      this.orbitRadius * 2 * Math.sin(this.angle),
      this.radius,
      this.color,
    );
  }
}
