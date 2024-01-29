import GraphEditor from "./graphEditor";
import Graph from "./math/graph";
import Point from "./primitives/point";
import Segment from "./primitives/segment";
import Viewport from "./viewport";
export const setupCanvas = () => {
  const myCanvasEl: HTMLElement & any = document.getElementById("myCanvas");
  const canvasEl: HTMLCanvasElement = myCanvasEl;
  if (!canvasEl) return;
  canvasEl.width = 600;
  canvasEl.height = 600;
  const ctx:CanvasRenderingContext2D|null = canvasEl.getContext("2d");
  if (!ctx)return
  const p1 = new Point(10,10);
  const p2 = new Point(20,20);
  const s1 = new Segment(p1,p2);
  const graphString = localStorage.getItem("graph");
  const graphInfo:Graph|null = graphString? JSON.parse(graphString) : null;
  const graph:Graph = graphInfo? Graph.load(graphInfo): new Graph([p1,p2],[s1]);
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
    new Polygon(graph.points).draw(ctx);
    requestAnimationFrame(animate);
  }
};
