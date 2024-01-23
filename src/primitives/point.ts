class Point{
    x:any
    y:any
    constructor(x:any,y:any){
        this.x = x;
        this.y = y;
    }
    equals(point:Point){
        const booleanvalue = this.x === point.x && this.y === point.y;
        return booleanvalue
    }
    draw(ctx:any,size:number = 18,color:string = "black"){
        const rad = size / 2;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(this.x,this.y,rad,0,Math.PI * 2);
        ctx.fill();
    }
}
export default Point