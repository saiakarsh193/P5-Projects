class Car
{
    constructor()
    {
        this.max_speed = 6;
        this.max_ang_speed = 0.05;
        this.friction = 0.2;
        this.reset();
    }

    reset()
    {
        this.x = 0;
        this.y = 0;
        this.ang = 0;
        this.speed = 0;
        this.ang_speed = 0;
    }

    input(forward, backward, left, right)
    {
        if(forward)
            this.speed = this.max_speed;
        else if(backward)
            this.speed = -this.max_speed;
        if((forward || backward) && (left || right))
        {
            if((left && forward) || (right && backward))
                this.ang_speed = -this.max_ang_speed;
            else
                this.ang_speed = this.max_ang_speed;
        }
        else
            this.ang_speed = 0;
    }

    update()
    {
        this.speed += -this.speed * this.friction;
        this.x += this.speed * sin(this.ang);
        this.y += this.speed * cos(this.ang);
        this.ang += this.ang_speed;
    }

    draw()
    {
        let data = [[this.x - 10, this.y + 20], [this.x + 10, this.y + 20], [this.x + 10, this.y - 20], [this.x - 10, this.y - 20],
                    [this.x - 8, this.y + 10], [this.x + 8, this.y + 10], [this.x + 8, this.y + 5], [this.x - 8, this.y + 5],
                    [this.x - 7, this.y + 19], [this.x - 3, this.y + 19], [this.x - 3, this.y + 17], [this.x - 7, this.y + 17],
                    [this.x + 7, this.y + 19], [this.x + 3, this.y + 19], [this.x + 3, this.y + 17], [this.x + 7, this.y + 17]];
        let temp = this.rotateArray(data);
        stroke(0);
        strokeWeight(0);
        fill(255, 0, 0);
        quad(temp[0][0], -temp[0][1], temp[1][0], -temp[1][1], temp[2][0], -temp[2][1], temp[3][0], -temp[3][1]);
        fill(255, 255, 255);
        quad(temp[4][0], -temp[4][1], temp[5][0], -temp[5][1], temp[6][0], -temp[6][1], temp[7][0], -temp[7][1]);
        quad(temp[8][0], -temp[8][1], temp[9][0], -temp[9][1], temp[10][0], -temp[10][1], temp[11][0], -temp[11][1]);
        quad(temp[12][0], -temp[12][1], temp[13][0], -temp[13][1], temp[14][0], -temp[14][1], temp[15][0], -temp[15][1]);
    }

    rotateArray(array)
    {
        for(let i = 0;i < array.length;i ++)
            array[i] = this.rotate(array[i]);
        return array;
    }

    rotate(coor)
    {
        let x = coor[0];
        let y = coor[1];
        x -= this.x;
        y -= this.y;
        var nx = x * cos(this.ang) + y * sin(this.ang);
        var ny = x * -sin(this.ang) + y * cos(this.ang);
        nx += this.x;
        ny += this.y;
        return [nx, ny];
    }

    checkBounds()
    {
        let walls = [
            [-cx, cy, cx, cy],
            [cx + 1, cy + 1, cx, -cy],
            [cx, -cy, -cx, -cy],
            [-cx - 1, -cy - 1, -cx, cy]];
        return this.checkCollisions(walls);
    }

    checkCollisions(walls)
    {
        let data = [
            [this.x - 10, this.y + 20, this.x + 10, this.y + 20], 
            [this.x + 10, this.y + 20, this.x + 10, this.y - 20],
            [this.x + 10, this.y - 20, this.x - 10, this.y - 20],
            [this.x - 10, this.y - 20, this.x - 10, this.y + 20]];
        for(let i = 0;i < walls.length;i ++)
        {
            for(let j = 0;j < 4;j ++)
            {
                if(this.intersect(walls[i], data[j]))
                    return true;
            }
        }
        return false;
    }

    intersect(line1, line2)
    {
        let a1 = line1[0];
        let a2 = line1[1];
        let b1 = line1[2];
        let b2 = line1[3];
        let c1 = line2[0];
        let c2 = line2[1];
        let d1 = line2[2];
        let d2 = line2[3];
        if((b1 - a1) == (d1 - c1) && (b2 - a2) == (d2 - c2))
            return false;
        let t = ((c1 - a1) * (b2 - a2) - (c2 - a2) * (b1 - a1)) / ((d2 - c2) * (b1 - a1) - (d1 - c1) * (b2 - a2));
        let s = ((c1 - a1) + t * (d1 - c1)) / (b1 - a1);
        if(0 <= s && s <= 1 && 0 <= t && t <= 1)
            return true;
        else
            return false;
    }
}