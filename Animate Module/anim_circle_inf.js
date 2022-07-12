class AnimCircleInf
{
    constructor(sx, sy, radius, period, start_angle=0)
    {
        this.animCircle = new AnimCircle(sx, sy, radius, period, start_angle);
    }

    draw(diameter=20)
    {
        this.animCircle.draw(diameter);
        if(this.animCircle.frame == this.animCircle.period)
            this.animCircle.frame = 0;
    }
}
