class Dino
{
    constructor(scaler = 10)
    {
        this.sheight = 10;
        this.cheight = 5;
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

    jump(key = true, impulse = 16)
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
        for(var i = 0;i < objects.length;i ++)
        {
            if(!(this.x >= objects[i][0] + objects[i][2] || this.x + this.width <= objects[i][0] || this.y <= objects[i][1] - objects[i][3] || this.y - this.height >= objects[i][1]))
                return true;
        }
        return false;
    }

    autoInput(objects)
    {
        let ind = -1;
        for(var i = 0;i < objects.length;i ++)
        {
            if((objects[i][0] <= this.x && this.x <= objects[i][0] + objects[i][2]) || objects[i][0] > this.x)
            {
                ind = i;
                break;
            }
        }
        if(ind >= 0)
        {
            fill(255, 0, 0);
            strokeWeight(0);
            circle(objects[ind][0] * this.scaler, -objects[ind][1] * this.scaler, 25);
            let leastDistance = objects[ind][0] - this.x;
            let width = objects[ind][2];
            let type = objects[ind][4];
            if(type == 0 && leastDistance < 15)
            {
                this.jump(true);
            }
            else if(type == 1 && leastDistance < 15)
            {
                this.jump(true);
            }
            else if(type == 2 && leastDistance + width < 15)
            {
                this.crouch(true);
            }
            else if(type == 3 && leastDistance < 10)
            {
                this.jump(true);
            }
        }
    }
}