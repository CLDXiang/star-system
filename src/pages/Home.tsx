import './Home.scss';
import { useCallback, useEffect, useRef } from 'react';
import { Canvas } from '../components';
import { clientHeight, clientWidth } from '../utils/canvas';

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
