class robot
{
    constructor()
    {
        this.scale = 77;
        this.main_frame_position = createVector(0.25, 0.25);
        // total screen size is (20, 10)
        this.main_frame_size = createVector(19.25, 9.5);
        this.main_frame_bar_size = createVector(this.main_frame_size.x, this.main_frame_size.y * 0.03);
        this.sec_frame_position_factor = 0;
        this.sec_frame_size = createVector(this.main_frame_size.x * 0.2, this.main_frame_size.y);
        this.sec_frame_bar_size = createVector(this.main_frame_size.x * 0.01, this.main_frame_size.y);
        this.ter_frame_position_factor = 0;
        this.ter_frame_size = createVector(this.sec_frame_size.x, this.sec_frame_size.x);
        // this.ter_frame_bar_size = createVector(this.main_frame_size.x * 0.01, this.main_frame_size.y);
    }

    update(dT)
    {
        this.sec_frame_position_factor = constrain(this.sec_frame_position_factor + dT * 0.1, 0, 1)
    }

    draw()
    {
        noStroke();
        // main frame
        fill(0);
        this.rect(this.main_frame_position, this.main_frame_bar_size);
        this.rect(p5.Vector.add(this.main_frame_position, createVector(0, this.main_frame_size.y - this.main_frame_bar_size.y)), this.main_frame_bar_size);
        // secondary frame
        let sec_left = (this.main_frame_size.x - this.sec_frame_size.x) * this.sec_frame_position_factor + this.main_frame_position.x;
        this.rect(createVector(sec_left, this.main_frame_position.y), this.sec_frame_bar_size);
        this.rect(createVector(sec_left + this.sec_frame_size.x - this.sec_frame_bar_size.x, this.main_frame_position.y), this.sec_frame_bar_size);
        // tertiary frame
        let ter_left = (this.main_frame_size.x - this.sec_frame_size.x) * this.sec_frame_position_factor + this.main_frame_position.x;
        fill(100);
        this.rect(createVector(sec_left, this.main_frame_position.y), this.sec_frame_bar_size);
    }

    line(vec1, vec2)
    {
        line(vec1.x * this.scale, vec1.y * this.scale, vec2.x * this.scale, vec2.y * this.scale);
    }

    rect(vec, size)
    {
        rect(vec.x * this.scale, vec.y * this.scale, size.x * this.scale, size.y * this.scale);
    }
}