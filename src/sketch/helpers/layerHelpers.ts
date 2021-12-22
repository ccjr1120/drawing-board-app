import Sketch from '../main';

export function createLayer(containerSize: Sketch.containerSizeType) {
  const dom = document.createElement('canvas');
  dom.width = containerSize.width;
  dom.height = containerSize.height;
  return dom;
}

export function mergeLayer(
  viewCtx: CanvasRenderingContext2D,
  viewportPos: Sketch.coordinateType,
  layerList: Array<HTMLCanvasElement>
) {
  const {
    canvas: { offsetHeight: height, offsetWidth: width },
  } = viewCtx;
  viewCtx.clearRect(0, 0, width, height);
  layerList.forEach((layer) => {
    if (layer.width !== 0 && layer.height !== 0) {
      viewCtx.drawImage(
        layer,
        viewportPos.x,
        viewportPos.y,
        width,
        height,
        0,
        0,
        width,
        height
      );
    }
  });
}
