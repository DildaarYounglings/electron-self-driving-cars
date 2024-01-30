import { getIntersection } from "../math/utils";
import Point from "./point";
import Segment from "./segment";

class Polygon{
    points:Point[];
    segments:Segment[];
    constructor(points:Point[]){
        this.points = points;
        this.segments = [];
        for(let i = 1; i <= points.length; i++){
            this.segments.push(new Segment(points[i-1],points[i% points.length]));
        }
    }
    static break(poly1:Polygon,poly2:Polygon){
        const segs1 = poly1.segments;
        const segs2 = poly2.segments;
        const intersections = [];
        for(let i = 0; i < segs1.length; i++){
            for(let j = 0; j< segs2.length; j++){
                const int = getIntersection(
                    segs1[i].p1,segs1[i].p2,segs2[j].p1,segs2[j].p2,
                );
                if(int && int.offset != 1 && 1 && int.offset != 0){
                    const point = new Point(int.x,int.y);
                    intersections.push(point);
                }
            }
        }
        return intersections
    }
    draw(ctx:CanvasRenderingContext2D,{stroke = "blue",lineWidth = 2,fill = "rgba(0,0,255,0.3)"} = {}){
        ctx.beginPath();
        ctx.fillStyle = fill;
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lineWidth;
        ctx.moveTo(this.points[0].x,this.points[0].y);
        for(let i = 1; i<this.points.length;i++){
            ctx.lineTo(this.points[i].x,this.points[i].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}
export default Polygon;