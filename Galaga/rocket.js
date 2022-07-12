class Rocket extends Sprite
{
    constructor(params)
    {
        let sprite_map = [
            "..r..",
            ".rrr.",
            ".rgr.",
            "rgggr",
            ".b.b."
        ];
        super(sprite_map, params);
        this.x = int((this.params.columns - this.smap_columns) / 2);
        this.y = this.params.rows - 1 - (this.smap_rows - 1);
        this.last_bullet_time = 0;
        this.bullet_time_interval = 0.1;
    }

    move(direction)
    {
        if(direction == 'left' && this.x > 0)
            this.x --;
        else if(direction == 'right' && this.x + this.smap_columns - 1 < this.params.columns - 1)
            this.x ++;
        else if(direction == 'up' && this.y > 0)
            this.y --;
        else if(direction == 'down' && this.y + this.smap_rows - 1 < this.params.rows - 1)
            this.y ++;
    }

    handleEvents(bullets, ctime)
    {
        // player movement
        if(keyIsDown(65)) // a
            this.move('left');
        else if(keyIsDown(68)) // d
            this.move('right');
        else if(keyIsDown(87) && this.params.enable_vertical_move) // w
            this.move('up');
        else if(keyIsDown(83) && this.params.enable_vertical_move) // s
            this.move('down');
        // shoot bullets
        if(keyIsDown(32) && ctime - this.last_bullet_time > this.bullet_time_interval) // spacebar
        {
            this.last_bullet_time = ctime;
            bullets.push(new Bullet(this.x, this.y, this.params));
            bullets.push(new Bullet(this.x + this.smap_columns - 1, this.y, this.params));
        }
    }
}
