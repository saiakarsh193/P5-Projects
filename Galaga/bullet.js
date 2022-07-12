class Bullet extends Sprite
{
    constructor(x, y, params)
    {
        super('bullet', params);
        this.x = x;
        this.y = y;
        this.speed = 3;
        this.isUsed = false;
    }

    update()
    {
        this.y -= this.speed;
        if(this.y + this.frame_rows < 0)
            this.isUsed = true;
    }
}
