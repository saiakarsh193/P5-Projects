class Obstacle
{
    constructor(bound, scaler = 10)
    {
        this.rx = (bound / scaler);
        this.lx = -this.rx;
        this.scaler = scaler;
        this.speed = -0.8;
        this.objects = [];
    }
    
    draw()
    {
        fill(0);
        strokeWeight(0);
        this.objects.forEach((obj) =>
        {
            rect(obj[0] * this.scaler, -obj[1] * this.scaler, obj[2] * this.scaler, obj[3] * this.scaler);
        });
    }

    add()
    {
        if((this.objects.length > 0 && this.objects[this.objects.length - 1][0] < 25) || this.objects.length == 0)
        {
            this.objects.push([this.rx, 3, 5, 3]);
        }
    }

    update()
    {
        this.objects.forEach((obj) =>
        {
            obj[0] += this.speed;
        });
        if(this.objects.length > 0 && this.objects[0][0] < this.lx)
        {
            this.objects.splice(0, 1);
        }
        if(this.objects.length < 5)
        {
            this.add();
        }
    }

    getTranscript()
    {
        return this.objects;
    }
}