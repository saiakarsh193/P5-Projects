class Container
{
    constructor(count, bound)
    {
        this.count = count;
        this.bound = bound;
        this.boids = [];
        for(let i = 0;i < this.count;i ++)
            this.boids.push(new Boid(this.bound));
    }

    update()
    {
        let bdata = [];
        for(let i = 0;i < this.count;i ++)
            bdata.push([this.boids[i].pos.x, this.boids[i].pos.y, this.boids[i].angle]);
        for(let i = 0;i < this.count;i ++)
        {
            this.boids[i].calculateHeading(bdata);
            this.boids[i].update();
            this.boids[i].applyBound();
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