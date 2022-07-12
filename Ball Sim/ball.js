class Ball
{
    constructor(x, y, radius, scale, friction)
    {
        this.position_x = x;
        this.position_y = y;
        this.velocity_x = 0;
        this.velocity_y = 0;
        this.radius = radius;
        this.scale = scale;
        this.friction = friction;
        this.threshold_vel = 0.4;
    }

    draw()
    {
        noStroke();
        fill(255, 255, 255);
        circle(this.position_x * this.scale, -this.position_y * this.scale, 2 * this.radius * this.scale);
        // textSize(40);
        // text(int(Math.sqrt(this.velocity_x * this.velocity_x + this.velocity_y * this.velocity_y)), (this.position_x + 20) * this.scale, -this.position_y * this.scale);
    }

    update(dT)
    {
        this.position_x += this.velocity_x * dT;
        this.position_y += this.velocity_y * dT;
        this.velocity_x += -this.velocity_x * this.friction * dT;
        this.velocity_y += -this.velocity_y * this.friction * dT;
        if(Math.abs(this.velocity_x) < this.threshold_vel && Math.abs(this.velocity_y) < this.threshold_vel)
            this.stop();
    }

    impulse(vx, vy)
    {
        this.velocity_x += vx;
        this.velocity_y += vy;
    }

    stop()
    {
        this.velocity_x = 0;
        this.velocity_y = 0;
    }
}