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
    }

    f23ToSeg(row, col)
    {
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

    update(coord)
    {
        coord = this.neatCoord(coord);
        let segs = [int(coord[1] * this.segments[0] / this.f1_dims[1]), int(coord[0] * this.segments[1] / this.f1_dims[0])];
        this.f23ToSeg(segs[0], segs[1]);
    }

    draw()
    {
        stroke(0);
        strokeWeight(2);
        rectMode(CENTER);
        fill(100)
        this.rect(this.f1_centre[0], this.f1_centre[1], this.f1_dims[0], this.f1_dims[1]);
        fill(255, 41, 201);
        this.rect(this.f1_centre[0], this.f1_centre[1] - (this.f1_dims[1] / 2) + 0.15, this.f1_dims[0], 0.15 * 2);
        this.rect(this.f1_centre[0], this.f1_centre[1] + (this.f1_dims[1] / 2) - 0.15, this.f1_dims[0], 0.15 * 2);
        this.rect(this.f2_x - (this.f2_width / 2) + 0.1, this.f1_centre[1], 0.1 * 2, this.f1_dims[1]);
        this.rect(this.f2_x + (this.f2_width / 2) - 0.1, this.f1_centre[1], 0.1 * 2, this.f1_dims[1]);
        this.rect(this.f2_x, this.f3_y - (this.f3_height / 2) + 0.1, this.f2_width, 0.1 * 2);
        this.rect(this.f2_x, this.f3_y + (this.f3_height / 2) - 0.1, this.f2_width, 0.1 * 2);
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