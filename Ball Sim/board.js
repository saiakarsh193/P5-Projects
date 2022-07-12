class Board
{
    constructor()
    {
        this.scale = 5; 
        this.width = 200;
        this.height = 100;
        this.radius = 3;
        this.friction = 0.3;
        this.restitution_ball = 0.8;
        this.restitution_wall = 0.9;

        this.balls = [
            new Ball(0, 0, this.radius, this.scale, this.friction),
            new Ball(80, 0, this.radius, this.scale, this.friction)];
        this.balls[0].impulse(1000, 600);
        this.balls[1].impulse(600, 1000);
    }

    draw()
    {
        rectMode(CENTER);
        noStroke();
        fill(166, 105, 0);
        rect(0, 0, (this.width + 10) * this.scale, (this.height + 10) * this.scale);
        fill(6, 166, 0);
        rect(0, 0, this.width * this.scale, this.height * this.scale);
        rectMode(CORNER);
        this.balls.forEach((ball) => ball.draw());
    }

    update(dT)
    {
        for(let i = 0;i < this.balls.length;i ++)
        {
            for(let j = i + 1;j < this.balls.length;j ++)
            {
                this.doCollision(this.balls[i], this.balls[j]);
            }
            this.balls[i].update(dT);
            this.adjustBound(this.balls[i]);
        }
    }

    doCollision(ball1, ball2)
    {
        let dist = Math.sqrt(Math.pow(ball1.position_x - ball2.position_x, 2) + Math.pow(ball1.position_y - ball2.position_y, 2));
        if(dist < 2 * ball1.radius)
        {
            // ball1.stop();
            // ball2.stop();
        }
    }

    adjustBound(ball)
    {
        if(ball.position_x + ball.radius > (this.width / 2))
        {
            ball.position_x -= ball.radius + ball.position_x - (this.width / 2);
            ball.velocity_x *= -this.restitution_wall;
        }
        else if(ball.position_x - ball.radius < -(this.width / 2))
        {
            ball.position_x += ball.radius - ball.position_x - (this.width / 2);
            ball.velocity_x *= -this.restitution_wall;
        }
        if(ball.position_y + ball.radius > (this.height / 2))
        {
            ball.position_y -= ball.radius + ball.position_y - (this.height / 2);
            ball.velocity_y *= -this.restitution_wall;
        }
        else if(ball.position_y - ball.radius < -(this.height / 2))
        {
            ball.position_y += ball.radius - ball.position_y - (this.height / 2);
            ball.velocity_y *= -this.restitution_wall;
        }
    }
}