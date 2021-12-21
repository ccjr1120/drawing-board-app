import { getCanvasCenterPos, getCellCoorPoint } from './helpers/calcFuns';
import { drawPointsForBackground } from './helpers/drawFuns';
import { createLayer } from './helpers/layerHelpers';

export default class Sketch {
  background: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  viewportPos: Sketch.coordinateType;
  /**
   *
   * @param dom display canvas dom
   * @param totalSize canvas total size.(default display canvas size)
   * @param canvasDefaultPos display the location of the canvas dom.(default center)
   */
  constructor(
    public dom: HTMLCanvasElement,
    public totalSize?: Sketch.containerSizeType,
    public canvasDefaultPos?: Sketch.coordinateType
  ) {
    this.ctx = dom.getContext('2d');
    const { width, height } = dom.getBoundingClientRect();
    if (!totalSize) {
      totalSize = { width, height };
    }
    if (!canvasDefaultPos) {
      this.viewportPos = getCanvasCenterPos({ width, height }, totalSize);
    } else {
      this.viewportPos = canvasDefaultPos;
    }

    //draw background
    this.background = createLayer(totalSize);
    const points = getCellCoorPoint(totalSize, 20);
    drawPointsForBackground(this.background, points);
    this.mergeLayer();
  }

  private mergeLayer() {
    const { width, height } = this.dom;
    if (this.ctx) {
      this.ctx.clearRect(0, 0, width, height);
      this.ctx.drawImage(
        this.background,
        this.viewportPos.x,
        this.viewportPos.y,
        width,
        height,
        0,
        0,
        width,
        height
      );
    }
  }
}
