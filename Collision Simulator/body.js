class Body
{
    constructor(transform, settings)
    {
        this.transform = transform;
        this.settings = settings;
        this.state = JSON.parse(JSON.stringify(this.settings));
        this.update();
    }

    update()
    {
        if("collider" in this.state)
        {
            this.state["collider"]["parameters"][0] = this.settings["collider"]["parameters"][0] + this.transform[0];
            this.state["collider"]["parameters"][1] = this.settings["collider"]["parameters"][1] + this.transform[1];
        }
    }

    onCollide(other)
    {
        print("Collided with ", other);
    }

    draw()
    {
        if("collider" in this.state)
        {
            this.drawCollider();
        }
    }

    drawCollider()
    {
        stroke(100, 255, 0);
        strokeWeight(2);
        noFill(0);
        if(this.state["collider"]["type"] == "circle")
        {
            circle(this.state["collider"]["parameters"][0], -this.state["collider"]["parameters"][1], 2 * this.state["collider"]["parameters"][2]);
        }
    }
}