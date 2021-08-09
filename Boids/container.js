class Container
{
    constructor(count, bound)
    {
        this.boids = [];
        this.count = count;
        this.bound = bound;
        this.speed = 5;
        this.size = 12;
        this.ndis = 50;
        this.spread = (2 * PI / 3);
        this.coeff = [46, 2, 1, 1, 50];
        for(let i = 0;i < this.count;i ++)
            this.boids.push(new Boid(this.speed, this.size, this.ndis, this.spread, this.coeff, this.bound));
    }

    update()
    {
        let bdata = [];
        for(let i = 0;i < this.count;i ++)
            bdata.push([this.boids[i].pos, this.boids[i].angle]);
        for(let i = 0;i < this.count;i ++)
        {
            this.boids[i].calculateHeading(bdata);
            this.boids[i].update();
            this.boids[i].applyBound(this.bound);
        }
    }

    draw(box = true)
    {
        if(box)
        {
            stroke(0);
            strokeWeight(0);
            fill(255);
            rect(this.bound[1], -this.bound[2], this.bound[0] - this.bound[1], this.bound[2] - this.bound[3]);
        }
        for(let i = 0;i < this.count;i ++)
            this.boids[i].draw();
    }
}