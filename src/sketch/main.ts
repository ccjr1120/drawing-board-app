import { getCanvasCenterPos, getCellCoorPoint } from './helpers/calcFuns';
import { drawPointsForBackground } from './helpers/drawFuns';
import * as layerHelpers from './helpers/layerHelpers';
import BaseClass from './tools/BaseClass';
import EraserClass from './tools/EraserClass';
import HandClass from './tools/HandClass';
import PencilClass from './tools/PencilClass';
import PointerClass from './tools/PointerClass';

export default class Sketch {
  background: HTMLCanvasElement;
  eraser: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  viewportPos: Sketch.coordinateType;
  lineList: Array<Sketch.lineDataType> = [];
  totalSize: Sketch.containerSizeType;
  containerSize: Sketch.containerSizeType;
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
    this.containerSize = { width, height };
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

    this.eraser = layerHelpers.createLayer(this.totalSize);

    this.mergeLayer();
  }

  public updateTool(name: string) {
    this.curAction.name = name;
    if (this.curAction.bean) {
      this.curAction.bean.remove();
    }
    if (name === 'pencil') {
      this.curAction.bean = new PencilClass(
        this.dom,
        this.viewportPos,
        this.totalSize,
        this.addNewLineCb.bind(this)
      );
    } else if (name === 'hand') {
      this.curAction.bean = new HandClass(
        this.dom,
        this.updateViewport.bind(this)
      );
    } else if (name === 'pointer') {
      this.curAction.bean = new PointerClass(
        this.dom,
        this.viewportPos,
        this.lineList,
        this.updateLineData.bind(this)
      );
    } else {
      this.curAction.bean = new EraserClass(
        this.dom,
        this.viewportPos,
        this.eraser,
        this.lineList,
        this.mergeLayer.bind(this)
      );
    }
  }

  private updateLineData(index: number, lineData: Sketch.lineDataType) {
    this.lineList[index] = lineData;
    this.mergeLayer();
  }
  private addNewLineCb(lineData: Sketch.lineDataType) {
    this.lineList.push(lineData);
    this.mergeLayer();
  }
  private updateViewport(dx: number, dy: number) {
    const { width: totalW, width: totalH } = this.totalSize;
    const { width: vw, width: vh } = this.containerSize;
    const { x: vx, y: vy } = this.viewportPos;
    const rx =
      vx - dx <= 0 ? 0 : vx - dx + vw <= totalW ? vx - dx : totalW - vw;
    const ry =
      vy - dy <= 0 ? 0 : vy - dy + vh <= totalH ? vy - dy : totalH - vh;
    this.viewportPos = { x: rx, y: ry };
    this.mergeLayer();
  }

  private mergeLayer() {
    if (this.ctx) {
      const layerList = [];
      layerList.push(this.eraser);
      layerList.push(this.background);
      layerList.push(...this.lineList.map((item) => item.layer.dom));
      layerHelpers.mergeLayer(this.ctx, this.viewportPos, layerList);
    }
  }

  public setDom(dom: HTMLCanvasElement) {
    const { width, height } = dom.getBoundingClientRect();
    this.containerSize = { width, height };
    this.dom = dom;
    this.ctx = dom.getContext('2d');
    this.viewportPos = getCanvasCenterPos({ width, height }, this.totalSize);
    this.mergeLayer();
    if (this.curAction) {
      this.updateTool(this.curAction.name);
    }
  }
}
