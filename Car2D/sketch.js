let p;
let w;
let cx, xy;

let points = [];
let start = false;

function setup()
{
  createCanvas(1200, 680);
  cx = width / 2;
  cy = height / 2;
  p = new Car();
}

function draw()
{
  background(200);
  translate(cx, cy);
  if(!start)
    return;
  p.input(keyIsDown(87), keyIsDown(83), keyIsDown(65), keyIsDown(68));
  p.update();
  if(p.checkCollisions(w.walls, true))
    p.reset();
  w.draw();
  p.draw();
}

function mousePressed()
{
  if(start)
    return;
  mouseX -= cx;
  mouseY -= cy;
  if(mouseButton == LEFT)
    points.push([mouseX, -mouseY]);
  else
  {
    w = new Wall(points);
    start = true;
  }
}