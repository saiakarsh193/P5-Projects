let cx, cy;

function setup()
{
  createCanvas(1200, 680);

  cx = width / 2;
  cy = height / 2;
}

function draw()
{
  background(255);
  translate(cx, cy);
}