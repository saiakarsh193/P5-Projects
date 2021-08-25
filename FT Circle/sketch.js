let cx, cy;
let sys;
let path_buffer;

class System
{
  constructor(count)
  {
    this.circles = [];
    this.rates = [];
    for(let i = 0;i < count;i ++)
    {
      let temp = createVector(1, 0);
      temp.setHeading(random(2 * PI));
      temp.setMag(random(10, 40));
      this.circles.push(temp);
      this.rates.push(random(PI / 15) - (PI / 30));
    }
    this.updatePoints();
  }

  updatePoints()
  {
    this.points = [];
    let temp = createVector(0, 0);
    this.points.push(temp.copy());
    for(let i = 0;i < this.circles.length;i ++)
    {
      temp.add(this.circles[i]);
      this.points.push(temp.copy());
    }
  }

  update()
  {
    for(let i = 0;i < this.circles.length;i ++)
      this.circles[i].rotate(this.rates[i]);
    this.updatePoints();
  }

  draw(circles=true, lines=true)
  {
    strokeWeight(4);
    fill('white');
    stroke('black');
    for(let i = 0;i < this.points.length - 1;i ++)
    {
      if(circles)
        circle(this.points[i].x, this.points[i].y, 2 * p5.Vector.sub(this.points[i + 1], this.points[i]).mag());
      if(lines)
        line(this.points[i].x, this.points[i].y, this.points[i + 1].x, this.points[i + 1].y);
    }
  }
}

function setup()
{
  createCanvas(1200, 680);
  cx = width / 2;
  cy = height / 2;
  sys = new System(20);
  path_buffer = createGraphics(width, height);
  path_buffer.background('yellow');
  path_buffer.translate(cx, cy);
  path_buffer.stroke('black');
  path_buffer.strokeWeight(2);
}

function draw()
{
  image(path_buffer, 0, 0);
  translate(cx, cy);
  let temp = sys.points[sys.points.length - 1].copy();
  sys.update();
  sys.draw(false, false);
  path_buffer.line(temp.x, temp.y, sys.points[sys.points.length - 1].x, sys.points[sys.points.length - 1].y);
}