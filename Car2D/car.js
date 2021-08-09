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
        this.sensordata = [];
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
        this.drawBody();
        this.drawRays();
        this.drawSensorData();
    }

    drawBody()
    {
        let temp = this.getShapes();
        stroke(0);
        strokeWeight(0);
        fill(255, 0, 0);
        quad(temp[0][0], -temp[0][1], temp[1][0], -temp[1][1], temp[2][0], -temp[2][1], temp[3][0], -temp[3][1]);
        fill(255, 255, 255);
        quad(temp[4][0], -temp[4][1], temp[5][0], -temp[5][1], temp[6][0], -temp[6][1], temp[7][0], -temp[7][1]);
        quad(temp[8][0], -temp[8][1], temp[9][0], -temp[9][1], temp[10][0], -temp[10][1], temp[11][0], -temp[11][1]);
        quad(temp[12][0], -temp[12][1], temp[13][0], -temp[13][1], temp[14][0], -temp[14][1], temp[15][0], -temp[15][1]);
    }

    drawRays()
    {
        let temp = this.getRays();
        strokeWeight(2);
        noFill();
        for(let i = 0;i < temp.length;i ++)
            line(temp[i][0], -temp[i][1], temp[i][2], -temp[i][3]);
    }

    drawSensorData()
    {
        let sx = 450;
        let sy = -200;
        stroke(0);
        strokeWeight(2);
        fill(255);
        rect(sx - 120, sy - 120, 250, 250);
        strokeWeight(1);
        fill(0);
        textSize(20);
        textAlign(CENTER,CENTER);
        text("SENSOR DATA", sx, sy);
        text(round(this.sensordata[0], 1), sx, sy - 100); // N
        text(round(this.sensordata[1], 1), sx, sy + 100); // S
        text(round(this.sensordata[2], 1), sx - 100, sy); // W
        text(round(this.sensordata[3], 1), sx + 100, sy); // E
        text(round(this.sensordata[4], 1), sx + 100, sy - 100); // NE
        text(round(this.sensordata[5], 1), sx + 100, sy + 100); // SE
        text(round(this.sensordata[6], 1), sx - 100, sy - 100); // NW
        text(round(this.sensordata[7], 1), sx - 100, sy + 100); // SW
    }

    getShapes()
    {
        return this.rotateArray([
            [this.x - 10, this.y + 20], [this.x + 10, this.y + 20], [this.x + 10, this.y - 20], [this.x - 10, this.y - 20],
            [this.x - 8, this.y + 10], [this.x + 8, this.y + 10], [this.x + 8, this.y + 5], [this.x - 8, this.y + 5],
            [this.x - 7, this.y + 19], [this.x - 3, this.y + 19], [this.x - 3, this.y + 17], [this.x - 7, this.y + 17],
            [this.x + 7, this.y + 19], [this.x + 3, this.y + 19], [this.x + 3, this.y + 17], [this.x + 7, this.y + 17]
        ]);
    }

    getRays()
    {
        let raylen = 100;
        let rayclen = 70;
        let dx = 15;
        let dy = 25;
        let temp = this.rotateArray([
            [this.x, this.y + dy], [this.x, this.y + dy + raylen], // N
            [this.x, this.y - dy], [this.x, this.y - dy - raylen], // S
            [this.x - dx, this.y], [this.x - dx - raylen, this.y], // W
            [this.x + dx, this.y], [this.x + dx + raylen, this.y], // E
            [this.x + dx, this.y + dy], [this.x + dx + rayclen, this.y + dy + rayclen], // NE
            [this.x + dx, this.y - dy], [this.x + dx + rayclen, this.y - dy - rayclen], // SE
            [this.x - dx, this.y + dy], [this.x - dx - rayclen, this.y + dy + rayclen], // NW
            [this.x - dx, this.y - dy], [this.x - dx - rayclen, this.y - dy - rayclen] // SW
        ]);
        let rays = [];
        for(let i = 0;i < temp.length;i += 2)
            rays.push([temp[i][0], temp[i][1], temp[i + 1][0], temp[i + 1][1]]);
        return rays;
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

    checkCollisions(walls, bounds=true)
    {
        let crash_distance = 3;
        walls = [...walls]; // duplicate the array
        let rays = this.getRays();
        if(bounds)
            walls.push([-cx, cy, cx, cy], [cx + 1, cy + 1, cx, -cy], [cx, -cy, -cx, -cy], [-cx - 1, -cy - 1, -cx, cy]);
        let sensordata = [];
        let doReset = false;
        for(let i = 0;i < rays.length;i ++)
        {
            let mins = 1;
            let a = [rays[i][0], rays[i][1]];
            let b = [rays[i][2] - rays[i][0], rays[i][3] - rays[i][1]];
            for(let j = 0;j < walls.length;j ++)
            {
                let s = this.intersect(a, b, [walls[j][0], walls[j][1]], [walls[j][2] - walls[j][0], walls[j][3] - walls[j][1]]);
                if(s != -1 && s < mins)
                    mins = s;
            }
            if(0 < mins && mins < 1)
            {
                let w = [a[0] + mins * b[0], (a[1] + mins * b[1])];
                circle(w[0], -w[1], 10);
                let dis = Math.sqrt(Math.pow(w[0] - a[0], 2) + Math.pow(w[1] - a[1], 2));
                if(dis < crash_distance)
                    doReset = true;
            }
            sensordata.push(mins);
        }
        this.sensordata = sensordata;
        if(doReset)
            return true;
        else
            return false;
    }

    intersect(a, b, c, d)
    {
        if(b[0] == d[0] && b[1] == d[1])
            return false;
        if(b[0] == 0) b[0] = 0.01;
        if(b[1] == 0) b[1] = 0.01;
        if(d[0] == 0) d[0] = 0.01;
        if(d[1] == 0) d[1] = 0.01;
        let t = ((c[0] - a[0]) * b[1] - (c[1] - a[1]) * b[0]) / (d[1] * b[0] - d[0] * b[1]);
        let s = ((c[0] - a[0]) + t * d[0]) / b[0];
        if(0 <= s && s <= 1 && 0 <= t && t <= 1)
            return s;
        else
            return -1;
    }
}