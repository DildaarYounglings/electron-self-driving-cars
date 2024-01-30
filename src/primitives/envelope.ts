import { angle, subtract, translate } from "../math/utils";
import Point from "./point";
import Polygon from "./polygon";
import Segment from "./segment";

class Envelope {
  skeleton: Segment;
  poly: Polygon;
  constructor(skeleton: Segment, width: number = 80, roundness: number = 1) {
    this.skeleton = skeleton;
    this.poly = this.#generatePolygon(width, roundness);
  }
  #generatePolygon(width: number, roundness: number){
    const { p1, p2 } = this.skeleton;
    const radius = width / 2;
    const alpha = angle(subtract(p1, p2));
    const alpha_cw = alpha + Math.PI / 2;
    const alpha_ccw = alpha - Math.PI / 2;

    const points: Point[] = [];
    const step = Math.PI / Math.max(1, roundness);
    const eps = step/2;
    for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
      points.push(translate(p1, i, radius));
    }
    for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
      points.push(translate(p2, Math.PI + i, radius));
    }
    return new Polygon(points);
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.poly.draw(ctx);
  }
}
export default Envelope;
