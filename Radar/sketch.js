let cx, cy;
let rad;
let hol;

function setup()
{
  createCanvas(1200, 680);

  cx = width / 2;
  cy = height / 2;

  rad = new Radar(300, 60, 120);
  hol = new Holder(10, 300);
}

function draw()
{
  background(0);
  hol.update(deltaTime / 1000);
  rad.scan(hol.list());
  rad.draw();
}