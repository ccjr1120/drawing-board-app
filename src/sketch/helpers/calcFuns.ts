export function getCanvasCenterPos(
  viewportSize: Sketch.containerSizeType,
  totalSize: Sketch.containerSizeType
) {
  return {
    x: (totalSize.width - viewportSize.width) / 2,
    y: (totalSize.height - viewportSize.height) / 2,
  };
}

export function getCellCoorPoint(
  containerSize: Sketch.containerSizeType,
  splitUnit: number
) {
  const { width, height } = containerSize;
  const splitWidthNum = width / splitUnit;
  const splitHeightNum = height / splitUnit;
  const cellPoints: Array<Sketch.coordinateType> = [];
  for (let i = 1; i < splitWidthNum; i += 1) {
    for (let j = 1; j < splitHeightNum; j += 1) {
      cellPoints.push({ x: i * splitUnit, y: j * splitUnit });
    }
  }
  return cellPoints;
}

export function calcDistanceByPoints(points: Array<Sketch.coordinateType>) {
  if (points.length >= 2) {
    const startP = points[0];
    const endP = points[points.length - 1];
    return { dx: endP.x - startP.x, dy: endP.y - startP.y };
  }
  return { dx: 0, dy: 0 };
}
