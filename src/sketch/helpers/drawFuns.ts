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
