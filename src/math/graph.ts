import Point from "../primitives/point";
import Segment from "../primitives/segment";
class Graph{
    points:Point[];
    segments:Segment[];
    constructor(points:Point[] = [], segments:Segment[] = []){
        this.points = points
        this.segments = segments;
    }
    tryAddPoint(point:Point){
        if(!this.containsPoint(point)){
            this.addPoint(point);
            return true;
        }
        return false;
    }
    addPoint(point:Point){
        this.points.push(point);
    }
    tryAddSegment(seg:Segment){
        if(!this.containsSegment(seg) && !seg.p1.equals(seg.p2)){
            this.addSegment(seg);
            return true;
        }
        return false;
    }
    containsSegment(seg:Segment){
        const booleanValue = this.segments.find((s) => s.equals(seg));
        return booleanValue
    }
    addSegment(seg:Segment){
        this.segments.push(seg);
    }
    containsPoint(point:Point){
        return this.points.find((p) => p.equals(point));
    }
    draw(ctx:any){
        for(const seg of this.segments){
            seg.draw(ctx)
        }
        for(const point of this.points){
            point.draw(ctx)
        }
    }
}
export default Graph;