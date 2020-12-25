import './StarSystem.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Canvas } from '../components';
import { clientHeight, clientWidth } from '../utils/canvas';
import { drawCircle } from '../utils/shapes';
import { Star, Planet } from '../entities';

const StarSystem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starRef = useRef(
    new Star({
      radius: 10,
      color: 'orange',
    }),
  );
  const planetsRef = useRef([
    new Planet({
      orbitRadius: 20,
      radius: 2,
      angle: Math.PI / 4,
      color: 'brown',
    }),
    new Planet({
      orbitRadius: 25,
      radius: 3,
      angle: (4 * Math.PI) / 5,
      color: 'green',
    }),
    new Planet({
      orbitRadius: 35,
      radius: 2.5,
      angle: (7 * Math.PI) / 6,
      color: 'lightblue',
    }),
  ]);

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) {
      return;
    }
    const star = starRef.current;
    const planets = planetsRef.current;
    // clear screen
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, clientWidth(), clientHeight());

    // sun
    star.draw(ctx);

    // planets
    planets.forEach((planet) => planet.draw(ctx));

    requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="home">
      <Canvas ref={canvasRef} />
    </div>
  );
};

export default StarSystem;
