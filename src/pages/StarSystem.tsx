import './StarSystem.scss';
import { useCallback, useEffect, useRef } from 'react';
import { Canvas } from '../components';
import { clientHeight, clientWidth } from '../utils/canvas';
import { Star, Planet } from '../entities';

// TODO: add more planets
const StarSystem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // textures of Star and Planet are from StarSectors: http://fractalsoftworks.com/
  const starRef = useRef(
    new Star({
      radius: 10,
      rotationDirection: -Math.PI / 12,
      rotationVelocity: [5, Math.PI / 72],
      color: '#ff7a00',
      patternSrc: '/img/star_orange.jpg',
    }),
  );
  const planetsRef = useRef([
    new Planet({
      orbitRadius: 20,
      radius: 2,
      rotationDirection: Math.PI / 3,
      rotationVelocity: [10, Math.PI / 12],
      revolutionAngle: Math.PI / 4,
      color: '#bda089',
      patternSrc: '/img/barren03.jpg',
    }),
    new Planet({
      orbitRadius: 25,
      radius: 3,
      rotationDirection: -Math.PI / 6,
      rotationVelocity: [20, Math.PI / 12],
      revolutionAngle: (4 * Math.PI) / 5,
      color: '#c8b281',
      patternSrc: '/img/desert.jpg',
    }),
    new Planet({
      orbitRadius: 35,
      radius: 2.5,
      rotationDirection: (4 * Math.PI) / 5,
      rotationVelocity: [3, Math.PI / 3],
      revolutionAngle: (7 * Math.PI) / 6,
      color: '#071f44',
      patternSrc: '/img/planet_terran01.jpg',
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
