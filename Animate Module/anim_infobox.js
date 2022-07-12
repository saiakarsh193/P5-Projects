class AnimInfoBox extends AnimBase
{
    constructor(sx, sy, w, h, duration, info_title, info_description, offset=0)
    {
        super(duration, offset);
        this.add('x', sx);
        this.add('y', sy);
        this.add('width', 0, w);
        this.add('height', 0, h);
        this.info_title = info_title;
        this.info_description = info_description;
    }

    draw()
    {
        noFill();
        stroke(255);
        strokeWeight(2);
        rect(this.get('x'), -this.get('y'), this.get('width'), this.get('height'));
        fill(255, 255, 255, 100);
        rect(this.get('x'), -this.get('y'), this.get('width'), this.get('height') / 4);
        if(this.frame > this.duration)
        {
            textAlign(LEFT, TOP);
            textSize(20);
            fill(255);
            noStroke();
            text(this.info_title, this.get('x') + 5, -this.get('y') + 5, this.get('width'), (this.get('height') / 4));
            textSize(15);
            text(this.info_description, this.get('x') + 5, -this.get('y') + 5 + (this.get('height') / 4), this.get('width'), (3 * this.get('height') / 4));
        }
        this.frame ++;
    }
}
