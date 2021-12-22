import { getCanvasCenterPos, getCellCoorPoint } from './helpers/calcFuns';
import { drawPointsForBackground } from './helpers/drawFuns';
import * as layerHelpers from './helpers/layerHelpers';
import BaseClass from './tools/BaseClass';
import PencilClass from './tools/PencilClass';

export default class Sketch {
  background: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  viewportPos: Sketch.coordinateType;
  lineList: Array<Sketch.lineDataType> = [];
  totalSize: Sketch.containerSizeType;
  curAction: Sketch.toolType<BaseClass> = { name: '', bean: null };
  /**
   *
   * @param dom display canvas dom
   * @param totalSize canvas total size.(default display canvas size)
   * @param canvasDefaultPos display the location of the canvas dom.(default center)
   */
  constructor(
    public dom: HTMLCanvasElement,
    totalSize?: Sketch.containerSizeType
  ) {
    this.ctx = dom.getContext('2d');
    const { width, height } = dom.getBoundingClientRect();
    if (!totalSize) {
      this.totalSize = { width, height };
    } else {
      this.totalSize = totalSize;
    }
    this.viewportPos = getCanvasCenterPos({ width, height }, this.totalSize);

    //draw background
    this.background = layerHelpers.createLayer(this.totalSize);
    const points = getCellCoorPoint(this.totalSize, 20);
    drawPointsForBackground(this.background, points);
    this.mergeLayer();
  }

  public updateTool(name: string) {
    this.curAction.name = name;
    if (this.curAction.bean) {
      this.curAction.bean.removeSelfEventListener();
    }
    if (name === 'pencil') {
      this.curAction.bean = new PencilClass(
        this.dom,
        this.viewportPos,
        this.totalSize,
        (lineData: Sketch.lineDataType) => {
          this.lineList.push(lineData);
          this.mergeLayer();
        }
      );
    }
  }

  private mergeLayer() {
    if (this.ctx) {
      const layerList = [];
      layerList.push(this.background);
      layerList.push(...this.lineList.map((item) => item.layer.dom));
      layerHelpers.mergeLayer(this.ctx, this.viewportPos, layerList);
    }
  }

  public setDom(dom: HTMLCanvasElement) {
    const { width, height } = dom.getBoundingClientRect();
    this.dom = dom;
    this.ctx = dom.getContext('2d');
    this.viewportPos = getCanvasCenterPos({ width, height }, this.totalSize);
    this.mergeLayer();
    if (this.curAction) {
      this.updateTool(this.curAction.name);
    }
  }
}
