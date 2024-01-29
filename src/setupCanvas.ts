import GraphEditor from "./graphEditor";
import Graph from "./math/graph";
import Envelope from "./primitives/envelope";
import Point from "./primitives/point";
import Polygon from "./primitives/polygon";
import Segment from "./primitives/segment";
import Viewport from "./viewport";
export const setupCanvas = () => {
  const myCanvasEl: HTMLElement & any = document.getElementById("myCanvas");
  const canvasEl: HTMLCanvasElement = myCanvasEl;
  if (!canvasEl) return;
  canvasEl.width = 600;
  canvasEl.height = 600;
  const canvasCtx:CanvasRenderingContext2D|null = canvasEl.getContext("2d");
  if (!canvasCtx)return
  const ctx:CanvasRenderingContext2D = canvasCtx;
  const p1 = new Point(10,10);
  const p2 = new Point(20,20);
  const p3 = new Point(30,30);
  const p4 = new Point(40,40);
  const s1 = new Segment(p1,p2);
  const s2 = new Segment(p3,p4);
  //localStorage.setItem("graph",JSON.stringify(new Graph([p1,p2,p3,p4],[s1,s2])));
  const graphString = localStorage.getItem("graph");
  const graphInfo:Graph|null = graphString? JSON.parse(graphString) : null;
  const graph:Graph = graphInfo? Graph.load(graphInfo) : new Graph([p1,p2],[s1]);
  const viewport = new Viewport(canvasEl);
  const graphEditor = new GraphEditor(viewport,graph);
  animate();
  /*setup */
  function save(){
    localStorage.setItem("graph",JSON.stringify(graph));
  }
  function saveButtonSetup(){
    document.getElementById("saveButton")?.addEventListener("click",save);
  }
  saveButtonSetup();
  function dispose(){
    graphEditor.dispose();
  }
  function disposeButtonSetup(){
    document.getElementById("disposeButton")?.addEventListener("click",dispose);
  }
  disposeButtonSetup()
  function animate(){
    viewport.reset()
    graphEditor.display();
    new Envelope(graph.segments[0],80).draw(ctx);
    requestAnimationFrame(animate);
  }
};
