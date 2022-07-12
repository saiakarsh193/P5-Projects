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
        this.isUsed = false;
    }

    update()
    {
        this.y --;
        if(this.y + this.smap_rows < 0)
            this.isUsed = true;
    }
}
