import Sketch from '../main';

export function drawPointsForBackground(
  backDom: HTMLCanvasElement,
  points: Array<Sketch.coordinateType>
) {
  const ctx = backDom.getContext('2d');
  if (ctx) {
    points.forEach((item) => {
      ctx.moveTo(item.x, item.y);
      ctx.beginPath();
      ctx.arc(item.x, item.y, 0.2, 0, 2 * Math.PI);
      ctx.stroke();
    });
  }
}

export function drawLineByPoints(
  ctx: CanvasRenderingContext2D,
  points: Array<Sketch.coordinateType>
) {
  ctx.beginPath();
  const result = points.map((item, i) => {
    const { x, y } = item;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
    return { x, y };
  });
  ctx.stroke();
  return result;
}
