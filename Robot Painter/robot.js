class robot
{
    constructor()
    {
        // total screen size is (20, 10) for scale = 77
        this.scale = 77;
        this.segments = [5, 10];
        this.f1_dims = [19, 9];
        this.offset = [0.4, 0.5];
        this.f1_centre = [(this.f1_dims[0] / 2) + this.offset[0], (this.f1_dims[1] / 2) + this.offset[1]];
        this.f2_width = this.f1_dims[0] / this.segments[1];
        this.f2_x = this.f1_centre[0];
        this.f3_height = this.f1_dims[1] / this.segments[0];
        this.f3_y = this.f1_centre[1];
        this.current_coord = [0, 0];
        this.current_seg = [0, 0];
        this.target_seg = [0, 0];
        this.f23ToSeg(this.current_seg);
    }

    f23ToSeg(seg)
    {
        this.f2_x = this.cmap(seg[1], 0, this.segments[1] - 1, this.f1_centre[0] - (this.f1_dims[0] / 2) + (this.f2_width / 2), this.f1_centre[0] + (this.f1_dims[0] / 2) - (this.f2_width / 2));
        this.f3_y = this.cmap(seg[0], 0, this.segments[0] - 1, this.f1_centre[1] - (this.f1_dims[1] / 2) + (this.f3_height / 2), this.f1_centre[1] + (this.f1_dims[1] / 2) - (this.f3_height / 2));
    }

    neatCoord(coord)
    {
        coord[0] = this.cmap(coord[0] / this.scale, this.f1_centre[0] - (this.f1_dims[0] / 2), this.f1_centre[0] + (this.f1_dims[0] / 2), 0, this.f1_dims[0]);
        coord[1] = this.cmap(coord[1] / this.scale, this.f1_centre[1] - (this.f1_dims[1] / 2), this.f1_centre[1] + (this.f1_dims[1] / 2), 0, this.f1_dims[1]);
        return coord;
    }

    getSeg(coord)
    {
        return [int(coord[1] * this.segments[0] / this.f1_dims[1]), int(coord[0] * this.segments[1] / this.f1_dims[0])];
    }

    animateArms()
    {
        let delta = [this.target_seg[0] - this.current_seg[0], this.target_seg[1] - this.current_seg[1]];
        let rate = 0.1;
        let threshold = 0.04;
        if(Math.abs(delta[0]) < threshold)
        {
            this.current_seg[0] = this.target_seg[0];
        }
        else
        {
            this.current_seg[0] += rate * delta[0];
        }
        if(Math.abs(delta[1]) < threshold)
        {
            this.current_seg[1] = this.target_seg[1];
        }
        else
        {
            this.current_seg[1] += rate * delta[1];
        }
        this.f23ToSeg(this.current_seg);
        this.current_coord[0] = constrain(this.current_coord[0] + this.f1_centre[0] - (this.f1_dims[0] / 2), this.f2_x - (this.f2_width / 2), this.f2_x + (this.f2_width / 2)) - (this.f1_centre[0] - (this.f1_dims[0] / 2));
        this.current_coord[1] = constrain(this.current_coord[1] + this.f1_centre[1] - (this.f1_dims[1] / 2), this.f3_y - (this.f3_height / 2), this.f3_y + (this.f3_height / 2)) - (this.f1_centre[1] - (this.f1_dims[1] / 2));
        if(this.current_seg[0] == this.target_seg[0] && this.current_seg[1] == this.target_seg[1])
            return true;
        else
            return false;
    }

    updateTarget(coord)
    {
        this.current_coord = this.neatCoord([...coord]);
        this.target_seg = this.getSeg(this.current_coord);
    }

    draw()
    {
        rectMode(CENTER);
        noStroke();
        fill(200);
        this.rect(this.f1_centre[0], this.f1_centre[1], this.f1_dims[0], this.f1_dims[1]);
        stroke(0);
        strokeWeight(2);
        fill(0);
        this.rect(this.f1_centre[0], this.f1_centre[1] - (this.f1_dims[1] / 2) + 0.15, this.f1_dims[0], 0.15 * 2);
        this.rect(this.f1_centre[0], this.f1_centre[1] + (this.f1_dims[1] / 2) - 0.15, this.f1_dims[0], 0.15 * 2);
        fill(255, 41, 201);
        this.rect(this.f2_x - (this.f2_width / 2) + 0.1, this.f1_centre[1], 0.1 * 2, this.f1_dims[1]);
        this.rect(this.f2_x + (this.f2_width / 2) - 0.1, this.f1_centre[1], 0.1 * 2, this.f1_dims[1]);
        fill(34, 198, 240);
        this.rect(this.f2_x, this.f3_y - (this.f3_height / 2) + 0.1, this.f2_width, 0.1 * 2);
        this.rect(this.f2_x, this.f3_y + (this.f3_height / 2) - 0.1, this.f2_width, 0.1 * 2);
        this.rect(this.current_coord[0] + this.f1_centre[0] - (this.f1_dims[0] / 2), this.f3_y, 0.1, this.f3_height);
        this.rect(this.f2_x, this.current_coord[1] + this.f1_centre[1] - (this.f1_dims[1] / 2), this.f2_width, 0.1);
        this.rect(this.current_coord[0] + this.f1_centre[0] - (this.f1_dims[0] / 2), this.current_coord[1] + this.f1_centre[1] - (this.f1_dims[1] / 2), 0.3, 0.3);
        rectMode(CORNER);
    }

    cmap(n, a, b, A, B)
    {
        n = constrain(n, a, b);
        return map(n, a, b, A, B);
    }

    line(x1, y1, x2, y2)
    {
        line(x1 * this.scale, y1 * this.scale, x2 * this.scale, y2 * this.scale);
    }

    rect(x, y, w, h)
    {
        rect(x * this.scale, y * this.scale, w * this.scale, h * this.scale);
    }

    lineV(vec1, vec2)
    {
        line(vec1.x * this.scale, vec1.y * this.scale, vec2.x * this.scale, vec2.y * this.scale);
    }

    rectV(vec, size)
    {
        rect(vec.x * this.scale, vec.y * this.scale, size.x * this.scale, size.y * this.scale);
    }
}