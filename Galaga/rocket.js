class Rocket extends Sprite
{
    constructor(params)
    {
        let sprite_map = [
            ".......w.......",
            ".......w.......",
            ".......w.......",
            "......www......",
            "......www......",
            "...r..www..r...",
            "...r..www..r...",
            "...w.wwrww.w...",
            "r..wbwrrrwbw..r",
            "r..bwwrwrwwb..r",
            "w..wwwwwwwww..w",
            "w.wwwwwwwwwww.w",
            "wwwwwrwwwrwwwww",
            "www.rrwwwrr.www",
            "ww..rr.w.rr..ww",
            "w......w......w",
        ];
        super(sprite_map, params);
        this.x = int((this.params.columns - this.smap_columns) / 2);
        this.y = this.params.rows - 1 - (this.smap_rows - 1);
        this.speed = 2;
        this.last_bullet_time = 0;
        this.bullet_time_interval = 0.1;
    }

    move(direction)
    {
        if(direction == 'left' && this.x - this.speed >= 0)
            this.x -= this.speed;
        else if(direction == 'right' && this.x + this.smap_columns - 1 <= this.params.columns - 1 - this.speed)
            this.x += this.speed;
        else if(direction == 'up' && this.y - this.speed >= 0)
            this.y -= this.speed;
        else if(direction == 'down' && this.y + this.smap_rows - 1 <= this.params.rows - 1 - this.speed)
            this.y += this.speed;
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
            if(this.params.enable_double_bullets)
            {
                bullets.push(new Bullet(this.x, this.y, this.params));
                bullets.push(new Bullet(this.x + this.smap_columns - 1, this.y, this.params));
            }
            else
                bullets.push(new Bullet(this.x + int((this.smap_columns - 1) / 2), this.y, this.params));
        }
    }
}
