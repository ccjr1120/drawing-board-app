import { css } from '@emotion/react';
import React, { useLayoutEffect, useRef, useState } from 'react';
import Sketch from '~/sketch/main';
import ToolBar from './ToolBar';

const Home = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // size observer
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

  //init sketch
  const sketch = useRef<Sketch>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useLayoutEffect(() => {
    if (canvasRef.current) {
      sketch.current = new Sketch(canvasRef.current, {
        width: 2000,
        height: 2000,
      });
    }
  }, [containerSize]);

  const [curTool, setCurTool] = useState<Home.toolType>();

  return (
    <div
      ref={containerRef}
      css={css`
        height: 100%;
        width: 100%;
      `}
    >
      <ToolBar
        inheritCss={css`
          position: absolute;
          top: 35%;
          transform: translateY(-50%);
        `}
        value={curTool}
        onChange={(item) => {
          setCurTool(item);
          sketch.current?.updateTool(item.name);
        }}
      />
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
            ${curTool && `cursor: url(${curTool.icon}), pointer;`}
          `}
        />
      </div>
    </div>
  );
});

export default Home;
