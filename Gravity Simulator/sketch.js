let cx, cy;
let sys;

function setup()
{
  createCanvas(1200, 680);

  cx = width / 2;
  cy = height / 2;
  sys = new System(
    [
      new Body(100, -5, -15, 3, 3),
      new Body(100, 5, -15, -2, 2)
    ]
  );
  sys.calculatePath(5000, 0.01);
}

function draw()
{
  background(200);
  translate(cx, cy);
  sys.drawPath();
  sys.updateFrame(0.01);
  sys.drawFrame();
}