/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
export default class BaseClass {
  ctx: CanvasRenderingContext2D | null;
  constructor(public dom: HTMLCanvasElement) {
    this.ctx = dom.getContext('2d');
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    dom.addEventListener('mousedown', this.mouseDown);
    dom.addEventListener('mousemove', this.mouseMove);
    dom.addEventListener('mouseup', this.mouseUp);
  }

  protected getXYByEvent(e: MouseEvent) {
    if (this.ctx) {
      const { x, y } = { x: 0, y: 0 };
      const { offsetLeft: left, offsetTop: top } = this.ctx?.canvas;
      return { x: x + e.pageX - left, y: y + e.pageY - top };
    }
    return { x: 0, y: 0 };
  }

  getContainerSizeByDom() {
    const { width, height } = this.dom.getBoundingClientRect();
    return { width, height };
  }
  mouseDown(e?: MouseEvent) {}

  mouseMove(e?: MouseEvent) {}

  mouseUp(e?: MouseEvent) {}
  public removeSelfEventListener() {
    this.dom.removeEventListener('mousedown', this.mouseDown);
    this.dom.removeEventListener('mousemove', this.mouseMove);
    this.dom.removeEventListener('mouseup', this.mouseUp);
  }
}
