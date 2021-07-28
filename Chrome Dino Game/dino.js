class Dino
{
    constructor(scaler = 10)
    {
        this.sheight = 10;
        this.cheight = 5;
        this.height = this.sheight;
        this.swidth = 5;
        this.cwidth = 10;
        this.width = this.swidth;
        this.x = 0;
        this.y = this.height;
        this.vy = 0;
        this.gravity = -10;
        this.scaler = scaler;
        this.isJump = false;
        this.isCrouch = false;
    }

    draw()
    {
        fill(255, 0, 0);
        strokeWeight(0);
        rect(this.x * this.scaler, -this.y * this.scaler, this.width * this.scaler, this.height * this.scaler);
    }

    update(dT = 0.1)
    {
        this.applyInput();
        this.vy += this.gravity * dT;
        this.y += this.vy * dT;
        if(this.y - this.height < 0)
        {
            this.vy = 0;
            this.y = this.height;
        }
    }

    jump(impulse = 16)
    {
        this.vy = impulse;
        this.height = this.sheight;
        this.width = this.swidth;
        this.y = this.height;
    }

    crouch()
    {
        this.height = this.cheight;
        this.width = this.cwidth;
        this.y = this.height;
    }

    getCollide(objects, tolerance = -0.2)
    {
        for(var i = 0;i < objects.length;i ++)
        {
            if(Math.max(this.x - (objects[i][0] + objects[i][2]), objects[i][0] - (this.x + this.width), (objects[i][1] - objects[i][3]) - this.y, (this.y - this.height) - objects[i][1]) < tolerance)
                return true;
        }
        return false;
    }

    setInput(jump, crouch)
    {
        this.isJump = jump;
        this.isCrouch = crouch;
    }

    applyInput()
    {
        if(this.y - this.height == 0)
        {
            this.height = this.sheight;
            this.width = this.swidth;
            if(this.isJump)
                this.jump();
            else if(this.isCrouch)
                this.crouch();
        }
    }

    autoInput(objects)
    {
        this.setInput(false, false);
        for(var i = 0;i < objects.length;i ++)
        {
            if((objects[i][0] <= this.x && this.x <= objects[i][0] + objects[i][2]) || objects[i][0] > this.x)
            {
                fill(255, 0, 0);
                strokeWeight(0);
                circle(objects[i][0] * this.scaler, -objects[i][1] * this.scaler, 25);
                let leastDistance = objects[i][0] - this.x;
                let width = objects[i][2];
                let type = objects[i][4];
                if(type == 0 && leastDistance < 15)
                    this.setInput(true, false);
                else if(type == 1 && leastDistance < 15)
                    this.setInput(true, false);
                else if(type == 2 && leastDistance + width < 15)
                    this.setInput(false, true);
                else if(type == 3 && leastDistance < 10)
                    this.setInput(true, false);
                break;
            }
        }
    }
}