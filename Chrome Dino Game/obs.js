class Obstacle
{
    constructor(bound, cactus_small_sp, cactus_big_sp, bird_sp, scaler = 10)
    {
        this.rx = (bound / scaler);
        this.lx = -this.rx;
        this.scaler = scaler;
        this.speed = -0.8;
        this.acceleration = 0;
        // this.acceleration = -0.002;
        // this.acceleration = -0.006;
        this.objects = [];
        this.cactus_small_sp = cactus_small_sp;
        this.cactus_big_sp = cactus_big_sp;
        this.bird_sp = bird_sp;
    }
    
    draw()
    {
        this.objects.forEach((obj) =>
        {
            if(obj[4] == 0)
                image(this.cactus_small_sp[0], obj[0] * this.scaler, -obj[1] * this.scaler, obj[2] * this.scaler, obj[3] * this.scaler);
            else if(obj[4] == 1)
                image(this.cactus_big_sp[0], obj[0] * this.scaler, -obj[1] * this.scaler, obj[2] * this.scaler, obj[3] * this.scaler);
            else if(obj[4] == 2)
                image(this.bird_sp[0], obj[0] * this.scaler, -obj[1] * this.scaler, obj[2] * this.scaler, obj[3] * this.scaler);
            else if(obj[4] == 3)
                image(this.bird_sp[1], obj[0] * this.scaler, -obj[1] * this.scaler, obj[2] * this.scaler, obj[3] * this.scaler);
            else
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
                if(ch == 0) // Small cactus  [x, y, width, height, type]
                    this.objects.push([this.rx,  4.7, 2.5, 4.7, ch]);
                else if(ch == 1) // Big cactus
                    this.objects.push([this.rx,  6.6, 3.5, 6.6, ch]);
                else if(ch == 2) // Low bird
                    this.objects.push([this.rx,  4, 5, 3.5, ch]);
                else if(ch == 3) // High bird
                    this.objects.push([this.rx, 8, 5, 3.5, ch]);
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