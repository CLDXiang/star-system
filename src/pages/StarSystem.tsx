import './StarSystem.scss';
import { useCallback, useEffect, useRef } from 'react';
import { Canvas } from '../components';
import { clientHeight, clientWidth } from '../utils/canvas';
import { Star, Planet } from '../entities';

const StarSystem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // textures of Star and Planet are from StarSectors: http://fractalsoftworks.com/
  const starRef = useRef(
    new Star({
      radius: 7,
      rotationDirection: -Math.PI / 12,
      rotationVelocity: [5, Math.PI / 72],
      color: '#ff7a00',
      patternSrc: '/img/star_orange.jpg',
    }),
  );
  const planetsRef = useRef([
    new Planet({
      orbitRadius: 12,
      radius: 0.7,
      rotationDirection: Math.PI / 3,
      rotationVelocity: [10, -Math.PI / 12],
      revolutionAngle: Math.PI / 4,
      color: '#bda089',
      patternSrc: '/img/barren03.jpg',
    }),
    new Planet({
      orbitRadius: 15,
      radius: 1,
      rotationDirection: -Math.PI / 6,
      rotationVelocity: [8, (13 * -Math.PI) / 48],
      revolutionAngle: (4 * Math.PI) / 5,
      color: '#c8b281',
      patternSrc: '/img/desert.jpg',
    }),
    new Planet({
      orbitRadius: 20,
      radius: 0.8,
      rotationDirection: (4 * Math.PI) / 5,
      rotationVelocity: [3, -Math.PI / 24],
      revolutionAngle: (7 * Math.PI) / 6,
      color: '#071f44',
      patternSrc: '/img/planet_terran01.jpg',
    }),
    new Planet({
      orbitRadius: 23,
      radius: 0.5,
      rotationDirection: -(6 * Math.PI) / 5,
      rotationVelocity: [4, (7 * Math.PI) / 12],
      revolutionAngle: (5 * Math.PI) / 6,
      color: '#8d6f58',
      patternSrc: '/img/marslike.jpg',
    }),
    new Planet({
      orbitRadius: 30,
      radius: 1.7,
      rotationDirection: (7 * Math.PI) / 5,
      rotationVelocity: [10, -(3 * Math.PI) / 48],
      revolutionAngle: (11 * Math.PI) / 6,
      color: '#d8a23f',
      patternSrc: '/img/gas_giant.jpg',
    }),
    new Planet({
      orbitRadius: 37,
      radius: 2.5,
      rotationDirection: (9 * Math.PI) / 5,
      rotationVelocity: [10, -(3 * Math.PI) / 48],
      revolutionAngle: (3 * Math.PI) / 2,
      color: '#347fb3',
      patternSrc: '/img/ice_giant.jpg',
    }),
    new Planet({
      orbitRadius: 45,
      radius: 2,
      rotationDirection: -(7 * Math.PI) / 5,
      rotationVelocity: [10, -(3 * Math.PI) / 48],
      revolutionAngle: (1 * Math.PI) / 2,
      color: '#347fb3',
      patternSrc: '/img/volturn.jpg',
    }),
    new Planet({
      orbitRadius: 48,
      radius: 0.5,
      rotationDirection: (4 * Math.PI) / 5,
      rotationVelocity: [3, Math.PI / 3],
      revolutionAngle: (7 * Math.PI) / 6,
      color: '#acb6c6',
      patternSrc: '/img/planet_ice01.jpg',
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
