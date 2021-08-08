class Boid
{
    constructor(bound, speed = 5)
    {
        this.bound = bound;
        this.speed = speed;
        this.pos = createVector(Math.random() * (bound[1] - bound[0]) + bound[0], Math.random() * (bound[3] - bound[2]) + bound[2]);
        this.angle = Math.random() * 2 * PI;
        this.gcolor = int(Math.random() * 115) + 140;
        this.ndis = 150;
    }

    calculateHeading(bdata)
    {
        let count = 0;
        let avg_ang = 0;
        for(let i = 0;i < bdata.length;i ++)
        {
            let dis = Math.sqrt(Math.pow(bdata[i][0] - this.pos.x, 2) + Math.pow(bdata[i][1] - this.pos.y, 2));
            if(dis > 0 && dis < this.ndis)
            {
                avg_ang += bdata[i][2];
                count ++;
            }
        }
        if(count > 0)
        {
            avg_ang /= count;
            this.angle = (19 * this.angle + avg_ang) / 20;
        }
    }

    update()
    {
        this.pos.add(createVector(0, 1).setHeading(this.angle).mult(this.speed));
    }

    applyBound()
    {
        if(this.pos.x > this.bound[0])
            this.pos.x = this.bound[1];
        if(this.pos.x < this.bound[1])
            this.pos.x = this.bound[0];
        if(this.pos.y > this.bound[2])
            this.pos.y = this.bound[3];
        if(this.pos.y < this.bound[3])
            this.pos.y = this.bound[2];
    }

    draw()
    {
        let data = [
            createVector(15, 0).setHeading(this.angle + ((13 * PI) / 18)),
            createVector(20, 0).setHeading(this.angle),
            createVector(15, 0).setHeading(this.angle - ((13 * PI) / 18))
        ];
        stroke(0);
        strokeWeight(0);
        fill(3, this.gcolor, 252);
        quad(this.pos.x + data[0].x, -(this.pos.y + data[0].y), this.pos.x + data[1].x, -(this.pos.y + data[1].y), this.pos.x + data[2].x, -(this.pos.y + data[2].y));
    }
}