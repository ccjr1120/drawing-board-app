import { createLayer } from '../helpers/layerHelpers';
import BaseClass from './BaseClass';

export default class PencilClass extends BaseClass {
  isDown = false;
  points: Array<Sketch.coordinateType> = [];
  constructor(
    dom: HTMLCanvasElement,
    public viewportPos: Sketch.coordinateType,
    public totalSize: Sketch.containerSizeType,
    public newLineCb: (lineData: Sketch.lineDataType) => void
  ) {
    super(dom);
  }

  mouseDown(e: MouseEvent) {
    if (this.ctx) {
      this.isDown = true;
      const { x, y } = this.getXYByEvent(e);
      this.points.push({ x, y });
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
    }
  }

  mouseMove(e: MouseEvent) {
    if (!this.isDown) {
      return;
    }
    const coor = this.getXYByEvent(e);
    this.points.push(coor);
    this.ctx?.lineTo(coor.x, coor.y);
    this.ctx?.stroke();
  }

  mouseUp() {
    const dom = createLayer(this.totalSize);
    const ctx = dom.getContext('2d');
    if (ctx) {
      const { x: vx, y: vy } = this.viewportPos;
      ctx.beginPath();
      this.points.map((item, i) => {
        let { x, y } = item;
        x += vx;
        y += vy;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        return { x, y };
      });
      ctx.stroke();
      this.isDown = false;
      this.newLineCb({ layer: { dom, ctx }, points: this.points });
    }
    this.points = [];
  }

  getXYByEvent(e: MouseEvent) {
    const { x, y } = super.getXYByEvent(e);
    const offset = 32;
    return { x, y: y + offset };
  }
}
