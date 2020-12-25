import { drawCircle } from '../utils/shapes';
import { BASIC_ANGULAR_VELOCITY } from '../utils/config';

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
    this.velocity = BASIC_ANGULAR_VELOCITY * orbitRadius ** -1.5; // Kepler's third law of planetary motion

    setInterval(() => {
      this.move(this.velocity / 30); // 30 FPS
    }, 33);
  }

  /** 0 ~ 100 */
  private orbitRadius: number;

  /** 0 ~ 100 */
  private radius: number;

  /** 0 ~ 2 * Math.PI */
  private angle: number;

  /** angular velocity */
  private velocity: number;

  private color: string;

  private move(angle: number) {
    this.angle += angle;
  }

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
