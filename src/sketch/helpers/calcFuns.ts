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

export function getLineDataIndexByPoint(
  linePoints: Array<Sketch.lineDataType>,
  point: Sketch.coordinateType,
  offsetValue = 16
) {
  const judgeRange = (n1: number, n2: number) =>
    Math.abs(n2 - n1) < offsetValue;
  const { x: cX, y: cY } = point;
  let index = -1;
  linePoints.some((line, i) => {
    if (
      line.points.some(({ x, y }) => judgeRange(x, cX) && judgeRange(y, cY))
    ) {
      index = i;
      return true;
    }
    return false;
  });
  return index;
}

// get rect data by line points;
export function getRectByLinePoint(
  points: Array<Sketch.coordinateType>,
  lineWidth = 2
) {
  let top = points[0];
  let right = points[0];
  let bottom = points[0];
  let left = points[0];
  points.forEach(({ x, y }) => {
    top = y < top.y ? { x, y } : top;
    right = x > right.x ? { x, y } : right;
    bottom = y > bottom.y ? { x, y } : bottom;
    left = x < left.x ? { x, y } : left;
  });
  return [
    left.x - lineWidth - 1,
    top.y - lineWidth - 1,
    right.x - left.x + lineWidth * 2 + 2,
    bottom.y - top.y + lineWidth * 2 + 2,
  ];
}
