let cx, cy;

let n = 0;
let c = 7;
let maxR = 180;

function setup()
{
  createCanvas(1200, 680);

  cx = width / 2;
  cy = height / 2;

  frameRate(20);
  background(255);
  colorMode(HSB);
}

function draw()
{
  translate(cx, cy);

  let ang = radians(n * 137.5);
  let R = c * sqrt(n);
  let r = n * 0.05;
  r = min(8, r);
  r = max(4, r);

  if(R <= maxR)
  {
    strokeWeight(0);
    fill(int((R / maxR) * 255), 255, 255);
    circle(R * cos(ang), R * sin(ang), r);
  }
  n++;
}