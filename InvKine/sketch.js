let cx, cy;
let a;

function setup()
{
  createCanvas(1200, 680);
  angleMode(DEGREES);
  cx = width / 2;
  cy = height / 2;
  a = new Arm(0, 0, [10, 15, 10]);
}

function draw()
{
  background(200);
  translate(cx, cy);
  a.draw();
}

function mouseMoved()
{
  a.setTarget(mouseX - cx, mouseY - cy);
}