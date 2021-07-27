class Dino
{
    constructor(scaler = 10)
    {
        this.sheight = 10;
        this.cheight = 3;
        this.height = this.sheight;
        this.width = 5;
        this.x = 0;
        this.y = this.height;
        this.vy = 0;
        this.gravity = -10;
        this.scaler = scaler;
    }

    draw()
    {
        fill(255, 0, 0);
        strokeWeight(0);
        rect(this.x * this.scaler, -this.y * this.scaler, this.width * this.scaler, this.height * this.scaler);
    }

    update(dT = 0.1)
    {
        this.vy += this.gravity * dT;
        this.y += this.vy * dT;
        if(this.y - this.height < 0)
        {
            this.vy = 0;
            this.y = this.height;
        }
    }

    jump(key = true, impulse = 15)
    {
        if(this.y - this.height == 0 && key)
        {
            this.vy = impulse;
            this.height = this.sheight;
            this.y = this.height;
        }
    }

    crouch(key = false)
    {
        if(this.y - this.height == 0)
        {
            this.height = key ? this.cheight : this.sheight;
            this.y = this.height;
        }
    }
}