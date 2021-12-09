let cx, cy;
let rad;

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

  makeOverlay()
  {
    this.overlay = createGraphics(width, height);
    this.overlay.background(175, 175, 175, 0);
    this.overlay.translate(cx, cy);
    this.overlay.noFill();
    this.overlay.stroke(0, 255, 0);
    this.overlay.strokeWeight(2);
    for(let r = 100; r <= 2 * this.radius; r += 100)
      this.overlay.circle(0, 0, r);
  }

  draw()
  {
    image(this.overlay, 0, 0, width, height);
    translate(cx, cy);
    // stroke(0, 255, 0);
    // strokeWeight(3);
    // noFill();
    // line(0, 0, this.radius * cos(this.current_angle), this.radius * sin(this.current_angle));
    noStroke();
    for(let i = 0;i < this.segments;i ++)
    {
      fill(0, 255, 0, map(i, 0, this.segments - 1, 200, 0));
      arc(0, 0, 2 * this.radius, 2 * this.radius, this.current_angle - (i + 1) * (this.spread / this.segments), this.current_angle - i * (this.spread / this.segments));
    }
    this.current_angle += this.angle_rate;
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
}