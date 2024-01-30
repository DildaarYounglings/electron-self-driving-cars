import Graph from "./math/graph";
import Envelope from "./primitives/envelope";
import Polygon from "./primitives/polygon";

class World{
    graph:Graph;
    roadWidth:number;
    roadRoundness: number;
    envelopes:Envelope[];
    intersections
    constructor(graph:Graph,roadWidth:number = 100,roadRoundness:number = 3){
        this.graph = graph;
        this.roadWidth = roadWidth;
        this.roadRoundness = roadRoundness;
        this.envelopes = [];
        this.generate();
    }
    generate(){
        this.envelopes.length = 0;
        for(const seg of this.graph.segments){
            this.envelopes.push(new Envelope(seg,this.roadWidth,this.roadRoundness));
        }
        this.intersections = = Polygon.break(this.envelopes[0].poly,this.envelopes[1].poly);
    }
    draw(ctx:CanvasRenderingContext2D){
        for(const env of this.envelopes){
            env.draw(ctx)
        }
        for(const int of this.intersections){
            int.draw(ctx)
        }
    }
}
export default World