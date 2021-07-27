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

    getCollide(objects)
    {
        let isCollide = false;
        objects.forEach((obj) =>
        {
            if(!(this.x >= obj[0] + obj[2] || this.x + this.width <= obj[0] || this.y <= obj[1] - obj[3] || this.y - this.height >= obj[1]))
                isCollide = true;
        });
        return isCollide;
    }

    autoJump(objects)
    {
        let leastDistance = -1;
        objects.forEach((obj) =>
        {
            if(obj[0] > this.x && (leastDistance == -1 || obj[0] - this.x < leastDistance))
                leastDistance = obj[0] - this.x;
        });
        if(leastDistance > 0 && leastDistance < 15)
        {
            this.jump();
        }
    }
}