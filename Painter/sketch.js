let p;

class Paint
{
  constructor(sx, sy, width, height)
  {
    this.sx = sx;
    this.sy = sy;
    this.width = width;
    this.height = height;
    this.canvas = createGraphics(this.width, this.height);
    this.canvas.noFill();
    this.clear();

    this.pmx = 0;
    this.pmy = 0;
  }

  render()
  {
    image(this.canvas, this.sx, this.sy);
  }

  stroke(color)
  {
    this.canvas.stroke(color);
  }

  strokeWeight(weight)
  {
    this.canvas.strokeWeight(weight);
  }

  clear(color='white')
  {
    this.canvas.background(color);
  }

  mapbound(value, ilow, ihigh, flow, fhigh)
  {
    value = max(value, ilow);
    value = min(value, ihigh);
    return map(value, ilow, ihigh, flow, fhigh);
  }

  paint(mx, my, mouesPress)
  {
    if(mx >= this.sx && mx <= this.sx + this.width && my >= this.sy && my <= this.sy + this.height)
    {
      mx -= this.sx;
      my -= this.sy;
      if(mouesPress)
      {
        this.pmx = mx;
        this.pmy = my;
      }
      // this.strokeWeight(this.mapbound(Math.sqrt(Math.pow(this.pmx - mx, 2) + Math.pow(this.pmy - my, 2)), 3, 10, 1, 4));
      this.canvas.line(this.pmx, this.pmy, mx, my);
      this.pmx = mx;
      this.pmy = my;
    }
  }
}

function setup()
{
  createCanvas(1200, 680);
  p = new Paint(50, 50, (3 * width) / 4, (3 * height) / 4);
  p.stroke('red');
  p.strokeWeight(5);
}

function draw()
{
  background(200);
  p.render();
}

function mousePressed()
{
  p.paint(mouseX, mouseY, true);
}

function mouseDragged()
{
  p.paint(mouseX, mouseY, false);
}