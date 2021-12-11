class Body
{
    constructor(x, y, vx, vy)
    {
        this.position = createVector(x, y);
        this.velocity = createVector(vx, vy);
    }

    update(dT)
    {
        this.position.add(p5.Vector.mult(this.velocity, dT));
    }

    list()
    {
        return [this.position.x, this.position.y];
    }
}

class Holder
{
    constructor(count, radius)
    {
        this.bodies = [];
        this.count = count;
        for(let i = 0;i < this.count;i ++)
            this.bodies.push(new Body((random() - 0.5) * 2 * radius, (random() - 0.5) * 2 * radius, random() * 6, random() * 8));
    }

    update(dT)
    {
        for(let i = 0;i < this.count;i ++)
            this.bodies[i].update(dT=dT);
    }

    list()
    {
        let data = [];
        for(let i = 0;i < this.count;i ++)
            data.push(this.bodies[i].list());
        return data;
    }
}