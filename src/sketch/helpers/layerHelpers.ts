import Sketch from '../main';

export function createLayer(containerSize: Sketch.containerSizeType) {
  const dom = document.createElement('canvas');
  dom.width = containerSize.width;
  dom.height = containerSize.height;
  return dom;
}
