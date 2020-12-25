import { forwardRef, useEffect, useState } from 'react';
import './Canvas.scss';

const Canvas = forwardRef<HTMLCanvasElement>((_, ref) => {
  const [height, setHeight] = useState<number>(document.body.clientHeight);
  const [width, setWidth] = useState<number>(document.body.clientWidth);

  const resize = () => {
    setHeight(document.body.clientHeight);
    setWidth(document.body.clientWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      height={height}
      width={width}
      style={{ height: '100%', width: '100%' }}
    >
      Your browser doesn't support canvas.
    </canvas>
  );
});

export default Canvas;
