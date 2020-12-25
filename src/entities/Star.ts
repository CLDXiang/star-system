import { drawCircle } from '../utils/shapes';

interface StarConstructor {
  radius: number;
  color: string;
}

export default class Star {
  constructor({ radius, color }: StarConstructor) {
    this.radius = radius;
    this.color = color;
  }

  /** 0 ~ 100 */
  private radius: number;

  private color: string;

  draw(ctx: CanvasRenderingContext2D): void {
    drawCircle(ctx, 0, 0, this.radius, this.color);
  }
}
