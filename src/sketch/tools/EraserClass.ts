import Sketch from '../main';
import BaseClass from './BaseClass';

export default class EraserClass extends BaseClass {
  isDown = false;
  points: Array<Sketch.coordinateType> = [];
  eraserCtx: CanvasRenderingContext2D | null;
  circleRadius = 20;
  constructor(
    dom: HTMLCanvasElement,
    viewportPos: Sketch.coordinateType,
    public eraser: HTMLCanvasElement,
    public lineList: Array<Sketch.lineDataType>,
    public mergeLayer: () => void
  ) {
    super(dom, viewportPos);
    this.eraserCtx = eraser.getContext('2d');
  }

  mouseDown() {
    this.isDown = true;
  }

  mouseMove(event: MouseEvent) {
    if (this.isDown && this.eraserCtx) {
      const pos = this.getXYByEvent(event);
      if (this.points.length > 0) {
        this.clearCanvas();
        this.points = [];
      }
      this.eraserCtx.beginPath();
      this.points.push(pos);
      this.eraserCtx.fillStyle = 'rgba(0,0,0,0.1)';
      this.eraserCtx.arc(
        pos.x - 8,
        pos.y + 4,
        this.circleRadius,
        0,
        2 * Math.PI
      );
      this.eraserCtx.fill();
      this.mergeLayer();
    }
  }

  mouseUp() {
    if (this.points.length > 0 && this.eraserCtx) {
      this.clearLastMark(this.eraserCtx);
      this.mergeLayer();
    }
    this.isDown = false;
    this.points = [];
  }

  clearCanvas() {
    if (this.eraserCtx) {
      this.clearLastMark(this.eraserCtx);
    }
    this.lineList.forEach((item) => {
      this.clearLastMark(item.layer.ctx);
    });
  }

  private clearLastMark(ctx: CanvasRenderingContext2D) {
    const { x, y } = this.points[0];
    ctx.save();
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x - 8, y + 4, this.circleRadius + 1, 0, 2 * Math.PI);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fill();
    ctx.restore();
  }

  getXYByEvent(event: MouseEvent) {
    const { x, y } = super.getXYByEvent(event);

    const iconSize = 32;
    return { x: x + iconSize / 2, y: y + iconSize - this.circleRadius / 2 };
  }
}
