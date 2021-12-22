declare namespace Sketch {
  interface coordinateType {
    x: number;
    y: number;
  }
  interface containerSizeType {
    height: number;
    width: number;
  }
  interface layerType {
    dom: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
  }
  interface lineDataType {
    layer: layerType;
    points: Array<coordinateType>;
  }

  interface toolType<T> {
    name: string;
    bean: T | null;
  }
}
