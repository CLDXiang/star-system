import './Home.scss';
import { useCallback, useEffect, useRef } from 'react';
import { Canvas } from '../components';
import { clientHeight, clientWidth } from '../utils/canvas';
import { drawCircle } from '../utils/shapes';

const Home: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) {
      return;
    }
    // clear screen
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, clientWidth(), clientHeight());

    // sun
    drawCircle(ctx, 0, 0, 10, 'orange');

    let orbitRadius: number;
    let orbitAngle: number;

    // planet
    orbitRadius = 20;
    orbitAngle = Math.PI / 4;
    drawCircle(ctx, 0, 0, orbitRadius, '#fff', true);
    drawCircle(
      ctx,
      orbitRadius * 2 * Math.cos(orbitAngle),
      orbitRadius * 2 * Math.sin(orbitAngle),
      2,
      'brown',
    );

    // planet
    orbitRadius = 25;
    orbitAngle = (4 * Math.PI) / 5;
    drawCircle(ctx, 0, 0, orbitRadius, '#fff', true);
    drawCircle(
      ctx,
      orbitRadius * 2 * Math.cos(orbitAngle),
      orbitRadius * 2 * Math.sin(orbitAngle),
      3,
      'green',
    );

    // planet
    orbitRadius = 35;
    orbitAngle = (7 * Math.PI) / 6;
    drawCircle(ctx, 0, 0, orbitRadius, '#fff', true);
    drawCircle(
      ctx,
      orbitRadius * 2 * Math.cos(orbitAngle),
      orbitRadius * 2 * Math.sin(orbitAngle),
      2.5,
      'lightblue',
    );

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

export default Home;
