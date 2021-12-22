import { createLayer } from '../helpers/layerHelpers';
import BaseClass from './BaseClass';

export default class PencilClass extends BaseClass {
  isDown = false;
  points: Array<Sketch.coordinateType> = [];
  constructor(
    dom: HTMLCanvasElement,
    viewportPos: Sketch.coordinateType,
    public totalSize: Sketch.containerSizeType,
    public newLineCb: (lineData: Sketch.lineDataType) => void
  ) {
    super(dom, viewportPos);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    dom.addEventListener('mousedown', this.mouseDown);
    dom.addEventListener('mousemove', this.mouseMove);
    dom.addEventListener('mouseup', this.mouseUp);
  }

  private mouseDown(e: MouseEvent) {
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
    console.log(this.viewportPos, 's');
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

  public removeSelfEventListener() {
    this.dom.removeEventListener('mousedown', this.mouseDown);
    this.dom.removeEventListener('mousemove', this.mouseMove);
    this.dom.removeEventListener('mouseup', this.mouseUp);
  }
}
