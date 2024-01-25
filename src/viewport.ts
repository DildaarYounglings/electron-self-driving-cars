import { add, scale, subtract } from "./math/utils";
import Point from "./primitives/point";
type drag = {
    start: Point;
    end: Point;
    offset: Point;
    active: boolean;
};
class Viewport {
    center: Point;
    drag: drag;
    offset: Point;
    zoom: number;
    canvas: HTMLCanvasElement;
    ctx!: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.center = new Point(this.canvas.width / 2, this.canvas.height / 2);
        const canvasContext = this.canvas.getContext("2d");
        if (canvasContext) this.ctx = canvasContext;
        this.zoom = 1;
        this.offset = scale(this.center,-1);
        this.drag = {
            start: new Point(0, 0),
            end: new Point(0, 0),
            offset: new Point(0, 0),
            active: false
        };
        this.#addEventListners();
    }
    #addEventListners() {
        this.canvas.addEventListener("wheel", this.#handleMouseWheel.bind(this));
        this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
        this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
        this.canvas.addEventListener("mouseup", this.#handleMouseUp.bind(this));
    }
    #handleMouseDown(evt: MouseEvent) {
        if (evt.button == 1) {
            this.drag.start = this.getMouse(evt);
            this.drag.active = true;
        }
    }
    #handleMouseMove(evt: MouseEvent) {
        if (this.drag.active) {
            this.drag.end = this.getMouse(evt);
            this.drag.offset = subtract(this.drag.end, this.drag.start);
            this.drag = {
                start: new Point(0, 0),
                end: new Point(0, 0),
                offset: new Point(0, 0),
                active: false,
            };
        }
    }
    #handleMouseUp(evt: MouseEvent) {
        if (this.drag.active) {
            this.offset = add(this.offset, this.drag.offset);
        }
    }

    #handleMouseWheel(evt: WheelEvent) {
        const dir = Math.sign(evt.deltaY);
        const step = 0.1;
        this.zoom += dir * step;
        this.zoom = Math.max(1, Math.min(5, this.zoom));
    }
    getMouse(evt: MouseEvent,subtractDragOffset = false) {
        const p = new Point(
            (evt.offsetX - this.center.x) * this.zoom - this.offset.x,
            (evt.offsetY - this.center.y) * this.zoom - this.offset.y
        );
        return subtractDragOffset? subtract(p,this.drag.offset) : p;
    }
    getOffset() {
        return add(this.offset, this.drag.offset);
    }
    reset(){
        this.ctx.restore();
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.center.x,this.center.y);
        this.ctx.scale(1 / this.zoom , 1 / this.zoom);
        const offset = this.getOffset();
        this.ctx.translate(offset.x,offset.y);
    }
}
export default Viewport;
