import Graph from "./math/graph";
import { getNearestPoint } from "./math/utils";
import Point from "./primitives/point";


class GraphEditor{
    canvas: HTMLCanvasElement;
    graph: Graph;
    ctx: CanvasRenderingContext2D&any;
    selected: Point | null;
    hovered: Point | null;
    constructor(canvas:HTMLCanvasElement,graph:Graph){
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
                }
            }
            if(evt.button == 0){
                const mouse = new Point(evt.offsetX,evt.offsetY);
                if(this.hovered){
                    this.selected = this.hovered;
                    return;
                }
                this.graph.addPoint(mouse);
                this.selected = mouse;
            }
        })
        this.canvas.addEventListener("mousemove",(evt) => {
            const mouse = new Point(evt.offsetX,evt.offsetY);
            this.hovered = getNearestPoint(mouse,this.graph.points,10);
        })
        this.canvas.addEventListener("contextmenu",(evt) => {
            evt.preventDefault();
        })
    }
    #removePoint(point: Point) {
        this.graph.removePoint(point);
        this.hovered = null;
        this.selected = null;
    }
    display(){
        this.graph.draw(this.ctx)
        if(this.hovered){
            this.hovered.draw(this.ctx,{fill:true})
        }
        if(this.selected){
            this.selected.draw(this.ctx,{outline:true})
        }
    }
}
export default GraphEditor