class Arm
{
    constructor(sx, sy, arms, absolute = false)
    {
        this.sx = sx;
        this.sy = sy;
        this.arms = arms;
        this.absolute = absolute;
        this.angles = new Array(this.arms.length).fill(0);
        this.scaler = 10;
        this.setTarget(200, 200);
    }

    setTarget(tx, ty)
    {
        tx /= this.scaler;
        ty /= -this.scaler;
        let dir = createVector(tx - this.sx, ty - this.sy);
        this.angles = [dir.heading(), 0, 0];
    }

    calcPoints()
    {
        let points = [];
        let head = createVector(this.sx, this.sy);
        let cang = 0;
        points.push([head.x, head.y]);
        for(let i = 0;i < this.arms.length;i ++)
        {
            let dir = createVector(1, 1);
            dir.setMag(this.arms[i]);
            if(this.absolute)
                dir.setHeading(radians(this.angles[i]));
            else
            {
                dir.setHeading(radians(cang));
                dir.rotate(this.angles[i]);
                cang = dir.heading();
            }
            head.add(dir);
            points.push([head.x, head.y]);
        }
        return points;
    }

    draw()
    {
        let points = this.calcPoints();
        stroke(0);
        strokeWeight(2);
        fill(0);
        for(let i = 0;i < points.length;i ++)
            circle(points[i][0] * this.scaler, -points[i][1] * this.scaler, 10);
        noFill();
        beginShape();
        for(let i = 0;i < points.length;i ++)
            vertex(points[i][0] * this.scaler, -points[i][1] * this.scaler);
        endShape();
    }
}