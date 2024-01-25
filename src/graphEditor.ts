import Graph from "./math/graph";
import { getNearestPoint } from "./math/utils";
import Point from "./primitives/point";
import Segment from "./primitives/segment";


class GraphEditor{
    canvas: HTMLCanvasElement;
    graph: Graph;
    ctx: CanvasRenderingContext2D&any;
    selected: Point | null;
    hovered: Point | null;
    dragging: boolean;
    mouse: Point;

    constructor(canvas:HTMLCanvasElement,graph:Graph){
        this.mouse = new Point(undefined,undefined);
        this.dragging = false;
        this.hovered = null;
        this.selected = null;
        this.canvas = canvas;
        this.graph = graph;
        this.ctx = this.canvas.getContext("2d");
        this.#addEventListners();
    }
    #addEventListners(){
        this.canvas.addEventListener("mousedown",(evt) => {
            if(evt.button == 2 /*this is to implement right click*/){
                if(this.hovered){
                    this.#removePoint(this.hovered);
                }else{
                    this.selected = null;
                }
            }
            if(evt.button == 0){
                this.mouse = new Point(evt.offsetX,evt.offsetY);
                if(this.hovered){
                    this.#select(this.hovered);
                    this.dragging = true;
                    return;
                }
                this.graph.addPoint(this.mouse);
                this.#select(this.mouse);
                this.hovered = this.mouse;
            }
        })
        this.canvas.addEventListener("mousemove",(evt) => {
            this.mouse = new Point(evt.offsetX,evt.offsetY);
            this.hovered = getNearestPoint(this.mouse,this.graph.points,10);
            if(this.dragging == true){
                this.selected.x = this.mouse.x;
                this.selected.y = this.mouse.y;
            }
        })
        this.canvas.addEventListener("contextmenu",(evt) => evt.preventDefault());
        this.canvas.addEventListener("mouseup",() => this.dragging = false);
    }
    #select(point:Point){
        if(this.selected){
            this.graph.tryAddSegment(new Segment(this.selected,point));
        }
        this.selected = point;
    }
    #removePoint(point: Point) {
        this.graph.removePoint(point);
        this.hovered = null;
        if(this.selected == point){
            this.selected = null;
        }
    }
    display(){
        this.graph.draw(this.ctx)
        if(this.hovered){
            this.hovered.draw(this.ctx,{fill:true})
        }
        if(this.selected){
            const intent = this.hovered ? this.hovered : this.mouse;
            new Segment(this.selected,intent).draw(this.ctx,{dash:[3,3]});
            this.selected.draw(this.ctx,{outline:true});
        }
    }
}
export default GraphEditor