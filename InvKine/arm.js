class Arm
{
    constructor(sx, sy, arm1, arm2)
    {
        this.sx = sx;
        this.sy = sy;
        this.arm1 = arm1;
        this.arm2 = arm2;
        this.scaler = 10;
        this.points = [[sx, sy], [arm1, 0], [arm1 + arm2, 0]];
    }

    setTarget(tx, ty)
    {
        tx /= this.scaler;
        ty /= -this.scaler;
        let cdis = this.pdist(this.points[0], [tx, ty]);
        if(cdis > this.arm1 + this.arm2 || cdis < abs(this.arm1 - this.arm2))
        {
            let dir = createVector(tx - this.sx, ty - this.sy);
            dir.setMag(this.arm1);
            this.points[1] = [dir.x, dir.y];
            if(cdis < abs(this.arm1 - this.arm2))
                dir.mult(-1);
            dir.setMag(this.arm2);
            this.points[2] = [this.points[1][0] + dir.x, this.points[1][1] + dir.y];
        }
        else
        {
            let i = this.intersect(this.sx, this.sy, this.arm1, tx, ty, this.arm2);
            if(this.pdist(this.points[1], i[0]) < this.pdist(this.points[1], i[1]))
                this.points[1] =  i[0];
            else
                this.points[1] =  i[1];
            this.points[2] =  [tx, ty];
        }
    }

    pdist(p1, p2)
    {
        return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
    }

    intersect(x1, y1, r1, x2, y2, r2)
    {
        if(y1 - y2 == 0)
        {
            let x = ((x1 * x1) - (x2 * x2) - (r1 * r1) + (r2 * r2)) / (2 * (x1 - x2));
            let dx = abs(x - x1);
            let dy = Math.sqrt(Math.pow(this.arm1, 2) - Math.pow(dx, 2));
            return [[x, y1 + dy], [x, y1 - dy]];
        }
        let m = (x2 - x1) / (y1 - y2);
        let c = ((x1 * x1) - (x2 * x2) + (y1 * y1) - (y2 * y2) - (r1 * r1) + (r2 * r2)) / (2 * (y1 - y2));
        let A = 1 + (m * m);
        let B = 2 * (m * c - x2 - m * y2);
        let C = (x2 * x2) + (y2 * y2) + (c * c) - (2 * c * y2) - (r2 * r2);
        let det = Math.sqrt((B * B) - (4 * A * C));
        let ix1 = (-B + det) / (2 * A);
        let ix2 = (-B - det) / (2 * A);
        let iy1 = m * ix1 + c;
        let iy2 = m * ix2 + c;
        return [[ix1, iy1], [ix2, iy2]];
    }
    
    draw()
    {
        stroke(0);
        strokeWeight(2);
        fill(0);
        for(let i = 0;i < this.points.length;i ++)
            circle(this.points[i][0] * this.scaler, -this.points[i][1] * this.scaler, 10);
        noFill();
        beginShape();
        for(let i = 0;i < this.points.length;i ++)
            vertex(this.points[i][0] * this.scaler, -this.points[i][1] * this.scaler);
        endShape();
    }
}