class Boid
{
    constructor(bound, speed, ndis, spread, coeff)
    {
        this.pos = createVector(Math.random() * (bound[1] - bound[0]) + bound[0], Math.random() * (bound[3] - bound[2]) + bound[2]);
        this.angle = Math.random() * 2 * PI;
        this.gcolor = int(Math.random() * 115) + 140;
        this.speed = speed;
        this.ndis = ndis;
        this.spread = spread;
        this.coeff = coeff;
    }

    calculateHeading(bdata)
    {
        let count = 0;
        let avg_sep = createVector(0, 0);
        let avg_align = 0;
        let avg_coh = createVector(0, 0);
        let min_dis = -1;
        let cdir = createVector(0, 1).setHeading(this.angle);
        for(let i = 0;i < bdata.length;i ++)
        {
            let dir = p5.Vector.sub(bdata[i][0], this.pos);
            let dis = dir.mag();
            if(dis > 0 && dis < this.ndis && abs(cdir.angleBetween(dir)) < this.spread)
            {
                if(min_dis == -1 || dis < min_dis)
                {
                    min_dis = dis;
                    avg_sep = p5.Vector.mult(dir, -1);
                }
                avg_align += bdata[i][1];
                avg_coh.add(dir);
                count ++;
            }
        }
        if(count > 0)
        {
            avg_sep = avg_sep.heading();
            avg_align /= count;
            avg_coh = avg_coh.heading();
            this.angle = (this.coeff[0] * this.angle + this.coeff[1] * avg_sep + this.coeff[2] * avg_align + this.coeff[3] * avg_coh) / this.coeff[4];
        }
    }

    update()
    {
        this.pos.add(createVector(0, 1).setHeading(this.angle).mult(this.speed));
    }

    applyBound(bound)
    {
        if(this.pos.x > bound[0])
            this.pos.x = bound[1];
        if(this.pos.x < bound[1])
            this.pos.x = bound[0];
        if(this.pos.y > bound[2])
            this.pos.y = bound[3];
        if(this.pos.y < bound[3])
            this.pos.y = bound[2];
    }

    draw()
    {
        let data = [
            createVector(7, 0).setHeading(this.angle + ((13 * PI) / 18)),
            createVector(12, 0).setHeading(this.angle),
            createVector(7, 0).setHeading(this.angle - ((13 * PI) / 18))
        ];
        stroke(0);
        strokeWeight(0);
        fill(3, this.gcolor, 252);
        quad(this.pos.x + data[0].x, -(this.pos.y + data[0].y), this.pos.x + data[1].x, -(this.pos.y + data[1].y), this.pos.x + data[2].x, -(this.pos.y + data[2].y));
    }
}