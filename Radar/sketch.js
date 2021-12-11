let cx, cy;
let rad;

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
  if(random() > 0.98)
  {
    let trad = map(random(), 0, 1, 0, rad.radius);
    let tang = rad.current_angle;
    rad.addDot(trad * cos(tang), trad * sin(tang));
  }
}