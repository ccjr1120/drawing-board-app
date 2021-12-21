import { css } from '@emotion/react';
import React, { useLayoutEffect, useRef, useState } from 'react';
import Sketch from '~/sketch/main';

const Home = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (containerRef.current) {
      const observer = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        setContainerSize({ width, height });
      });
      observer.observe(containerRef.current);
      return () => {
        observer.disconnect();
      };
    }
  }, []);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useLayoutEffect(() => {
    if (canvasRef.current) {
      new Sketch(canvasRef.current, { width: 2000, height: 2000 });
    }
  }, [containerSize]);

  return (
    <div
      ref={containerRef}
      css={css`
        height: 100%;
        width: 100%;
      `}
    >
      <div
        css={css`
          width: ${containerSize.width}px;
          height: ${containerSize.height}px;
        `}
      >
        <canvas
          ref={canvasRef}
          width={containerSize.width}
          height={containerSize.height}
          css={css`
            width: ${containerSize.width}px;
            height: ${containerSize.height}px;
          `}
        />
      </div>
    </div>
  );
});

export default Home;
