class Body
{
    constructor(x, y, vx, vy)
    {
        this.position = createVector(x, y);
        this.velocity = createVector(vx, vy);
        this.color_type = Math.round(random() * 5);
        this.shape_type = Math.round(random() * 3);
    }

    update(dT)
    {
        this.position.add(p5.Vector.mult(this.velocity, dT));
    }

    list()
    {
        return [this.position.mag(), this.ang(this.position), this.velocity.mag(), this.ang(this.velocity), this.color_type, this.shape_type];
    }

    ang(vec)
    {
        return (degrees(Math.atan2(vec.y, vec.x)) + 360) % 360;
    }
}

class Holder
{
    constructor(count, range, vmax)
    {
        this.bodies = [];
        this.count = count;
        for(let i = 0;i < this.count;i ++)
            this.bodies.push(new Body((random() - 0.5) * 2 * range, (random() - 0.5) * 2 * range, random() * vmax, random() * vmax));
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