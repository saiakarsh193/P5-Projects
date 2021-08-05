class Dino
{
    constructor(dino_stand_sp, dino_crouch_sp, scaler = 10)
    {
        this.swidth = 5.6;
        this.sheight = 6;
        this.cwidth = 7.9;
        this.cheight = 3.8;
        this.width = this.swidth;
        this.height = this.sheight;
        this.x = -(this.width / 2);
        this.y = this.height;
        this.vy = 0;
        this.gravity = -10;
        this.scaler = scaler;
        this.isJump = false;
        this.isCrouch = false;
        this.dino_stand_sp = dino_stand_sp;
        this.dino_crouch_sp = dino_crouch_sp;
    }

    draw()
    {
        if(this.width == this.cwidth)
            image(this.dino_crouch_sp[0], this.x * this.scaler, -this.y * this.scaler, this.width * this.scaler, this.height * this.scaler);
        else
            image(this.dino_stand_sp[0], this.x * this.scaler, -this.y * this.scaler, this.width * this.scaler, this.height * this.scaler);
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

    jump(impulse = 14)
    {
        this.vy = impulse;
        this.height = this.sheight;
        this.width = this.swidth;
    }

    crouch()
    {
        this.height = this.cheight;
        this.width = this.cwidth;
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
            this.y = this.height;
            this.x = -(this.width / 2);
        }
    }

    autoInput(objects)
    {
        this.setInput(false, false);
        for(var i = 0;i < objects.length;i ++)
        {
            if((objects[i][0] <= this.x && this.x <= objects[i][0] + objects[i][2]) || objects[i][0] > this.x)
            {
                let dis = objects[i][0] - (this.x + this.width);
                if(0 <= dis && dis <= 40)
                {
                    let col = (dis > 10) ? color(0, 255, 0) : color(255, 0, 0);
                    fill(col);
                    stroke(col);
                    strokeWeight(0);
                    circle(objects[i][0] * this.scaler, -objects[i][1] * this.scaler, 15);
                    circle((this.x + this.width) * this.scaler, -this.y * this.scaler, 15);
                    noFill(0);
                    strokeWeight(3);
                    line((this.x + this.width) * this.scaler, -this.y * this.scaler, objects[i][0] * this.scaler, -objects[i][1] * this.scaler);
                }
                let leastDistance = objects[i][0] - this.x;
                let width = objects[i][2];
                let type = objects[i][4];
                if((type == 0 || type == 2) && leastDistance < 10) // small cactus, low bird
                    this.setInput(true, false);
                else if(type == 1 && leastDistance < 10) // big cactus
                    this.setInput(true, false);
                else if(type == 3 && leastDistance + width < 15) // high bird
                    this.setInput(false, true);
                break;
            }
        }
    }
}