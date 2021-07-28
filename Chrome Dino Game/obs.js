class Obstacle
{
    constructor(bound, scaler = 10)
    {
        this.rx = (bound / scaler);
        this.lx = -this.rx;
        this.scaler = scaler;
        this.speed = -0.8;
        // this.acceleration = 0;
        // this.acceleration = -0.002;
        this.acceleration = -0.006;
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
            let prb = Math.floor(Math.random() * 100);
            if(prb < 3)
            {
                let ch = Math.floor(Math.random() * 4);
                if(ch == 0) // Small obs  [x, y, width, height, type]
                    this.objects.push([this.rx,  5, 5, 5, 0]);
                else if(ch == 1) // Low obs
                    this.objects.push([this.rx,  6, 5, 3, 1]);
                else if(ch == 2) // High obs
                    this.objects.push([this.rx, 12, 5, 3, 2]);
                else if(ch == 3) // Big obs
                    this.objects.push([this.rx,  5, 8, 5, 3]);
            }
        }
    }

    update(dT = 0.1)
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
        this.speed += this.acceleration * dT;
    }

    getTranscript()
    {
        return this.objects;
    }
}