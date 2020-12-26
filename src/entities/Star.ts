import { drawCircle } from '../utils/shapes';
import CelestialBody from './CelestialBody';

interface StarConstructor {
  radius: number;
  rotationDirection?: number;
  rotationAngle?: number;
  rotationVelocity: [number, number];
  color: string;
  patternSrc?: string;
}

export default class Star extends CelestialBody {
  constructor({
    radius,
    rotationDirection = 0,
    rotationAngle = 0,
    rotationVelocity,
    color,
    patternSrc,
  }: StarConstructor) {
    super({
      radius,
      rotationDirection,
      rotationAngle,
      rotationVelocity,
      color,
      patternSrc,
    });
  }

  draw(ctx: CanvasRenderingContext2D): void {
    drawCircle(ctx, 0, 0, this.radius, {
      color: this.color,
      patternImg: this.patternImg ?? undefined,
      patternPosition: this.rotationAngle,
      patternRotation: this.rotationDirection,
    });
  }
}
