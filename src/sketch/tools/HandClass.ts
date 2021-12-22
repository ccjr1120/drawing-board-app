import { calcDistanceByPoints } from '../helpers/calcFuns';
import BaseClass from './BaseClass';

export default class HandClass extends BaseClass {
  isDown = false;
  points: Array<Sketch.coordinateType> = [];
  constructor(
    dom: HTMLCanvasElement,
    public updateViewport: (dx: number, dy: number) => void
  ) {
    super(dom);
  }

  mouseDown() {
    this.isDown = true;
  }

  mouseMove(e: MouseEvent) {
    if (!this.isDown) {
      return;
    }
    const curPoint = this.getXYByEvent(e);
    if (this.points.length >= 5) {
      const { dx, dy } = calcDistanceByPoints(this.points);
      this.updateViewport(dx, dy);
      this.points = [];
    } else {
      this.points.push(curPoint);
    }
  }

  mouseUp() {
    this.isDown = false;
    if (this.points.length !== 0) {
      const { dx, dy } = calcDistanceByPoints(this.points);
      this.updateViewport(dx, dy);
      this.points = [];
    }
  }

  public removeSelfEventListener() {
    this.dom.removeEventListener('mousedown', this.mouseDown);
    this.dom.removeEventListener('mousemove', this.mouseMove);
    this.dom.removeEventListener('mouseup', this.mouseUp);
  }
}
