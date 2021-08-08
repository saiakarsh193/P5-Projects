let p;
let w;
let cx, xy;


function setup()
{
  createCanvas(1200, 680);
  cx = width / 2;
  cy = height / 2;
  w = new Wall();
  p = new Car();
}

function draw()
{
  background(200);
  translate(cx, cy);
  p.input(keyIsDown(87), keyIsDown(83), keyIsDown(65), keyIsDown(68));
  p.update();
  w.draw();
  p.draw();
  if(p.checkBounds() || p.checkCollisions(w.walls))
    p.reset();
}