import { drawCircle } from '../utils/shapes';

interface StarConstructor {
  radius: number;
  color: string;
  patternSrc?: string;
}

// TODO: self rotation
export default class Star {
  constructor({ radius, color, patternSrc }: StarConstructor) {
    this.radius = radius;
    this.color = color;
    if (patternSrc) {
      this.patternImg = new Image();
      this.patternImg.src = patternSrc;
    }
  }

  /** 0 ~ 100 */
  private radius: number;

  private color: string;

  private patternImg: HTMLImageElement | null = null;

  draw(ctx: CanvasRenderingContext2D): void {
    drawCircle(
      ctx,
      0,
      0,
      this.radius,
      this.patternImg ? { patternImg: this.patternImg } : { color: this.color },
    );
  }
}
