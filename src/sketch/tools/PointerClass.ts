import {
  calcDistanceByPoints,
  getLineDataIndexByPoint,
  getRectByLinePoint,
} from '../helpers/calcFuns';
import { drawLineByPoints } from '../helpers/drawFuns';
import BaseClass from './BaseClass';

export default class PointerClass extends BaseClass {
  rectData: Array<number> = [];
  lineIndex = -1;
  lineData: Sketch.lineDataType | null = null;
  isDown = false;
  points: Array<Sketch.coordinateType> = [];
  constructor(
    dom: HTMLCanvasElement,
    public viewportPos: Sketch.coordinateType,
    public lineList: Array<Sketch.lineDataType>,
    public updateLineData: (
      index: number,
      lineData: Sketch.lineDataType
    ) => void
  ) {
    super(dom, viewportPos);
  }

  mouseDown(e: MouseEvent): void {
    const pos = this.getXYByEvent(e);
    if (this.rectData && this.isInRectForPoint(pos, this.rectData)) {
      this.isDown = true;
      this.points.push(pos);
      return;
    } else {
      if (this.lineData) {
        this.clearRect(this.lineData, this.rectData);
        drawLineByPoints(this.lineData.layer.ctx, this.lineData.points);
      }
    }
    this.lineIndex = getLineDataIndexByPoint(this.lineList, pos);
    if (this.lineIndex !== -1) {
      this.lineData = this.lineList[this.lineIndex];
      this.rectData = getRectByLinePoint(this.lineData.points);
      this.drawRect(this.lineData.layer.ctx, this.rectData);
      this.isDown = true;
    }
    this.lineData && this.updateLineData(this.lineIndex, this.lineData);
  }

  mouseMove(e: MouseEvent) {
    if (!this.isDown) {
      return;
    }
    if (this.lineData) {
      const pos = this.getXYByEvent(e);
      if (this.points.length >= 5) {
        const { dx, dy } = calcDistanceByPoints(this.points);
        this.movePixel(dx, dy, this.lineData, this.rectData);
        this.updateLineData(this.lineIndex, this.lineData);
        this.points = [];
      } else {
        this.points.push(pos);
      }
    }
  }

  mouseUp(): void {
    this.isDown = false;
    this.points = [];
  }

  public remove(): void {
    super.remove();
    if (this.lineData) {
      this.clearRect(this.lineData, this.rectData);
      drawLineByPoints(this.lineData.layer.ctx, this.lineData.points);
      this.updateLineData(this.lineIndex, this.lineData);
    }
  }

  private movePixel(
    dx: number,
    dy: number,
    lineData: Sketch.lineDataType,
    rectData: Array<number>
  ) {
    this.clearRect(lineData, rectData);
    rectData[0] += dx;
    rectData[1] += dy;
    this.drawRect(lineData.layer.ctx, rectData);
    const movedPoints = lineData.points.map((item) => ({
      x: item.x + dx,
      y: item.y + dy,
    }));
    drawLineByPoints(lineData.layer.ctx, movedPoints);
    lineData.points = movedPoints;
  }

  private drawRect(
    ctx: CanvasRenderingContext2D,
    rectData: Array<number>,
    lineWidth = 2
  ) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#0067FF';
    ctx.lineWidth = lineWidth;
    const [x, y, w, h] = rectData;
    ctx.rect(x, y, w, h);
    ctx.stroke();
    ctx.restore();
  }

  private isInRectForPoint(
    point: Sketch.coordinateType,
    rectData: Array<number>
  ) {
    const [x, y, w, h] = rectData;
    const { x: px, y: py } = point;
    return px > x && px < x + w && py > y && py < y + h;
  }

  private clearRect(lineData: Sketch.lineDataType, rectData: Array<number>) {
    const [x, y, w, h] = rectData;
    lineData.layer.ctx.clearRect(x - 20, y - 20, w + 40, h + 40);
  }
}
