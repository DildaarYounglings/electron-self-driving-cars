import Graph from "./math/graph";
import Point from "./primitives/point";
import Segment from "./primitives/segment";
export const setupCanvas = () => {
    const myCanvasEl:HTMLElement & any = document.getElementById("myCanvas");
    const canvasEl:HTMLCanvasElement = myCanvasEl;
    if(!canvasEl)return;
    canvasEl.width = 600;
    canvasEl.height = 600;
    const ctx:CanvasRenderingContext2D & any = canvasEl.getContext("2d");
    if(!ctx)return;
    const p1 = new Point(200,200);
    const p2 = new Point(500,200);
    const p3 = new Point(400,400);
    const p4 = new Point(100,300);
    const s1 = new Segment(p1,p2);
    const s2 = new Segment(p1,p3);
    const s3 = new Segment(p1,p4);
    const s4 = new Segment(p2,p3);
    const graph = new Graph([p1,p2,p3,p4],[s1,s2,s3,s4]);
    if(!graph)return;
    graph.draw(ctx);
    // setup for <button id="button1"></button> //
    const addRandomPoint = () => {
        graph.tryAddPoint(new Point(Math.random() * canvasEl.width,Math.random() * canvasEl.height));
        ctx.clearRect(0,0,canvasEl.width,canvasEl.height);
        graph.draw(ctx);
        
    }
    const setupButton1 = () => {
        document.getElementById("button1")?.addEventListener("click",addRandomPoint);
    }
    setupButton1();
    // end of setup for <button id="button1"></button> //
}