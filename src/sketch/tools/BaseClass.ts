export default class BaseClass {
  ctx: CanvasRenderingContext2D | null;
  constructor(
    public dom: HTMLCanvasElement,
    public viewportPos: Sketch.coordinateType
  ) {
    this.ctx = dom.getContext('2d');
  }

  protected getXYByEvent(e: MouseEvent) {
    if (this.ctx) {
      const { x, y } = { x: 0, y: 0 };
      const { offsetLeft: left, offsetTop: top } = this.ctx?.canvas;
      return { x: x + e.pageX - left, y: y + e.pageY - top };
    }
    return { x: 0, y: 0 };
  }

  protected getContainerSizeByDom() {
    const { width, height } = this.dom.getBoundingClientRect();
    return { width, height };
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public removeSelfEventListener() {}
}
