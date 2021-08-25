class Wall
{
    constructor(points)
    {
        this.walls = [
            [-350, -50, -250, 100],
            [-200, -50, -140, 60],
            [-250, 100, -100, 200],
            [-140, 60, -50, 120],
            [-100, 200, 100, 230],
            [-50, 120, 100, 140]
        ];
        this.walls = this.parse(points);
    }

    parse(points)
    {
        let l = 140;
        let temp = [];
        for(let i = 0;i < points.length - 1;i ++)
        {
            temp.push([points[i][0], points[i][1], points[i + 1][0], points[i + 1][1]]);
            let dir = createVector(points[i + 1][0] - points[i][0], points[i + 1][1] - points[i][1]).normalize().rotate(-PI / 2);
            temp.push([points[i][0] + l * dir.x, points[i][1] + l * dir.y, points[i + 1][0] + l * dir.x, points[i + 1][1] + l * dir.y]);
        }
        for(let i = 3;i < temp.length;i += 2)
        {
            let ax = (temp[i][0] + temp[i - 2][2]) / 2;
            let ay = (temp[i][1] + temp[i - 2][3]) / 2;
            temp[i][0] = ax;
            temp[i - 2][2] = ax;
            temp[i][1] = ay;
            temp[i - 2][3] = ay;
        }
        return temp;
    }

    draw()
    {
        stroke(0);
        strokeWeight(0);
        fill(255);
        for(let i = 0;i < this.walls.length;i += 2)
            quad(this.walls[i][0], -this.walls[i][1], this.walls[i][2], -this.walls[i][3], this.walls[i + 1][2], -this.walls[i + 1][3], this.walls[i + 1][0], -this.walls[i + 1][1]);
        strokeWeight(2);
        noFill(0);
        for(let i = 0;i < this.walls.length;i ++)
            line(this.walls[i][0], -this.walls[i][1], this.walls[i][2], -this.walls[i][3]);
    }
}