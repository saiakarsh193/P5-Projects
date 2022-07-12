class AnimCircle extends AnimBase
{
    constructor(sx, sy, radius, period, start_angle=0)
    {
        start_angle %= 360;
        if(start_angle < 0)
            start_angle += 360;
        let offset = int((start_angle / 360) * period);
        super(period, offset);
        this.add('x', sx);
        this.add('y', sy);
        this.add('radius', radius);
        this.add('angle', 0, 359);
        this.period = period;
    }

    draw(diameter=20)
    {
        let radangle = map(this.get('angle'), 0, 180, 0, Math.PI);
        circle(this.get('x') + this.get('radius') * Math.cos(radangle), -(this.get('y') + this.get('radius') * Math.sin(radangle)), diameter);
        this.frame ++;
    }
}
