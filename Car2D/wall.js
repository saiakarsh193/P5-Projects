class Wall
{
    constructor()
    {
        this.walls = [
            [-350, -50, -250, 100],
            [-200, -50, -140, 60],
            [-250, 100, -100, 200],
            [-100, 200, 100, 230]
        ];
    }

    draw()
    {
        stroke(0);
        strokeWeight(2);
        noFill(0);
        for(let i = 0;i < this.walls.length;i ++)
            line(this.walls[i][0], -this.walls[i][1], this.walls[i][2], -this.walls[i][3]);
    }
}