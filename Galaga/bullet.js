class Bullet extends Sprite
{
    constructor(x, y, params)
    {
        let sprite_map = [
            "y",
            "w",
        ];
        super(sprite_map, params);
        this.x = x;
        this.y = y;
        this.speed = 3;
        this.isUsed = false;
    }

    update()
    {
        this.y -= this.speed;
        if(this.y + this.smap_rows < 0)
            this.isUsed = true;
    }
}
