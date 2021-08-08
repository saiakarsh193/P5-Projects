let cx, cy;
let c;

function setup()
{
  createCanvas(1520, 770);
  cx = width / 2;
  cy = height / 2;
  c = new Container(100, [cx, -cx, cy, -cy]);
}

function draw()
{
  translate(cx, cy);
  c.update();
  c.draw();
}