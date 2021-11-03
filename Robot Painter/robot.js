class robot
{
    constructor()
    {
        // total screen size is (20, 10) for scale = 77
        this.scale = 77;
        this.segments = [5, 10];
        this.f1_dims = [19, 9];
        this.f1_centre = [(this.f1_dims[0] / 2) + 0.4, (this.f1_dims[1] / 2) + 0.5];
        this.f2_width = this.f1_dims[0] / this.segments[1];
        this.f2_x = this.f1_centre[0];
        this.f3_height = this.f1_dims[1] / this.segments[0];
        this.f3_y = this.f1_centre[1];
        this.current_seg = [0, 0];
        this.current_coord = [0, 0];
    }

    f23ToSeg(seg)
    {
        let row = seg[0];
        let col = seg[1];
        this.f2_x = this.cmap(col, 0, this.segments[1] - 1, this.f1_centre[0] - (this.f1_dims[0] / 2) + (this.f2_width / 2), this.f1_centre[0] + (this.f1_dims[0] / 2) - (this.f2_width / 2));
        this.f3_y = this.cmap(row, 0, this.segments[0] - 1, this.f1_centre[1] - (this.f1_dims[1] / 2) + (this.f3_height / 2), this.f1_centre[1] + (this.f1_dims[1] / 2) - (this.f3_height / 2));
    }

    neatCoord(coord)
    {
        coord[0] = (coord[0] / this.scale);
        coord[1] = (coord[1] / this.scale);
        coord[0] = this.cmap(coord[0], this.f1_centre[0] - (this.f1_dims[0] / 2), this.f1_centre[0] + (this.f1_dims[0] / 2), 0, this.f1_dims[0]);
        coord[1] = this.cmap(coord[1], this.f1_centre[1] - (this.f1_dims[1] / 2), this.f1_centre[1] + (this.f1_dims[1] / 2), 0, this.f1_dims[1]);
        return coord;
    }

    getSeg(coord)
    {
        return [int(coord[1] * this.segments[0] / this.f1_dims[1]), int(coord[0] * this.segments[1] / this.f1_dims[0])];
    }

    update(coord)
    {
        this.current_coord = this.neatCoord(coord);
        this.current_seg = this.getSeg(this.current_coord);
        this.f23ToSeg(this.current_seg);
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