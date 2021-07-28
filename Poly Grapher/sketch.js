let cx, cy;
let a;
let b;
let c;
let cTime;

class Grapher
{
  constructor(sx, sy, sw, sh, samples)
  {
    this.sx = sx;
    this.sy = sy;
    this.sw = sw;
    this.sh = sh;
    this.max_samples = samples;
    this.samples = 0;
    this.points = new Array(this.samples).fill(0);
    this.index = -1;
  }

  bound(val, low, high)
  {
    val = min(high, val);
    val = max(low, val);
    return val;
  }

  draw(primary, secondary, trail = 3)
  {
    this.drawFrame(primary);
    this.drawPoints(primary, secondary, trail);
  }

  drawFrame(primary)
  {
    stroke(primary);
    strokeWeight(5);
    noFill();
    rect(this.sx, this.sy, this.sw, this.sh);
  }

  drawPoints(primary, secondary, trail)
  {
    strokeWeight(3);
    noFill();

    stroke(primary);
    beginShape();
    for(var i = 0;i <= this.bound(this.index, 0, this.samples - 1);i ++)
      vertex(map(i, 0, this.max_samples - 1, this.sx, this.sx + this.sw), this.points[i]);
    endShape();

    beginShape();
    for(var i = this.bound(this.index + 1, 0, this.samples - 1);i < this.samples;i ++)
      vertex(map(i, 0, this.max_samples - 1, this.sx, this.sx + this.sw), this.points[i]);
    endShape();

    stroke(secondary);
    beginShape();
    for(var i = this.bound(this.index - trail, 0, this.samples - 1);i <= this.bound(this.index, 0, this.samples - 1);i ++)
      vertex(map(i, 0, this.max_samples - 1, this.sx, this.sx + this.sw), this.points[i]);
    endShape();
  }

  addPoint(val, low, high)
  {
    if(this.samples < this.max_samples)
      this.samples += 1;
    this.index = (this.index + 1) % this.samples;
    val = map(this.bound(val, low, high), low, high, this.sy + this.sh, this.sy);
    this.points[this.index] = val;
  }
}

function setup()
{
  createCanvas(1200, 680);
  frameRate(20);
  cx = width / 2;
  cy = height / 2;
  cTime = 0;
  a = new Grapher(-300, -280, 600, 150, 100);
  b = new Grapher(-300, -100, 600, 150, 100);
  c = new Grapher(-300, 80, 600, 150, 100);
}

function draw()
{
  background(0);
  translate(cx, cy);

  a.addPoint(readData_a(cTime), -10, 10);
  a.draw(color(0, 0, 255), color(0, 255, 255));

  b.addPoint(readData_b(cTime), -10, 10);
  b.draw(color(255, 0, 0), color(255, 0, 255));
  
  c.addPoint(readData_c(cTime), -10, 10);
  c.draw(color(0, 255, 0), color(255, 255, 0));

  cTime += deltaTime;
}

function readData_a(x)
{
  return 3 * Math.sin(0.008 * x);
}

function readData_b(x)
{
  return 2 * Math.sin(0.006 * x) + 0.75 * Math.sin(0.01 * x) + 0.5 * Math.cos(0.02 * x);
}

function readData_c(x)
{
  return 3 * Math.cos(0.0075 * x) + Math.sin(0.02 * x);
}