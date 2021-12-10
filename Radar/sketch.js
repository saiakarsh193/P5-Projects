let cx, cy;
let rad;
let dt = [];

class Radar
{
  constructor(radius, spread, segments)
  {
    this.radius = radius;
    this.spread = spread;
    this.segments = segments;
    this.current_angle = 0;
    this.angle_rate = 0.8;
    this.makeOverlay();
    angleMode(DEGREES);
    imageMode(CORNER);
  }

  makeOverlay(nor=4, delang=10)
  {
    this.overlay = createGraphics(width, height);
    // angleMode() not working for external canvas
    // this.overlay.angleMode(DEGREES);
    this.overlay.background(175, 175, 175, 0);
    this.overlay.translate(cx, cy);
    this.overlay.strokeWeight(2);
    this.overlay.textSize(10);
    // inner number of rings (does not count the outer rim)
    for(let i = 1;i <= nor;i ++)
    {
      let r = i * this.radius / (nor + 1);
      this.overlay.noFill();
      this.overlay.stroke(0, 255, 0);
      this.overlay.circle(0, 0, 2 * r);
      this.overlay.fill(0, 255, 0);
      this.overlay.noStroke();
      this.overlay.textAlign(LEFT);
      this.overlay.text(r, r + 3, 0);
      this.overlay.textAlign(RIGHT);
      this.overlay.text(r, -(r + 3), 0);
    }
    // outer rim
    this.overlay.noFill();
    this.overlay.stroke(0, 255, 0);
    this.overlay.strokeWeight(3);
    this.overlay.circle(0, 0, 2 * this.radius);
    this.overlay.textAlign(CENTER, CENTER);
    this.overlay.textSize(15);
    let del = Math.PI * 2 / 360;
    let ctr = 0;
    for(let a = 0;a < 2 * Math.PI - del; a += del)
    {
      this.overlay.noFill();
      this.overlay.stroke(0, 255, 0);
      this.overlay.strokeWeight(2);
      this.overlay.line(this.radius * cos(a), this.radius * sin(a), (this.radius + 5) * cos(a), (this.radius + 5) * sin(a));
      if(ctr % delang == 0)
      {
        this.overlay.strokeWeight(3);
        this.overlay.line(this.radius * cos(a), this.radius * sin(a), (this.radius + 10) * cos(a), (this.radius + 10) * sin(a));
        this.overlay.fill(0, 255, 0);
        this.overlay.noStroke();
        this.overlay.text(ctr, (this.radius + 25) * cos(a), (this.radius + 25) * sin(a));
      }
      ctr ++;
    }
    // filler
    this.overlay.noStroke();
    this.overlay.fill(0, 255, 0, 50);
    this.overlay.circle(0, 0, 2 * this.radius);
    this.overlay.noFill();
    this.overlay.stroke(0, 255, 0, 50);
    this.overlay.strokeWeight(2);
    del = Math.PI * 2 / 12;
    for(let a = 0;a < 2 * Math.PI - del; a += del)
    {
      this.overlay.line(-this.radius * cos(a), -this.radius * sin(a), this.radius * cos(a), this.radius * sin(a));
    }
  }

  draw(doLine=false)
  {
    image(this.overlay, 0, 0, width, height);
    translate(cx, cy);
    if(doLine)
    {
      stroke(0, 255, 0);
      strokeWeight(3);
      noFill();
      line(0, 0, this.radius * cos(this.current_angle), this.radius * sin(this.current_angle));
    }
    noStroke();
    for(let i = 0;i < this.segments;i ++)
    {
      fill(0, 255, 0, map(i, 0, this.segments - 1, 200, 0));
      arc(0, 0, 2 * this.radius, 2 * this.radius, this.current_angle - (i + 1) * (this.spread / this.segments), this.current_angle - i * (this.spread / this.segments));
    }
    this.current_angle = (this.current_angle + this.angle_rate) % 360;
  }
}

class Dot
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
    this.max_life = int(360 / 0.8);
    this.life = this.max_life;
  }

  draw()
  {
    noStroke();
    fill(0, 255, 0, map(this.life, this.max_life, 0, 255, 60));
    circle(this.x, this.y, 10);
    this.life --;
    if(this.life < 0)
      this.life = this.max_life;
  }
}

function setup()
{
  createCanvas(1200, 680);

  cx = width / 2;
  cy = height / 2;

  rad = new Radar(300, 60, 120);
}

function draw()
{
  background(0);
  rad.draw();
  for(let i = dt.length - 1;i >=0;i --)
  {
    if(dt[i].life > 0)
      dt[i].draw();
    else
      dt.splice(i, 1);
  }
  if(random() > 0.98)
  {
    let trad = map(random(), 0, 1, 0, rad.radius);
    let tang = rad.current_angle;
    dt.push(new Dot(trad * cos(tang), trad * sin(tang)));
  }
}